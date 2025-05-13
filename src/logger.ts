import axios, { AxiosError } from 'axios';
import { MatrixLoggerConfig, MATRIXLOGGER_API_URL, MATRIXLOGGER_RETRY_ATTEMPTS, MATRIXLOGGER_RETRY_DELAY } from './config';

export class MatrixLogger {
  private config: MatrixLoggerConfig;

  constructor(config: MatrixLoggerConfig) {
    this.config = config;
  }

  private async sendLog(level: string, message: string, metadata?: Record<string, any>) {
    let attempts = 0;
    
    while (attempts < MATRIXLOGGER_RETRY_ATTEMPTS) {
      try {
        await axios.post(`${MATRIXLOGGER_API_URL}/logs`, {
          level,
          message,
          metadata,
          appName: this.config.appName,
          timestamp: new Date().toISOString()
        }, {
          headers: {
            'x-api-key': this.config.apiKey
          }
        });
        return; // Success, exit the function
      } catch (error) {
        attempts++;
        
        if (error instanceof AxiosError) {
          // Handle rate limiting
          if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            const delay = retryAfter ? parseInt(retryAfter) * 1000 : MATRIXLOGGER_RETRY_DELAY * Math.pow(2, attempts);
            
            if (attempts === MATRIXLOGGER_RETRY_ATTEMPTS) {
              console.error('Rate limit exceeded. Please try again later.');
              return;
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        }

        if (attempts === MATRIXLOGGER_RETRY_ATTEMPTS) {
          if (error instanceof AxiosError) {
            console.error('Failed to send log after retries:', error.message);
          } else {
            console.error('Failed to send log after retries:', error);
          }
          return;
        }

        // Wait before retrying for other errors
        await new Promise(resolve => setTimeout(resolve, MATRIXLOGGER_RETRY_DELAY));
      }
    }
  }

  info(message: string, metadata?: Record<string, any>) {
    return this.sendLog('info', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    return this.sendLog('error', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    return this.sendLog('warn', message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>) {
    return this.sendLog('debug', message, metadata);
  }
}

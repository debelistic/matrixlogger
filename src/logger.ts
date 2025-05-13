import axios from 'axios';
import { MatrixLoggerConfig, getConfig } from './config';

export class MatrixLogger {
  private config: MatrixLoggerConfig;
  private baseUrl: string = 'https://api.matrixlogger.com/api/v1';

  constructor(config: Partial<MatrixLoggerConfig>) {
    this.config = getConfig(config);
  }

  private async sendLog(level: string, message: string, metadata?: Record<string, any>) {
    try {
      const payload: Record<string, any> = {
        level,
        message,
        metadata
      };

      // Only include appName if it's provided
      if (this.config.appName) {
        payload.appName = this.config.appName;
      }

      await axios.post(
        `${this.baseUrl}/logs`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.config.apiKey,
          }
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`[MatrixLogger] Failed to send ${level} log: ${errorMessage}`);


      if (process.env.NODE_ENV === 'development') {
        // error is most times axios error, so we need to get the response
        const errorDetails = (error as any).response?.data || (error as any).message;
        console.error('[MatrixLogger] Error details:', errorDetails);
      }
    }
  }

  public async info(message: string, metadata?: Record<string, any>) {
    return this.sendLog('info', message, metadata);
  }

  public async error(message: string, metadata?: Record<string, any>) {
    return this.sendLog('error', message, metadata);
  }

  public async warn(message: string, metadata?: Record<string, any>) {
    return this.sendLog('warn', message, metadata);
  }

  public async debug(message: string, metadata?: Record<string, any>) {
    return this.sendLog('debug', message, metadata);
  }
}

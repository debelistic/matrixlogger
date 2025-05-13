import dotenv from 'dotenv';

dotenv.config();

export const MATRIXLOGGER_API_URL = 'https://api.matrixlogger.com/api/v1';
export const MATRIXLOGGER_RETRY_ATTEMPTS = 3;
export const MATRIXLOGGER_RETRY_DELAY = 1000;

export interface MatrixLoggerConfig {
  apiKey: string;
  appName?: string;
}

const defaultConfig: MatrixLoggerConfig = {
  apiKey: process.env.MATRIXLOGGER_API_KEY || '',
  appName: process.env.MATRIXLOGGER_APP_NAME
};

export function validateConfig(config: MatrixLoggerConfig): void {
  if (!config.apiKey) {
    throw new Error('API key is required');
  }
}

export function getConfig(userConfig: Partial<MatrixLoggerConfig>): MatrixLoggerConfig {
  const config = {
    ...defaultConfig,
    ...userConfig
  };

  validateConfig(config);
  return config;
}

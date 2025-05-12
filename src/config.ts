import dotenv from 'dotenv';

dotenv.config();

export interface MatrixLoggerConfig {
  apiKey: string;
  appName?: string;
  retentionDays?: number;
}

const defaultConfig: MatrixLoggerConfig = {
  apiKey: process.env.MATRIXLOGGER_API_KEY || '',
  appName: process.env.MATRIXLOGGER_APP_NAME,
  retentionDays: 30
};

export function validateConfig(config: MatrixLoggerConfig): void {
  if (!config.apiKey) {
    throw new Error('API key is required');
  }
  if (config.retentionDays && config.retentionDays < 1) {
    throw new Error('Retention days must be at least 1');
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

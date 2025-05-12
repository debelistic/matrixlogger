export interface LoggerConfig {
  apiKey: string;
  appName: string;
  retentionDays?: number;
  mongoUri?: string;
}

export interface LogEntry {
  level: string;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  appName: string;
}

export interface App {
  name: string;
  apiKey: string;
  retentionDays: number;
  createdAt: Date;
}

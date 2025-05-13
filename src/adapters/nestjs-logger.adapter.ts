import { LoggerService } from '@nestjs/common';
import { MatrixLogger } from '../logger';

export class NestJSMatrixLoggerAdapter implements LoggerService {
  constructor(private readonly matrixLogger: MatrixLogger) {}

  log(message: string, context?: string) {
    this.matrixLogger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.matrixLogger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.matrixLogger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.matrixLogger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.matrixLogger.debug(message, { context, verbose: true });
  }
} 

import { DynamicModule, Global, Module } from '@nestjs/common';
import { MatrixLogger } from '../logger';
import { NestJSMatrixLoggerAdapter } from './nestjs-logger.adapter';
import { MatrixLoggerConfig } from '../config';

@Global()
@Module({})
export class MatrixLoggerModule {
  static forRoot(config: MatrixLoggerConfig): DynamicModule {
    return {
      module: MatrixLoggerModule,
      providers: [
        {
          provide: MatrixLogger,
          useFactory: () => new MatrixLogger(config),
        },
        {
          provide: NestJSMatrixLoggerAdapter,
          useFactory: (matrixLogger: MatrixLogger) => new NestJSMatrixLoggerAdapter(matrixLogger),
          inject: [MatrixLogger],
        },
      ],
      exports: [MatrixLogger, NestJSMatrixLoggerAdapter],
    };
  }
} 

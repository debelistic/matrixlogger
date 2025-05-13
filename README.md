# MatrixLogger

A powerful logging service for Node.js applications with support for both Express and NestJS.

## Features

- Cloud-based log storage
- Configurable log retention periods
- API key authentication
- Automatic log cleanup
- TypeScript support

## Installation

```bash
npm install matrixlogger
```

## Configuration

Create a `.env` file in your project root:

```env
MATRIXLOGGER_API_KEY=your-api-key-here
```

You can get your API key by creating an application at [MatrixLogger Dashboard](https://dashboard.matrixlogger.com).

## Basic Usage (Express)

```typescript
import { MatrixLogger } from 'matrixlogger';

const logger = new MatrixLogger({
  apiKey: 'your-api-key',
  appName: 'your-app-name'
});

// Log messages
logger.info('Hello World!');
logger.error('An error occurred', { error: 'details' });
logger.warn('Warning message');
logger.debug('Debug information');

// Log with metadata
logger.info('User action', { 
  userId: '123',
  action: 'login',
  timestamp: new Date()
});
```

## NestJS Integration

MatrixLogger provides seamless integration with NestJS's built-in logging system.

### Option 1: Using the Module (Recommended)

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { MatrixLoggerModule } from 'matrixlogger';

@Module({
  imports: [
    MatrixLoggerModule.forRoot({
      apiKey: 'your-api-key',
      appName: 'your-app-name'
    })
  ],
})
export class AppModule {}
```

### Option 2: Direct Usage in NestJS

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MatrixLogger, NestJSMatrixLoggerAdapter } from 'matrixlogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const matrixLogger = new MatrixLogger({
    apiKey: 'your-api-key',
    appName: 'your-app-name'
  });
  
  app.useLogger(new NestJSMatrixLoggerAdapter(matrixLogger));
  
  await app.listen(3000);
}
bootstrap();
```

## Configuration Options

```typescript
interface MatrixLoggerConfig {
  apiKey: string;      // API key for authentication
  appName: string;     // Name of your application
  retryAttempts?: number;  // Number of retry attempts (default: 3)
  retryDelay?: number;     // Delay between retries in ms (default: 1000)
}
```

## API

### Constructor

```typescript
new MatrixLogger(config: MatrixLoggerConfig)
```

### Methods

- `info(message: string, metadata?: Record<string, any>)`: Log info message
- `error(message: string, metadata?: Record<string, any>)`: Log error message
- `warn(message: string, metadata?: Record<string, any>)`: Log warning message
- `debug(message: string, metadata?: Record<string, any>)`: Log debug message

## License

ISC

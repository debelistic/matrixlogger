# MatrixLogger

A cloud-based logging service for Node.js applications.

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

## Usage

```typescript
import { MatrixLogger } from 'matrixlogger';

// Initialize with just the API key
const logger = new MatrixLogger({
  apiKey: 'your-api-key-here'
});

// Or with optional app name
const logger = new MatrixLogger({
  apiKey: 'your-api-key-here',
  appName: 'my-application'
});

// Log messages
await logger.info('Application started');
await logger.error('Something went wrong', { error: new Error('Test error') });
await logger.warn('Warning message');
await logger.debug('Debug information');

// Log with metadata
await logger.info('User action', { userId: '123', action: 'login' });
```

## API

### Constructor

```typescript
new MatrixLogger(config: Partial<MatrixLoggerConfig>)
```

### Configuration Options

- `apiKey`: API key for authentication (required)
- `appName`: Application name (optional)
- `retentionDays`: Number of days to retain logs (optional, defaults to 30)

### Methods

- `info(message: string, metadata?: Record<string, any>)`: Log info message
- `error(message: string, metadata?: Record<string, any>)`: Log error message
- `warn(message: string, metadata?: Record<string, any>)`: Log warning message
- `debug(message: string, metadata?: Record<string, any>)`: Log debug message

## License

MIT

import { MatrixLogger } from './logger';

describe('MatrixLogger', () => {
  it('should initialize with API key', () => {
    const logger = new MatrixLogger({
      apiKey: 'test-api-key'
    });
    expect(logger).toBeInstanceOf(MatrixLogger);
  });

  it('should initialize with API key and app name', () => {
    const logger = new MatrixLogger({
      apiKey: 'test-api-key',
      appName: 'test-app'
    });
    expect(logger).toBeInstanceOf(MatrixLogger);
  });
}); 

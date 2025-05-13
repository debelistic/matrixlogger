import { MatrixLogger } from './logger';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MatrixLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should send log with correct format', async () => {
    const logger = new MatrixLogger({
      apiKey: 'test-api-key',
      appName: 'test-app'
    });

    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    await logger.info('test message', { test: 'metadata' });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/logs'),
      expect.objectContaining({
        level: 'info',
        message: 'test message',
        metadata: { test: 'metadata' },
        appName: 'test-app'
      }),
      expect.objectContaining({
        headers: {
          'x-api-key': 'test-api-key'
        }
      })
    );
  });

  it('should retry on failure', async () => {
    const logger = new MatrixLogger({
      apiKey: 'test-api-key',
      appName: 'test-app'
    });

    mockedAxios.post
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ data: {} });

    await logger.info('test message');

    expect(mockedAxios.post).toHaveBeenCalledTimes(3);
  });
}); 

// @ts-nocheck
import { API_CONFIG } from '../api';

describe('API Configuration', () => {
  it('should have a base URL', () => {
    expect(API_CONFIG.BASE_URL).toBeDefined();
    expect(typeof API_CONFIG.BASE_URL).toBe('string');
  });

  it('should have a mock setting', () => {
    expect(API_CONFIG.USE_MOCKS).toBeDefined();
    expect(typeof API_CONFIG.USE_MOCKS).toBe('boolean');
  });

  it('should have a mock delay', () => {
    expect(API_CONFIG.MOCK_DELAY).toBeGreaterThanOrEqual(0);
  });

  it('should have a valid error rate', () => {
    expect(API_CONFIG.MOCK_ERROR_RATE).toBeGreaterThanOrEqual(0);
    expect(API_CONFIG.MOCK_ERROR_RATE).toBeLessThanOrEqual(1);
  });
});

import { API_CONFIG } from '@/config/api';

/**
 * Utility to simulate a network request with a delay and optional error.
 * 
 * This is used during development to simulate real-world API latency 
 * and error conditions when the backend is not available or when 
 * rapid prototyping is needed.
 * 
 * @template T - The type of data being returned
 * @param {T} data - The data to return after the delay
 * @param {number} [delay=API_CONFIG.MOCK_DELAY] - Optional custom delay in ms
 * @returns {Promise<T>} A promise that resolves with the data or rejects with an error
 * 
 * @example
 * const user = await simulateRequest({ id: 1, name: 'John' });
 */
export const simulateRequest = <T>(
  data: T, 
  delay: number = API_CONFIG.MOCK_DELAY
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random error based on MOCK_ERROR_RATE
      if (Math.random() < API_CONFIG.MOCK_ERROR_RATE) {
        reject(new Error('Simulated network error'));
        return;
      }
      resolve(data);
    }, delay);
  });
};

/**
 * Higher-order function to wrap a query function with mock logic.
 * 
 * Automatically switches between returning mock data and calling the 
 * actual API function based on the API_CONFIG.USE_MOCKS setting.
 * 
 * @template T - The type of data being returned
 * @param {T} mockData - The data to return if mocking is enabled
 * @param {() => Promise<T>} realFn - The actual function that makes the API call
 * @returns {() => Promise<T>} A function that returns mock data or calls the real function
 * 
 * @example
 * const fetchUsers = withMock([{ id: 1 }], () => axios.get('/api/users'));
 */
export const withMock = <T, Args extends unknown[]>(
  mockData: T, 
  realFn: (...args: Args) => Promise<T>
): ((...args: Args) => Promise<T>) => {
  return (...args: Args) => {
    if (API_CONFIG.USE_MOCKS) {
      return simulateRequest(mockData);
    }
    return realFn(...args);
  };
};

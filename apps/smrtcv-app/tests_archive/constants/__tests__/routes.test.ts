// @ts-nocheck
import { ROUTES, APP_URL, AUTH_URL, PUBLIC_URL } from '../routes';

describe('Route Constants', () => {
  it('should have defined base URLs', () => {
    expect(APP_URL).toBeDefined();
    expect(AUTH_URL).toBeDefined();
    expect(PUBLIC_URL).toBeDefined();
  });

  it('should have a HOME route', () => {
    expect(ROUTES.HOME).toBe('/');
  });

  it('should have a DASHBOARD route', () => {
    expect(ROUTES.DASHBOARD).toBe('/dashboard');
  });

  it('should have external auth routes', () => {
    expect(ROUTES.SIGNIN).toContain(AUTH_URL);
    expect(ROUTES.MAGIC_CALLBACK).toContain(AUTH_URL);
  });

  it('should ensure all routes are strings', () => {
    Object.values(ROUTES).forEach(route => {
      expect(typeof route).toBe('string');
    });
  });
});

// @ts-nocheck
import { setNestedValue } from '../utils';

describe('lib/utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
    });

    it('should handle tailwind conflicts', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2');
    });
  });

  describe('setNestedValue', () => {
    it('should set a simple value', () => {
      const obj: Record<string, any> = { a: 1 };
      setNestedValue(obj, 'a', 2);
      expect(obj.a).toBe(2);
    });

    it('should set a nested value', () => {
      const obj: Record<string, any> = { a: { b: 1 } };
      setNestedValue(obj, 'a.b', 2);
      expect(obj.a.b).toBe(2);
    });

    it('should create missing objects', () => {
      const obj: Record<string, any> = {};
      setNestedValue(obj, 'a.b.c', 3);
      expect(obj.a.b.c).toBe(3);
    });

    it('should create missing arrays for numeric keys', () => {
      const obj: Record<string, any> = {};
      setNestedValue(obj, 'a.0.b', 'test');
      expect(Array.isArray(obj.a)).toBe(true);
      expect(obj.a[0].b).toBe('test');
    });

    it('should handle non-object intermediate keys gracefully', () => {
      const obj: Record<string, any> = { a: 1 };
      setNestedValue(obj, 'a.b.c', 3);
      // It should not crash and just return the object as is (or as modified until failure)
      expect(obj.a).toBe(1);
    });
  });
});

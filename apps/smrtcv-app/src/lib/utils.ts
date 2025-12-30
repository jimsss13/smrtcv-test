import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes safely.
 * 
 * Combines 'clsx' for conditional classes and 'tailwind-merge' 
 * to handle Tailwind class conflicts correctly.
 * 
 * @param inputs - Array of class values, objects, or arrays
 * @returns The merged and optimized class string
 * 
 * @example
 * <div className={cn('p-4', isActive && 'bg-blue-500', 'p-2')} />
 * // Result: "bg-blue-500 p-2" (p-4 is overridden by p-2)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Sets a value in a nested object using a dot-notation path.
 * 
 * This utility is essential for updating nested state (like resume sections)
 * without deep cloning the entire object manually. It handles both 
 * objects and arrays in the path.
 * 
 * @param obj - The object to modify (modified in-place)
 * @param path - Dot-notation path (e.g., 'basics.name' or 'work.0.position')
 * @param value - The value to set at the specified path
 * @returns The modified object
 * 
 * @example
 * const obj = { a: { b: 1 } };
 * setNestedValue(obj, 'a.b', 2);
 * // obj is now { a: { b: 2 } }
 */
export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  if (!obj || typeof obj !== 'object') return obj;
  
  const keys = path.split('.');
  let current = obj as Record<string, unknown>;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    
    // Create nested structure if it doesn't exist
    if (current[key] === undefined || current[key] === null) {
      // If next key is a number, create an array, otherwise an object
      current[key] = !isNaN(Number(keys[i + 1])) ? [] : {};
    }
    
    current = current[key] as Record<string, unknown>;
    
    // Safety check to prevent crashing on non-object intermediate keys
    if (typeof current !== 'object' || current === null) {
      return obj; 
    }
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  
  return obj;
}
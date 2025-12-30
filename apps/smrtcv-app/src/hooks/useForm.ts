'use client';

import { useState, useCallback, ChangeEvent } from 'react';

/**
 * Hook for managing simple form state and handling input changes.
 * 
 * Provides a generic state object and a change handler for standard input elements.
 * 
 * @template T
 * @param {T} initialValues - Initial values for the form fields
 * @returns {Object} Form state and management methods
 * @returns {T} .values - Current form field values
 * @returns {Function} .handleChange - Change handler for input elements
 * @returns {Function} .reset - Method to reset form to initial values
 * @returns {Function} .setValues - Method to manually set all form values
 * 
 * @example
 * const { values, handleChange } = useForm({ name: '', email: '' });
 * <input name="name" value={values.name} onChange={handleChange} />
 */
export const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  /**
   * Handles changes for input, select, and textarea elements.
   * Expects the element to have a 'name' attribute matching a key in T.
   */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs separately
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setValues((prev) => ({
      ...prev,
      [name]: val,
    }));
  }, []);

  /**
   * Sets a specific field value by its name.
   */
  const setFieldValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * Resets the form to its initial values.
   */
  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    setFieldValue,
    reset,
    setValues,
  };
};

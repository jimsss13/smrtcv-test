// @ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../useForm';
import { ChangeEvent } from 'react';

describe('useForm', () => {
  const initialValues = { name: 'John', email: 'john@example.com', active: false };

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useForm(initialValues));
    expect(result.current.values).toEqual(initialValues);
  });

  it('should handle text input changes', () => {
    const { result } = renderHook(() => useForm(initialValues));
    const event = {
      target: { name: 'name', value: 'Jane', type: 'text' }
    } as unknown as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.name).toBe('Jane');
  });

  it('should handle checkbox changes', () => {
    const { result } = renderHook(() => useForm(initialValues));
    const event = {
      target: { name: 'active', checked: true, type: 'checkbox' }
    } as unknown as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.active).toBe(true);
  });

  it('should set field value manually', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.setFieldValue('email', 'jane@example.com');
    });

    expect(result.current.values.email).toBe('jane@example.com');
  });

  it('should reset to initial values', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.setFieldValue('name', 'Jane');
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
  });
});

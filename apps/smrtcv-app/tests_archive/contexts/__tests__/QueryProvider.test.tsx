// @ts-nocheck
/**
 * Tests for QueryProvider and related hooks.
 * Verifies that the context provides query and mutation functionality
 * and handles error states correctly.
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryProvider, useQueryContext } from '../QueryContext';
import { useAppQuery, useAppMutation } from '@/hooks/query/useAppQuery';

/**
 * Mock component to test useAppQuery and useQueryContext hooks.
 */
const TestComponent = () => {
  const { invalidate } = useQueryContext();
  const query = useAppQuery({
    key: ['test-data'],
    fn: async () => 'test-result',
  });

  return (
    <div>
      <div data-testid="status">{query.isLoading ? 'loading' : 'done'}</div>
      <div data-testid="data">{query.data}</div>
      <button onClick={() => invalidate(['test-data'])}>Invalidate</button>
    </div>
  );
};

/**
 * Mock component to test the useAppMutation hook.
 */
const MutationComponent = () => {
  const { mutate, status } = useAppMutation({
    fn: async (val: string) => `mutated-${val}`,
  });

  return (
    <div>
      <div data-testid="mutation-status">{status.isLoading ? 'mutating' : 'idle'}</div>
      <div data-testid="mutation-data">{status.data}</div>
      <button onClick={() => mutate('hello')}>Mutate</button>
    </div>
  );
};

describe('QueryProvider', () => {
  /**
   * Test: Verify query functionality.
   */
  it('provides query functionality to children', async () => {
    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId('status').textContent).toBe('loading');
    
    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('done');
    });
    
    expect(screen.getByTestId('data').textContent).toBe('test-result');
  });

  /**
   * Test: Verify mutation functionality.
   */
  it('provides mutation functionality', async () => {
    render(
      <QueryProvider>
        <MutationComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId('mutation-status').textContent).toBe('idle');
    
    const button = screen.getByText('Mutate');
    button.click();

    await waitFor(() => {
      expect(screen.getByTestId('mutation-data').textContent).toBe('mutated-hello');
    });
  });

  /**
   * Test: Error handling when used outside provider.
   */
  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow('useQueryContext must be used within a QueryProvider');
    
    consoleSpy.mockRestore();
  });
});

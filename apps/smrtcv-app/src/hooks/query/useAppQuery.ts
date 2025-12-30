'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  ExecuteQueryOptions, 
  ExecuteMutationOptions, 
  QueryState 
} from '@/types/query';

/**
 * Custom hook to execute a query using the application's query patterns.
 * This hook wraps TanStack Query's useQuery to provide a consistent state interface.
 * 
 * @template TData - The type of data returned by the query
 * @template TError - The type of error that can be thrown
 * 
 * @param {ExecuteQueryOptions<TData, TError>} options - Query options including key and fetch function
 * @returns {QueryState<TData, TError>} The query state in a standardized format
 * 
 * @example
 * const { data, isLoading } = useAppQuery({
 *   key: ['users'],
 *   fn: () => fetchUsers()
 * });
 */
export const useAppQuery = <TData = unknown, TError = Error>(
  options: ExecuteQueryOptions<TData, TError>
): QueryState<TData, TError> => {
  const { key, fn, ...queryOptions } = options;
  const result = useQuery({
    queryKey: key,
    queryFn: fn,
    ...queryOptions,
  });

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error as TError | null,
    isSuccess: result.isSuccess,
  };
};

/**
 * Interface for the standardized mutation status.
 * 
 * @template TData - The type of data returned by the mutation
 * @template TError - The type of error that can be thrown
 */
export interface MutationStatus<TData = unknown, TError = Error> {
  /** The data returned by the mutation upon success. */
  data: TData | undefined;
  /** Whether the mutation is currently in progress. */
  isLoading: boolean;
  /** Whether the mutation encountered an error. */
  isError: boolean;
  /** The error object if the mutation failed. */
  error: TError | null;
  /** Whether the mutation completed successfully. */
  isSuccess: boolean;
}

/**
 * Interface for the result of useAppMutation.
 * 
 * @template TData - The type of data returned by the mutation
 * @template TError - The type of error that can be thrown
 * @template TVariables - The type of variables passed to the mutation function
 */
export interface AppMutationResult<TData = unknown, TError = Error, TVariables = void> {
  /** Trigger for the mutation. */
  mutate: (variables: TVariables) => void;
  /** Async trigger for the mutation that returns a promise. */
  mutateAsync: (variables: TVariables) => Promise<TData>;
  /** Standardized status of the mutation. */
  status: MutationStatus<TData, TError>;
}

/**
 * Custom hook to execute a mutation using the application's query patterns.
 * This hook wraps TanStack Query's useMutation to provide a consistent state interface.
 * 
 * @template TData - The type of data returned by the mutation
 * @template TError - The type of error that can be thrown
 * @template TVariables - The type of variables passed to the mutation function
 * 
 * @param {ExecuteMutationOptions<TData, TError, TVariables>} options - Mutation options including the mutation function
 * @returns {AppMutationResult<TData, TError, TVariables>} The mutation trigger and its current status
 * 
 * @example
 * const { mutate, status } = useAppMutation({
 *   fn: (newUser) => createUser(newUser)
 * });
 */
export const useAppMutation = <TData = unknown, TError = Error, TVariables = void>(
  options: ExecuteMutationOptions<TData, TError, TVariables>
): AppMutationResult<TData, TError, TVariables> => {
  const { fn, ...mutationOptions } = options;
  const mutation = useMutation({
    mutationFn: fn,
    ...mutationOptions,
  });

  return {
    mutate: mutation.mutate as (variables: TVariables) => void,
    mutateAsync: mutation.mutateAsync as (variables: TVariables) => Promise<TData>,
    status: {
      data: mutation.data,
      isLoading: mutation.isPending,
      isError: mutation.isError,
      error: mutation.error as TError | null,
      isSuccess: mutation.isSuccess,
    },
  };
};

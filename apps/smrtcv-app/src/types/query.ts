import { 
  QueryKey, 
  UseQueryOptions, 
  UseMutationOptions,
  QueryClient
} from '@tanstack/react-query';

/**
 * Represents the standard state of an asynchronous data query.
 * Useful for handling loading, error, and success states in components.
 * 
 * @template TData - The type of data returned by the query.
 * @template TError - The type of error that might occur (defaults to Error).
 */
export interface QueryState<TData = unknown, TError = Error> {
  /** The resulting data if the query was successful, or undefined otherwise. */
  data: TData | undefined;
  /** Whether the query is currently fetching data. */
  isLoading: boolean;
  /** Whether the query encountered an error. */
  isError: boolean;
  /** The error object if isError is true, or null otherwise. */
  error: TError | null;
  /** Whether the query successfully completed and returned data. */
  isSuccess: boolean;
}

/**
 * Configuration options for executing a query via a custom hook or service.
 * Extends TanStack Query's UseQueryOptions while making key and fn mandatory.
 * 
 * @template TData - The type of data returned by the query.
 * @template TError - The type of error that might occur.
 */
export interface ExecuteQueryOptions<TData = unknown, TError = Error> 
  extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  /** Unique key identifying the query in the cache. */
  key: QueryKey;
  /** The asynchronous function that fetches the data. */
  fn: () => Promise<TData>;
}

/**
 * Configuration options for executing a mutation (create/update/delete).
 * 
 * @template TData - The type of data returned by the mutation.
 * @template TError - The type of error that might occur.
 * @template TVariables - The type of variables expected by the mutation function.
 */
export interface ExecuteMutationOptions<TData = unknown, TError = Error, TVariables = void> 
  extends UseMutationOptions<TData, TError, TVariables> {
  /** The asynchronous function that performs the mutation. */
  fn: (variables: TVariables) => Promise<TData>;
}

/**
 * Interface for the Query Context, providing a unified API for cache management.
 */
export interface QueryContextType {
  /**
   * The underlying TanStack Query Client instance.
   */
  queryClient: QueryClient;

  /**
   * Invalidates and refetches queries matching the provided query key.
   * 
   * @param queryKey - The key of the queries to invalidate.
   */
  invalidate: (queryKey: QueryKey) => Promise<void>;

  /**
   * Prefetches data for a query and stores it in the cache.
   * 
   * @template TData - The type of data being prefetched.
   * @param queryKey - Unique key for the query.
   * @param queryFn - Asynchronous function to fetch the data.
   */
  prefetch: <TData = unknown>(
    queryKey: QueryKey,
    queryFn: () => Promise<TData>
  ) => Promise<void>;

  /**
   * Completely clears all queries and their data from the cache.
   */
  clearCache: () => void;
}

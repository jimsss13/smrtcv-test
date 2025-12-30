'use client';

import React from 'react';
import { useQueryContext } from '@/contexts/QueryContext';
import { useAppQuery, useAppMutation } from '@/hooks/query/useAppQuery';

interface Post {
  id: number;
  title: string;
  body: string;
}

/**
 * QueryExample Component
 * 
 * Demonstrates how to use the custom QueryProvider and its hooks
 * for data fetching and mutations.
 */
export const QueryExample = () => {
  const { invalidate } = useQueryContext();

  // 1. Using useAppQuery for data fetching
  const { data: posts, isLoading, isError, error } = useAppQuery<Post[]>({
    key: ['posts'],
    fn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  // 2. Using useAppMutation for data updates
  const { mutate, status } = useAppMutation<Post, Error, Partial<Post>>({
    fn: async (newPost) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      // 3. Using useQueryContext to invalidate cache
      invalidate(['posts']);
      alert('Post created and cache invalidated!');
    },
  });

  if (isLoading) return <div className="p-4">Loading posts...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {error?.message}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Query Provider Example</h1>
      
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <button
          onClick={() => mutate({ title: 'New Post', body: 'This is a test post content.' })}
          disabled={status.isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {status.isLoading ? 'Creating...' : 'Add Test Post'}
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Post List</h2>
        {posts?.map((post) => (
          <div key={post.id} className="p-4 border rounded hover:bg-gray-50 transition-colors">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

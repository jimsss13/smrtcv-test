'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/dashboard';
import { API_CONFIG } from '@/config/api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { simulateRequest } from '@/lib/mockApi';

/**
 * Interface representing the methods and states for user account management.
 */
export interface AccountManagement {
  /** Method to update user profile information. */
  updateProfile: (updatedData: Partial<User>) => void;
  /** Whether a profile update is currently in progress. */
  isUpdating: boolean;
  /** Method to upload a new user avatar file. */
  uploadAvatar: (file: File) => void;
  /** Whether an avatar upload is currently in progress. */
  isUploading: boolean;
}

/**
 * Hook for managing user account updates.
 * 
 * Provides mutations for updating the user profile and uploading an avatar.
 * It automatically updates the 'auth-user' cache upon success.
 * 
 * @returns {AccountManagement} Account management methods and states
 * 
 * @example
 * const { updateProfile, isUpdating } = useAccount();
 * updateProfile({ name: 'New Name' });
 */
export const useAccount = (): AccountManagement => {
  const queryClient = useQueryClient();

  /**
   * Mutation for updating user profile information.
   */
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      if (API_CONFIG.USE_MOCKS) {
        console.log("Profile update simulated for data:", updatedData);
        return simulateRequest({
          id: "mock-user-123",
          name: updatedData.name || "Demo User",
          email: updatedData.email || "demo@smrtcv.com",
          avatar: undefined
        });
      }

      const res = await fetch(`${API_CONFIG.BASE_URL}/users/profile`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    },
    onSuccess: (data) => {
      // Update the auth-user cache so the header/sidebar reflect changes immediately
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, data);
    }
  });

  /**
   * Mutation for uploading a user avatar.
   */
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      if (API_CONFIG.USE_MOCKS) {
        console.log("Avatar upload simulated for file:", file.name);
        return simulateRequest({ avatarUrl: "https://i.pravatar.cc/150?u=mock-user-123" });
      }

      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch(`${API_CONFIG.BASE_URL}/users/avatar`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to upload avatar');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, (old: User | undefined) => {
        if (!old) return undefined;
        return {
          ...old,
          avatar: data.avatarUrl
        };
      });
    }
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    uploadAvatar: uploadAvatarMutation.mutate,
    isUploading: uploadAvatarMutation.isPending
  };
};

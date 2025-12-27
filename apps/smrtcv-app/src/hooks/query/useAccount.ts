import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/dashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";

/**
 * Hook for managing user account updates.
 */
export const useAccount = () => {
  const queryClient = useQueryClient();

  // 1. Update Profile (Name, Email, etc.)
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: Partial<User>) => {
      const res = await fetch(`${API_BASE_URL}/users/profile`, {
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
      queryClient.setQueryData(['auth-user'], data);
    }
  });

  // 2. Upload Avatar
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch(`${API_BASE_URL}/users/avatar`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to upload avatar');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], (old: any) => ({
        ...old,
        avatar: data.avatarUrl
      }));
    }
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    uploadAvatar: uploadAvatarMutation.mutate,
    isUploading: uploadAvatarMutation.isPending
  };
};

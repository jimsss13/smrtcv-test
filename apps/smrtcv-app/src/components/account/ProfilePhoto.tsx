'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfilePhotoProps {
  avatar?: string | null;
  name?: string;
}

/**
 * Component for displaying and updating the user's profile photo.
 * Shows the current avatar or a placeholder, and provides an option to update or remove the photo.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <ProfilePhoto 
 *   avatar="https://example.com/avatar.jpg" 
 *   name="John Doe" 
 * />
 * 
 * @param props - Component properties including avatar URL and user name.
 */
const ProfilePhoto = memo(function ProfilePhoto({ avatar, name }: ProfilePhotoProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative group mb-4">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
            {avatar ? (
              <Image 
                src={avatar} 
                alt={name || "User"} 
                width={128} 
                height={128} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-foreground truncate w-full">{name || "User"}</h2>
        <p className="text-xs text-gray-500 font-medium mt-1 mb-4">Profile photo for your resumes</p>
        <Button variant="outline" size="sm" className="w-full rounded-xl font-bold border-2">
          Remove Photo
        </Button>
      </div>
    </section>
  );
});

ProfilePhoto.displayName = 'ProfilePhoto';

export { ProfilePhoto };
export default ProfilePhoto;

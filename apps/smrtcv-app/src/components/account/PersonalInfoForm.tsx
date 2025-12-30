'use client';

import React, { memo } from 'react';
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';

interface PersonalInfoFormProps {
  initialData?: {
    name?: string;
    email?: string;
  };
}

/**
 * Form for editing personal information like name and email.
 * Provides inputs for full name and email address with an icon-based interface.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <PersonalInfoForm 
 *   initialData={{ name: "John Doe", email: "john@example.com" }} 
 * />
 * 
 * @param props - Component properties including initialData for the fields.
 */
const PersonalInfoForm = memo(function PersonalInfoForm({ initialData }: PersonalInfoFormProps) {
  return (
    <section className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-10 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <User className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold">Personal Information</h3>
      </div>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            icon={User}
            defaultValue={initialData?.name || ""}
            placeholder="Enter your full name"
          />
          <FormInput
            label="Email Address"
            icon={Mail}
            type="email"
            defaultValue={initialData?.email || ""}
            placeholder="Enter your email"
          />
        </div>

        <div className="pt-6 border-t border-gray-100 mt-8">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black py-6 px-12 rounded-2xl text-lg shadow-lg shadow-primary/20 transition-all active:scale-95">
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
});

PersonalInfoForm.displayName = 'PersonalInfoForm';

export { PersonalInfoForm };
export default PersonalInfoForm;

'use client';

import { useState, useMemo } from 'react';
import { z } from 'zod';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordStrength = useMemo(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    return strength;
  }, [formData.password]);

  const validateStep = () => {
    try {
      if (step === 1) {
        signupSchema.pick({ email: true }).parse(formData);
      }
      if (step === 2) {
        signupSchema.pick({ password: true, confirmPassword: true }).parse(formData);
      }
      setErrors({});
      return true;
    } catch (err: any) {
      const fieldErrors: Record<string, string> = {};
      err.errors.forEach((e: any) => {
        fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4002';
      window.location.href = `${APP_URL}/dashboard`;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-semibold">Create Account</h2>

        {step === 1 && (
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm focus:outline-none',
                errors.email ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            <Button className="mt-4 w-full" onClick={handleNext}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={cn(
                  'w-full rounded-md border px-3 py-2 text-sm focus:outline-none',
                  errors.password ? 'border-red-500' : 'border-gray-300'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm focus:outline-none',
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}

            <div className="mt-3 flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 w-full rounded',
                    passwordStrength >= i ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              ))}
            </div>

            <Button className="mt-4 w-full" onClick={handleNext}>
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={40} />
            <p className="mb-4 text-sm text-gray-600">
              Your account is ready to go!
            </p>
            <Button className="w-full" onClick={handleSubmit}>
              Go to Dashboard
            </Button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

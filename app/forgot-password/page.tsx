// app/forgot-password/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Button from '../components/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // After sending reset code, redirect to verify page with email parameter
    window.location.href = `/verify?email=${encodeURIComponent(email)}&type=password`;
  };

  // Add the missing handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-primary-white px-4 py-8">
      {/* Logo */}
      <div className="mb-12 md:mb-16">
        <Link href="/">
          <Image
            src="/labfry-logo.png"
            alt="Labfry"
            width={182}
            height={98}
            className="w-28 md:w-32 h-auto"
            priority
          />
        </Link>
      </div>

      {/* Content Container */}
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary-black mb-4">
            Forgot your password?
          </h1>
          <p className="text-primary-gray leading-relaxed">
            Please enter the email address associated with your account,
            and we&apos;ll email you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <FloatingLabelInput
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="Email address"
            required
          />

          {/* Reset Password Button */}
          <Button
            type="submit"
            variant="primary"
            className="mt-1 py-3.5 rounded-lg"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
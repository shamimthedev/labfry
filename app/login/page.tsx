// app/login/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Button from '../components/Button';

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData, 'Remember me:', rememberMe);
    // Handle login logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

      {/* Form Container */}
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-black mb-2">
            Welcome to Labfry
          </h1>
          <p className="text-primary-gray">
            Please share your login details so you can access the website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <FloatingLabelInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label="Email address"
            placeholder="eddie_lake@gmail.com"
            required
          />

          {/* Password Field */}
          <FloatingLabelInput
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            placeholder="Password"
            showPasswordToggle
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 mt-0.5 text-primary-red rounded accent-primary-red"
              />
              <label htmlFor="remember" className="text-sm text-primary-gray">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary-red font-semibold hover:text-red-600">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            className="mt-6 py-3.5 rounded-lg"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8 mt-12">
          <div className="flex-1 h-px bg-divider"></div>
          <span className="text-sm text-primary-gray">OR</span>
          <div className="flex-1 h-px bg-divider"></div>
        </div>

        {/* Get Started Link */}
        <p className="text-center text-primary-black font-be-vietnam">
          Don&apos;t have an account?{' '}
          <Link href="/select-role" className="text-primary-red font-semibold hover:text-red-600 cursor-pointer">
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
}
// app/profile/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../components/Button';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'john',
    lastName: 'Doe',
    email: 'hello@gmail.com',
    role: 'USER'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    // Handle profile update logic here
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-black leading-tight mb-8 md:mb-10 text-center">
          Personal Information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-primary-black mb-4 leading-6 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                placeholder="John"
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b-2 border-border-light focus:outline-none focus:border-primary-red bg-transparent text-primary-gray transition-colors"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-primary-black mb-4 leading-6 font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                placeholder="Doe"
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b-2 border-border-light focus:outline-none focus:border-primary-red bg-transparent text-primary-gray transition-colors"
              />
            </div>
          </div>

          {/* Email and Role Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-primary-black mb-4 leading-6 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="hello@gmail.com"
                onChange={handleChange}
                className="w-full px-0 py-3 border-0 border-b-2 border-border-light focus:outline-none focus:border-primary-red bg-transparent text-primary-gray transition-colors"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-primary-black mb-4 leading-6 font-medium">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                placeholder="USER"
                onChange={handleChange}
                disabled
                className="w-full px-0 py-3 border-0 border-b-2 border-border-light focus:outline-none bg-transparent text-primary-gray/50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              className="max-w-xs mx-auto py-3.5 rounded-lg"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
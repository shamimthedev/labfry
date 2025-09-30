// app/reset-password/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Button from '../components/Button';

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Password reset completed for email');
        // After successful password reset, redirect to success page
        window.location.href = '/success?type=password';
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

            {/* Content Container */}
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary-black mb-4">
                        Enter your new password
                    </h1>
                    <p className="text-primary-gray leading-relaxed">
                        Please enter your new password and confirm it to complete the reset process.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* New Password Field */}
                    <FloatingLabelInput
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        label="New Password"
                        placeholder="New password"
                        showPasswordToggle
                        required
                    />

                    {/* Confirm Password Field */}
                    <FloatingLabelInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        placeholder="Confirm password"
                        showPasswordToggle
                        required
                    />

                    {/* Reset Password Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-6 py-3.5 rounded-lg"
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
}
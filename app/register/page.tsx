// app/register/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Button from '../components/Button';

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: role || 'customer'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to verify page for account verification
        window.location.href = `/verify?email=${encodeURIComponent(formData.email)}&type=account`;
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
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary-black mb-2">
                        Create your Account
                    </h1>
                    <p className="text-primary-gray leading-relaxed">
                        When sports Meets smart Tech.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingLabelInput
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            label="First Name"
                            placeholder="Meraj"
                            required
                        />
                        <FloatingLabelInput
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            label="Last Name"
                            placeholder="Last name"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <FloatingLabelInput
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        placeholder="Email address"
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

                    {/* Confirm Password Field */}
                    <FloatingLabelInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        showPasswordToggle
                        required
                    />

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-5 h-5 mt-0.5 text-primary-red rounded accent-primary-red"
                            required
                        />
                        <label htmlFor="terms" className="text-sm text-primary-gray">
                            I agree to Tech Takes Terms of Service and Privacy Policy.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-6 py-3.5 rounded-lg"
                    >
                        Create Account
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8 mt-16 md:mt-24">
                    <div className="flex-1 h-px bg-divider"></div>
                    <span className="text-sm text-primary-gray">OR</span>
                    <div className="flex-1 h-px bg-divider"></div>
                </div>

                {/* Login Link */}
                <p className="text-center text-primary-black font-be-vietnam">
                    Don&apos;t have an account?{' '}
                    <Link href="/login" className="text-primary-red font-semibold hover:text-red-600 cursor-pointer">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
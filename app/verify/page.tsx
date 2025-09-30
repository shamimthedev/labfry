// app/verify/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '../components/Button';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'acb@domain';

  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Move to next input if value entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newCodes = [...codes];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newCodes[index] = char;
      }
    });
    setCodes(newCodes);

    // Focus last filled input or first empty one
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = () => {
    const code = codes.join('');
    if (code.length === 6) {
      console.log('Verifying code:', code);

      // Check if this is for password reset or account verification
      const type = searchParams.get('type');

      if (type === 'password') {
        // Redirect to reset password page after successful verification
        window.location.href = '/reset-password';
      } else {
        // For account verification, redirect to success page
        window.location.href = '/success?type=account';
      }
    }
  };

  const handleResend = () => {
    console.log('Resending code to:', email);
    // Handle resend logic here
    // In a real app, this would call an API to resend the code
  };
  const isVerifyDisabled = codes.some(code => !code);

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
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-black mb-4 leading-tight">
          Please check your email!
        </h1>
        <p className="text-primary-gray mb-8 md:mb-10 leading-relaxed">
          We&apos;ve emailed a 6-digit confirmation code to <span className="font-medium text-primary-black">{email}</span>,
          please enter the code in below box to verify your email.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 md:gap-3 mb-8">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 md:w-14 md:h-14 text-center border border-border-light rounded-lg placeholder:text-primary-black focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent transition-all text-lg font-semibold"
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          variant="primary"
          className="py-3.5 rounded-lg mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isVerifyDisabled}
        >
          Verify
        </Button>

        {/* Resend Code */}
        <p className="text-primary-black text-sm">
          Don&apos;t have a code?{' '}
          <button
            onClick={handleResend}
            className="text-primary-red font-semibold hover:text-red-600 cursor-pointer transition-colors"
          >
            Resend code
          </button>
        </p>
      </div>
    </div>
  );
}
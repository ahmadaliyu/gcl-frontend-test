import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { useForgotPassword } from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const { isPending, mutate } = useForgotPassword((response) => {
    if (response?.status < 400) {
      router.push(`/auth/change-password?email=${encodeURIComponent(email)}`);
    }
  });

  const handleSendCode = () => {
    const emailError = validateEmail(email);
    if (emailError) {
      alert(emailError);
      return;
    }
    mutate({ payload: { email } });
  };

  const handleInputChange = (name: string, value: string) => {
    setEmail(value);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-12 pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-[#02044A] text-[28px] sm:text-[36px] font-medium">Reset your Password</h1>
        <p className="text-[#272727] text-[16px] sm:text-[18px] mt-4">
          Can’t remember your password? Let's reset your password together.
        </p>
      </div>

      <div className="max-w-[810px] mx-auto mt-10">
        <InputField
          value={email}
          onChange={handleInputChange}
          name="email"
          label="Email Address"
          placeholder="username@email.com"
        />

        <div className="flex flex-col items-center justify-center mt-12">
          <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleSendCode}
            title="Send Reset Code"
            variant="blue"
            className="w-full max-w-[274px]"
          />

          <div className="text-[#21222D] text-[16px] mt-8 mb-4">I remember my password</div>

          <Link href="/auth/login" className="w-full max-w-[274px]">
            <Button title="Go back to Login" variant="outlined-blue-dark" className="w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

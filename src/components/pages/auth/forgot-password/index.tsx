import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

function LoginPage() {
  return (
    <div>
      <div className="max-[930px] mx-auto mt-[56px]">
        <h1 className="text-[#02044A] text-center text-[36px] font-medium">Reset your Password</h1>
        <p className="text-[#272727] text-center  text-[18px] mt-[16px]">
          Can’t remember your password? Lets reset your password together
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField label="Email Address" placeholder="username@email.com" />
        </div>

        <div className="flex flex-col items-center justify-center mt-[60px]">
          <Button title="Send Reset Code" variant="blue" className="w-[274px]" />

          <a className="text-[#21222D] text-[16px] mb-[16px] mt-[32px]">I remember my password</a>

          <Link href="/auth/login">
            <Button title="Go back to Login" variant="outlined-blue-dark" className="w-[274px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

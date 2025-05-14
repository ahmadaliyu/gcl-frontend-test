import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { LoginResponse, useSignIn } from '@/services';
import { clearTempCredentials, setTempCredentials } from '@/store/auth/formSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const { isPending, mutate } = useSignIn((response: LoginResponse) => {
    if (response?.data?.success || response?.status === 200) {
      router.push('/user/overview');
    }
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useAppDispatch()

  const handleLogin = () => {
    let { email, password } = formData;
    dispatch(clearTempCredentials());
    dispatch(setTempCredentials({ email, password })); // store login credentials
    mutate({
      payload: { email: formData.email, password: formData.password },
    });
  };
  return (
    <div>
      <div className="max-[930px] mx-auto mt-[56px]">
        <h1 className="text-[#02044A] text-center text-[36px] font-medium">Log In to Your Account</h1>
        <p className="text-[#272727] text-center  text-[18px] mt-[16px]">
          Welcome back, enter your login information below to get started with processing your orders.
        </p>
      </div>
      <div className="max-w-[810px] mx-auto mt-[32px]">
        <div className="flex flex-row gap-[16px]">
          <InputField
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            label="Email"
            placeholder="username@email.com"
          />
          <InputField
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            placeholder="Enter password here"
            type="password"
          />
        </div>

        <div className="flex gap-[10px] items-center mt-[16px] text-[16px] text-[#272727]">
          <Checkbox />
          <p>Keep me logged In</p>
        </div>

        <div className=" mt-[32px]">
          <Link className="text-[#0088DD] underline" href="/auth/forgot-password">
            Can’t remember my password? Reset password
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            onClick={handleLogin}
            loading={isPending}
            disabled={!formData.email || !formData.password}
            title="Login Now"
            variant="blue"
            className="w-[274px]"
          />

          <Link className="text-[#21222D] text-[16px] mb-[16px] mt-[32px]" href="/auth/register">
            Don’t have an account
          </Link>

          <Link href="/auth/register">
            <Button title="Register a New Account" variant="outlined-blue-dark" className="w-[274px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

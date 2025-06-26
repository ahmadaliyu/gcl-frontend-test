import { useAlert } from '@/components/reuseables/Alert/alert-context';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { useSignIn } from '@/services';
import { clearTempCredentials, setTempCredentials } from '@/store/auth/formSlice';
import { useAppDispatch } from '@/store/hook';
import { setUser } from '@/store/user/userSlice';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const params = useSearchParams();
  const quote = params.get('quote');
  const dispatch = useAppDispatch();

  const { showAlert } = useAlert();

  const { isPending, mutate } = useSignIn((response: any) => {
    if (response?.response?.status >= 400) {
      showAlert(`${response?.response.data?.message}`, 'error');
    }
    if (response.status === 200) {
      showAlert(`${response?.data?.message}`, 'success');
      const user = response?.data?.data?.user;
      dispatch(setUser(user));

      const isFirstLogin = !localStorage.getItem(`user_${user.id}_logged_in`);
      if (isFirstLogin) {
        localStorage.setItem(`user_${user.id}_logged_in`, 'true');
      }

      if (quote) {
        router.push('/quote-review');
      } else {
        router.push('/user/my-bookings');
      }
    }
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const { email, password } = formData;
    dispatch(clearTempCredentials());
    dispatch(setTempCredentials({ email, password }));
    mutate({ payload: { email, password } });
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-12 pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-[#02044A] text-[28px] sm:text-[36px] font-medium">Log In to Your Account</h1>
        <p className="text-[#272727] text-[16px] sm:text-[18px] mt-4">
          Welcome back, enter your login information below to get started with processing your orders.
        </p>
      </div>

      <div className="max-w-[810px] mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-6">
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

        <div className="flex gap-3 items-center mt-4 text-sm text-[#272727]">
          <Checkbox />
          <p>Keep me logged In</p>
        </div>

        <div className="mt-6">
          <Link className="text-[#0088DD] underline text-sm" href="/auth/forgot-password">
            Can’t remember my password? Reset password
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <Button
            onClick={handleLogin}
            loading={isPending}
            disabled={!formData.email || !formData.password}
            title="Login Now"
            variant="blue"
            className="w-full max-w-[274px]"
          />

          <div className="text-[#21222D] text-[16px] mt-8 mb-4">Don’t have an account</div>

          <Button
            onClick={handleRegister}
            title="Register a New Account"
            variant="outlined-blue-dark"
            className="w-full max-w-[274px]"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

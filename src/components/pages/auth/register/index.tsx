import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { updateField, selectForm, setTempCredentials, clearTempCredentials } from '@/store/auth/formSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function RegisterPage() {
  const form = useAppSelector(selectForm);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    dispatch(updateField({ field: 'marketing_communications', value: checked }));
  };

  const handleRegister = () => {
    const { email, password } = form;
    dispatch(clearTempCredentials());
    dispatch(setTempCredentials({ email, password }));
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Simulate registration success
    router.push('/auth/welcome');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-12 pb-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-[#02044A] text-[28px] sm:text-[36px] font-medium font-poppins">Create your account</h1>
        <p className="text-[#272727] text-[16px] sm:text-[18px] mt-4">
          Welcome, enter your information below to get started with processing your orders
        </p>
      </div>

      <div className="max-w-[810px] mx-auto mt-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <InputField
            name="email"
            value={form?.email || ''}
            onChange={handleInputChange}
            label="Email"
            placeholder="username@email.com"
          />
          <InputField
            isPhoneInput
            name="phone"
            value={form.phone || ''}
            onChange={handleInputChange}
            label="Phone Number"
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <InputField
            name="first_name"
            value={form.first_name || ''}
            onChange={handleInputChange}
            label="First Name"
            placeholder="Enter name here"
          />
          <InputField
            name="last_name"
            value={form.last_name || ''}
            onChange={handleInputChange}
            label="Surname"
            placeholder="Enter surname here"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <InputField
            name="password"
            value={form.password || ''}
            onChange={handleInputChange}
            label="Password"
            placeholder="Enter password here"
            type="password"
          />
          <InputField
            name="confirmPassword"
            value={form.confirmPassword || ''}
            onChange={handleInputChange}
            label="Confirm Password"
            placeholder="Enter password again"
            type="password"
          />
        </div>

        <p className="text-[#E51520] text-[14px]">
          At least 8 characters, 1 upper case, 1 lower case and a special character e.g. #@%!$&*()
        </p>

        <div className="flex gap-3 items-center text-[16px] text-[#272727]">
          <Checkbox checked={form.marketing_communications || false} onCheckedChange={handleCheckboxChange} />
          <p>Marketing Communications</p>
        </div>

        <p className="text-[14px] text-[#757575]">
          You can change your mind at any time by turning this off in your profile settings.
        </p>

        <Link className="text-[#0088DD] underline block mt-4" href="/auth/forgot-password">
          Can't remember my password? Reset password
        </Link>

        <div className="flex flex-col items-center justify-center mt-10 space-y-8">
          <Button
            onClick={handleRegister}
            disabled={!form.email || !form.password || !form.first_name || !form.last_name}
            title="Register Now"
            variant="blue"
            className="w-full max-w-[274px]"
          />

          <Link className="text-[#21222D] text-[16px]" href="/auth/login">
            Already have an account?
          </Link>

          <Button
            title="Login to my old Account"
            variant="outlined-blue-dark"
            className="w-full max-w-[274px]"
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

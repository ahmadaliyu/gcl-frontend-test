import { LoginResponse, post } from '@/services';
import { clearTempCredentials, setTempCredentials } from '@/store/auth/formSlice';
import { useAppDispatch } from '@/store/hook';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type MutationProps = {
  payload: {
    email: string;
    password: string;
  };
};

export const useSignIn = (onSuccess?: (data: any) => void) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('auth/login', payload);
    },
    onSuccess: async (response: LoginResponse) => {

      if (response.status >= 400) {
        const message = response.data?.message || response?.message;
        const slug = response.data?.slug;
        if (slug === 'account_not_verified') {
          router.push('/auth/verify-email');
        }
        alert(`${message}`);
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });

  return { mutate, isPending };
};

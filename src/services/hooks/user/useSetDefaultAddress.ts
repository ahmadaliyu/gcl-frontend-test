import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';

type MutationProps = {
  id: string;
};

export const useSetDefaultAddress = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id }: MutationProps) => {
      return post(`users/addresses/${id}/default`, {});
    },
    onSuccess: async (response: any) => {
      if (response.success === false) {
        throw new Error(response?.message);
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
    onError: (error: Error) => {
      console.error(error, 'Error');
    },
  });

  return { mutate, isPending };
};

import { CustomClearanceResponse, post } from '@/services';
import { useMutation } from '@tanstack/react-query';

type MutationProps = {
  payload: {
    type: string;
    full_name: string;
    email: string;
    phone: string;
    no_of_items: number;
    address: string;
    description: string;
  };
};

export const useClearCustom = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('auth/custom-clearance', payload);
    },
    onSuccess: async (response: CustomClearanceResponse) => {
      if (response.success === false) {
        throw new Error('Failed to clear custom data');
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });

  return { mutate, isPending };
};

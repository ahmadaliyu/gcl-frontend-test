import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { Payment } from './types';

export const useGetPaymentById = (id: string, onSuccess?: (data: any) => void) => {
  return useQuery<Payment, Error>({
    queryKey: ['invoicesIds', id],
    queryFn: async (): Promise<Payment> => {
      const response: Payment = await get(`users/payments/${id}`);

      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    },
  });
};

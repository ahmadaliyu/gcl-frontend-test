import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { Payment, PaymentByIdRes } from './types';

export const useGetPaymentById = (id: string, onSuccess?: (data: any) => void) => {
  return useQuery<PaymentByIdRes, Error>({
    queryKey: ['invoicesIds', id],
    queryFn: async (): Promise<PaymentByIdRes> => {
      const response: PaymentByIdRes = await get(`users/payments/${id}`);

      if (onSuccess) {
        onSuccess(response.resp);
      }
      return response;
    },
  });
};

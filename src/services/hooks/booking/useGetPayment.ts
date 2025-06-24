import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { PaymentResData } from './types';

export const useGetPayment = (onSuccess?: (data: any) => void) => {
  return useQuery<PaymentResData, Error>({
    queryKey: ['invoices'],
    queryFn: async (): Promise<PaymentResData> => {
      const response: PaymentResData = await get('users/payments');

      if (onSuccess) {
        onSuccess(response.resp);
      }
      return response;
    },
  });
};

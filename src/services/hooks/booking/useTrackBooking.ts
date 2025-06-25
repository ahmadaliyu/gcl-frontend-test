import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { BookingStatusResponse } from './types';

export const useTrackBooking = (bookingId: string, onSuccess?: (data: BookingStatusResponse) => void) => {
  return useQuery<BookingStatusResponse, Error>({
    queryKey: ['trackers', bookingId],
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    queryFn: async (): Promise<BookingStatusResponse> => {
      const response: BookingStatusResponse = await get(`users/bookings/tracker/${bookingId}`);

      if (response.success === false) {
        console.error(`Error `);
        throw new Error('Error');
      }

      onSuccess?.(response);

      return response;
    },
  });
};

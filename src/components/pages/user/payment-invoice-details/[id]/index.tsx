import React from 'react';
import { useParams } from 'next/navigation';
import { useGetPaymentById } from '@/services/hooks/booking/useGetPaymentById';
import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import Button from '@/components/reuseables/Button';
import dayjs from 'dayjs';

const PaymentDetails = () => {
  const { id } = useParams();
  const { data: res, isLoading, isError } = useGetPaymentById(id as string);

  const payment = res?.resp;

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderDetailItem = (label: string, value: string | number | undefined) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-medium text-[#272727]">{value || 'N/A'}</span>
    </div>
  );

  return (
    <UserDashboardWrapper>
      <div className="px-4 sm:px-0 max-w-[700px] mx-auto">
        <h1 className="text-[#272727] font-semibold text-[24px] mb-6 text-center">Payment Details</h1>

        {isLoading ? (
          <div className="space-y-4 bg-white p-6 rounded-md border">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-32 rounded" />
          </div>
        ) : isError || !payment ? (
          <p className="text-center text-gray-500">Payment not found or failed to load.</p>
        ) : (
          <div className="bg-white p-6 rounded-md border space-y-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {renderDetailItem('Invoice ID', payment.id)}
              {renderDetailItem('Amount Paid', `£${payment.amount?.toLocaleString()}`)}
              {renderDetailItem('Reference', payment.payment_type)}
              {renderDetailItem('Date', dayjs(payment.createdAt).format('MMMM D, YYYY h:mm A'))}
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Status</span>
                <span
                  className={`inline-block w-fit px-3 py-1 text-sm rounded-full font-medium ${getStatusClasses(
                    payment.status
                  )}`}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1).toLowerCase()}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button title="← Back to Payments" variant="outlined-blue-dark" onClick={() => window.history.back()} />
            </div>
          </div>
        )}
      </div>
    </UserDashboardWrapper>
  );
};

export default PaymentDetails;

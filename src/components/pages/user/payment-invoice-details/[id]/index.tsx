import React from 'react';
import { useParams } from 'next/navigation';
import { useGetPaymentById } from '@/services/hooks/booking/useGetPaymentById';
import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import Button from '@/components/reuseables/Button';

const PaymentDetails = () => {
  const { id } = useParams(); // assuming route is /payments/[id]
  const { data: payment, isLoading, isError } = useGetPaymentById(id as string);

  return (
    <UserDashboardWrapper>
      <div className="px-4 sm:px-0 max-w-[800px] mx-auto">
        <h1 className="text-[#272727] font-[600] text-[20px] sm:text-[24px] mb-6">Payment Details</h1>

        {isLoading ? (
          <div className="space-y-4 bg-white p-4 rounded-md border">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-32 rounded" />
          </div>
        ) : isError || !payment ? (
          <p className="text-center text-gray-500">Payment not found or failed to load.</p>
        ) : (
          <div className="bg-white p-6 rounded-md border space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[#272727] mb-1">Invoice ID</h2>
              <p>{payment.id}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#272727] mb-1">Amount Paid</h2>
              <p>₦{payment.amount?.toLocaleString()}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#272727] mb-1">Status</h2>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  payment.status === 'Pending'
                    ? 'bg-[#FFFDEA] text-[#BB5802]'
                    : payment.status === 'Successful'
                    ? 'bg-[#D5EDFD] text-[#0088DD]'
                    : payment.status === 'Failed'
                    ? 'bg-[#FCE8E9] text-[#E51520]'
                    : ''
                }`}
              >
                {payment.status}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#272727] mb-1">Date</h2>
              <p>{new Date(payment.createdAt).toLocaleString()}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#272727] mb-1">Reference</h2>
              <p>{payment.payment_type || 'N/A'}</p>
            </div>

            <Button title="Back to Payments" variant="outlined-blue-dark" onClick={() => window.history.back()} />
          </div>
        )}
      </div>
    </UserDashboardWrapper>
  );
};

export default PaymentDetails;

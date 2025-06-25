'use client';

import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import React from 'react';
import Button from '@/components/reuseables/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetPayment } from '@/services/hooks/booking/useGetPayment';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

function UserPaymentAndInvoices() {
  const { data: payments, isLoading } = useGetPayment();
  const router = useRouter();

  return (
    <UserDashboardWrapper>
      <div className="px-4 sm:px-0">
        <h1 className="text-[#272727] font-[600] text-[20px] sm:text-[24px] mb-4 sm:mb-[40px]">
          My Payments & Invoices
        </h1>

        <div className="mb-4 sm:mb-[16px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex border gap-2 sm:gap-[10px] border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-10 sm:h-[40px] items-center justify-center px-3 sm:px-[24px] w-full sm:w-auto">
                <span className="text-sm sm:text-base">Filter by Date</span>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="sm:w-5 sm:h-5">
                  <path d="M10 8h4l-2 4z" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[148px] rounded-[16px] p-2">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-white">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-full rounded-md" />
                </div>
              </div>
            ))
          ) : payments?.resp?.length === 0 ? (
            <p className="text-center text-gray-500">No payment invoices found.</p>
          ) : (
            payments?.resp?.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Invoice #{payment.Booking.code}</h3>
                  <span className="text-sm text-gray-500">{new Date(payment.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">₦{payment.amount?.toLocaleString()}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'pending'
                        ? 'bg-orange-100 text-orange-700'
                        : payment.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1).toLowerCase()}{' '}
                  </span>
                </div>
                <Button
                  height="38px"
                  title="View Details"
                  variant="outlined-blue-dark"
                  className="w-full rounded-full"
                  onClick={() => router.push(`/user/payment-invoice-details/${payment.id}`)}
                />
              </div>
            ))
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block w-full overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
                <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Invoice ID</TableHead>
                <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Total Paid</TableHead>
                <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Status</TableHead>
                <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Created</TableHead>
                <TableHead className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <TableRow key={idx}>
                    {Array.from({ length: 5 }).map((_, jdx) => (
                      <TableCell key={jdx} className="py-[30px] px-[8px]">
                        <Skeleton className="h-[20px] w-full rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : payments?.resp?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-[#000000]">
                    No payment invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                payments?.resp?.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                      {payment.Booking.code}
                    </TableCell>
                    <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                      ₦{payment.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                      <div
                        className={`h-[41px] flex items-center justify-center rounded-[32px] px-[12px] w-[120px] ${
                          payment.status === 'pending'
                            ? 'bg-orange-100 text-orange-700'
                            : payment.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : payment.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1).toLowerCase()}{' '}
                      </div>
                    </TableCell>
                    <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                      <Button
                        height="38px"
                        title="View Details"
                        variant="outlined-blue-dark"
                        className="rounded-full"
                        onClick={() => router.push(`/user/payment-invoice-details/${payment.id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

export default UserPaymentAndInvoices;

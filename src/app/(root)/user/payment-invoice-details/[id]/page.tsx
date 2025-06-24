'use client';
import { Suspense } from 'react';
import React from 'react';
import PaymentInvoiceDetails from '@/components/pages/user/payment-invoice-details/[id]';

function page() {
  return (
    <Suspense>
      <PaymentInvoiceDetails />
    </Suspense>
  );
}

export default page;

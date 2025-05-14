'use client';
import { Suspense } from 'react';
import React from 'react';
import MyBookings from '@/components/pages/user/my-bookings';

function page() {
  return (
    <Suspense>
      <MyBookings />
    </Suspense>
  );
}

export default page;

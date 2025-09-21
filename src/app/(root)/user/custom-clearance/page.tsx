'use client';
import CustomClearance from '@/components/pages/user/custom-clearance';
import { Suspense } from 'react';
import React from 'react';

function page() {
  return (
    <Suspense>
      <CustomClearance />
    </Suspense>
  );
}

export default page;

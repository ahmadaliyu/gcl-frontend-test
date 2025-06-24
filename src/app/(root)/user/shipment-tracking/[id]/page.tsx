'use client';
import { Suspense } from 'react';
import React from 'react';
import ShipmentTracking from '@/components/pages/user/shipment-tracking/[id]';

function page() {
  return (
    <Suspense>
      <ShipmentTracking />
    </Suspense>
  );
}

export default page;

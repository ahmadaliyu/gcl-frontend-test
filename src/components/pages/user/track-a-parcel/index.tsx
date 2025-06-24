import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function TrackAParcel() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const router = useRouter();

  const handleTracking = () => {
    if (trackingNumber.trim()) {
      router.push(`/user/shipment-tracking/${trackingNumber}`);
    }
  };

  const handleInputField = (_name: string, value: string) => {
    setTrackingNumber(value);
  };

  return (
    <UserDashboardWrapper>
      <div className="pb-[200px]">
        <div className="max-w-[930px] mx-auto mt-[56px] ">
          <h1 className="text-[#02044A] text-center text-[60px] font-bold">Track a Parcel</h1>
          <p className="text-[#272727] text-center text-[24px] mt-[16px]">
            Track the whereabouts of your parcel and find out the real time status of your deliveries.
          </p>
        </div>
        <div className="max-w-[810px] mx-auto mt-[32px]">
          <div className="flex flex-row gap-[16px]">
            <InputField
              label="Reference or Order Number"
              placeholder="eg. GCL938383787172"
              value={trackingNumber}
              name="tracker"
              onChange={handleInputField}
            />
          </div>

          <div className="mt-[16px]">
            <a className="text-[#0088DD] text-[16px] font-normal">
              Can't find my reference number? Your courier tracking/package number will also work here. Just copy and
              paste it here
            </a>
          </div>

          <div className="flex flex-col items-center justify-center mt-[50px]">
            <Button
              title="Start Tracking"
              variant="blue"
              className="w-[274px]"
              onClick={handleTracking}
              disabled={!trackingNumber.trim()}
            />
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

export default TrackAParcel;

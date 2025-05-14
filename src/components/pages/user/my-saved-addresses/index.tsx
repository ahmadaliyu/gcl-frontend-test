import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import SelectField from '@/components/reuseables/SelectField';
import { Checkbox } from '@/components/ui/checkbox';
import { COUNTRY_CODE_LIST } from '@/constants';
import Link from 'next/link';
import React, { useState } from 'react';

enum TabIds {
  ContactAddresses = 'contact-addresses',
  MyAddresses = 'my-addresses',
}

const tabs = [
  { id: TabIds.ContactAddresses, title: 'Contact Addresses' },
  { id: TabIds.MyAddresses, title: 'My Addresses' },
];
function MySavedAddresses() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.ContactAddresses);
  const [step, setstep] = useState<'show' | 'add'>('show');

  return (
    <UserDashboardWrapper>
      {step === 'add' ? (
        <>
          <h1 className="text-[#272727] font-[600] text-[24px] mb-[32px]">Add New Address</h1>

          <h1 className="text-[#272727] font-[700] text-[16px] mb-3">Recipient Details</h1>

          <div className="flex flex-row gap-[16px]">
            <InputField label="Label Name *" placeholder="Type something here" />

            <InputField label="Address Line*" placeholder="Type something here" />
          </div>

          <div className="flex flex-row gap-[16px] mt-[16px]">
            <InputField label="Address Line 2*" placeholder="Type something here" />
            <InputField label="City/towm*" placeholder="Type something here" />
          </div>

          <div className="flex flex-row gap-[16px] mt-[16px]">
            <InputField label="State*" placeholder="Type something here" />
            <SelectField
              options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
              label="Country*"
              placeholder="Select an option here"
            />
          </div>

          <div className="flex flex-row gap-[16px] mt-[16px]">
            <InputField label="Contact Email*" placeholder="Type something here" />
            <InputField label="Postcode*" placeholder="Type something here" />
          </div>

          <div className="flex flex-row gap-[16px] mt-[16px]">
            <InputField label="Contact Name*" placeholder="Type something here" />
            <InputField label="Telephone*" isPhoneInput placeholder="Type something here" />
          </div>

          <div className="flex flex-row gap-[16px] mt-[16px]">
            <InputField textarea label="Delivery Driver notes" isPhoneInput placeholder="Enter more information here" />
          </div>

          <p className="text-[12px] text-[#0088DD] mt-[18px]">Save Address for future use</p>

          <div className="flex gap-[10px] items-center mt-[16px] text-[16px] text-[#272727]">
            <Checkbox />
            <p>Opt-In/Opt-Out</p>
          </div>

          <div className="flex flex-col items-center justify-center mt-[50px]">
            <Button
              onClick={() => {
                setstep('show');
              }}
              title="Save"
              variant="blue"
              className="w-[274px]"
            />

            <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-[24px] mx-auto text-center">
              Your information is safe with us. Read more about our{' '}
              <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD]">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link target="_blank" href="/privacy-policy" className="text-[#0088DD]">
                Privacy Policy
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">My Saved Addresses</h1>
          <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-[32px] py-[12px] text-[16px] font-medium text-[#272727] ${
                  activeTab === tab.id
                    ? 'bg-[#FCE8E9] border-b-[3px] border-[#E51520] font-[600]'
                    : 'bg-transparent border-b-[3px] border-transparent font-[400]'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div>
            {activeTab === TabIds.ContactAddresses && (
              <div>
                <AddNew setstep={setstep} />
              </div>
            )}
            {activeTab === TabIds.MyAddresses && (
              <div>
                <AddNew setstep={setstep} />
              </div>
            )}

            <div className="flex flex-col gap-[8px]"></div>
          </div>
        </>
      )}
    </UserDashboardWrapper>
  );
}
const AddNew = ({ setstep }: { setstep?: any }) => {
  return (
    <button
      onClick={() => setstep('add')}
      className="bg-[#FCE8E9] w-[520px] h-[209px] rounded-[12px] flex items-center justify-center flex-col"
    >
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.6654 56.0007C9.1987 56.0007 7.94359 55.4789 6.90003 54.4353C5.85648 53.3918 5.33381 52.1358 5.33203 50.6673V26.6673C5.33203 25.8229 5.52136 25.0229 5.90003 24.2673C6.2787 23.5118 6.80048 22.8895 7.46536 22.4007L23.4654 10.4007C23.9543 10.0451 24.4654 9.77843 24.9987 9.60065C25.532 9.42287 26.0876 9.33398 26.6654 9.33398C27.2431 9.33398 27.7987 9.42287 28.332 9.60065C28.8654 9.77843 29.3765 10.0451 29.8654 10.4007L37.132 15.8673C37.8431 16.4007 38.2094 17.0344 38.2307 17.7687C38.252 18.5029 38.0636 19.1358 37.6654 19.6673C37.2671 20.1989 36.7231 20.5438 36.0334 20.702C35.3436 20.8602 34.6209 20.6709 33.8654 20.134L26.6654 14.6673L10.6654 26.6673V50.6673H18.6654C19.4209 50.6673 20.0547 50.9233 20.5667 51.4353C21.0787 51.9473 21.3338 52.5802 21.332 53.334C21.3303 54.0878 21.0743 54.7215 20.564 55.2353C20.0538 55.7491 19.4209 56.0042 18.6654 56.0007H10.6654ZM42.6654 42.6673C45.0654 42.6673 47.388 42.9784 49.6334 43.6007C51.8787 44.2229 54.0227 45.134 56.0654 46.334C56.8654 46.8229 57.4991 47.4789 57.9667 48.302C58.4343 49.1251 58.6671 50.0024 58.6654 50.934C58.6654 52.3562 58.1765 53.5562 57.1987 54.534C56.2209 55.5118 55.0209 56.0007 53.5987 56.0007H31.732C30.3098 56.0007 29.1098 55.5118 28.132 54.534C27.1543 53.5562 26.6654 52.3562 26.6654 50.934C26.6654 50.0007 26.8991 49.1224 27.3667 48.2993C27.8343 47.4762 28.4671 46.8211 29.2654 46.334C31.3098 45.134 33.4547 44.2229 35.7 43.6007C37.9454 42.9784 40.2671 42.6673 42.6654 42.6673ZM32.3987 50.6673H52.932C51.3765 49.7784 49.732 49.1118 47.9987 48.6673C46.2654 48.2229 44.4876 48.0007 42.6654 48.0007C40.8431 48.0007 39.0654 48.2229 37.332 48.6673C35.5987 49.1118 33.9543 49.7784 32.3987 50.6673ZM42.6654 40.0007C40.4431 40.0007 38.5543 39.2229 36.9987 37.6673C35.4431 36.1118 34.6654 34.2229 34.6654 32.0007C34.6654 29.7784 35.4431 27.8895 36.9987 26.334C38.5543 24.7784 40.4431 24.0007 42.6654 24.0007C44.8876 24.0007 46.7765 24.7784 48.332 26.334C49.8876 27.8895 50.6654 29.7784 50.6654 32.0007C50.6654 34.2229 49.8876 36.1118 48.332 37.6673C46.7765 39.2229 44.8876 40.0007 42.6654 40.0007ZM42.6654 34.6673C43.4209 34.6673 44.0547 34.4113 44.5667 33.8993C45.0787 33.3873 45.3338 32.7544 45.332 32.0007C45.3303 31.2469 45.0743 30.614 44.564 30.102C44.0538 29.59 43.4209 29.334 42.6654 29.334C41.9098 29.334 41.2769 29.59 40.7667 30.102C40.2565 30.614 40.0005 31.2469 39.9987 32.0007C39.9969 32.7544 40.2529 33.3882 40.7667 33.902C41.2805 34.4158 41.9134 34.6709 42.6654 34.6673Z"
          fill="#E51520"
        />
      </svg>

      <p className="text-[#E51520] text-[16px] text-center font-bold">Add New Address</p>
      <p className="text-[#E51520] text-[14px] text-center font-normal mt-1">Click here to add a new contact address</p>
    </button>
  );
};
export default MySavedAddresses;

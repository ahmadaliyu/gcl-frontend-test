import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import SelectField from '@/components/reuseables/SelectField';
import { COUNTRY_CODE_LIST } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import React, { useState } from 'react';

enum TabIds {
  PersonalInformation = 'personal-information',
  Security = 'security',
  LinkedAccounts = 'linked-accounts',
}

const tabs = [
  { id: TabIds.PersonalInformation, title: 'Personal Information' },
  { id: TabIds.Security, title: 'Security' },
  { id: TabIds.LinkedAccounts, title: 'Linked Accounts' },
];

function UserAccountSettings() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.PersonalInformation);

  return (
    <UserDashboardWrapper>
      <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">Account Settings</h1>
      <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-[235px] py-[12px] text-[16px] font-medium text-[#272727] ${
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
        {activeTab === TabIds.PersonalInformation && <PersonalInformation />}
        {activeTab === TabIds.Security && <Security />}
        {activeTab === TabIds.LinkedAccounts && <div></div>}
      </div>
    </UserDashboardWrapper>
  );
}

const Security = () => {
  return (
    <div className="mt-[32px]">
      <div className="flex flex-row gap-[16px] mt-[24px]">
        <div className="flex-1">
          <InputField label="Current Password" placeholder="Enter password here" type="password" />
        </div>
        <div className="flex-1" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[24px]">
        <InputField label="New Password" placeholder="Enter password here" type="password" />
        <InputField label="New Confirm Password" placeholder="Enter password here" type="password" />
      </div>

      <p className="text-[#E51520] text-[14px] mt-[6px]">
        At least 8 characters, 1 upper case, 1 lower case and a special character eg. #@%!$&*()
      </p>

      <div className="flex gap-[10px] items-center text-[16px] text-[#272727] mt-[32px]">
        <Checkbox />
        <p>Enable 2FA (Will require an OTP from your registered email to log in)</p>
      </div>
      <p className="text-[14px] text-[#0088DD] mt-[8px]">
        You can change your mind at any time by turning this off in your profile settings.
      </p>

      <Button title="Save Changes" className="mt-[48px]" />
    </div>
  );
};

export enum EStepIds {
  UserDetails = 'user-details',
  BillingAddress = 'billing-address',
  OtherPreferences = 'other-preferences',
  PreviewFinish = 'preview-finish',
}
export type TStep = {
  id: EStepIds;
  title?: string;
  activeIcon?: any;
  inactiveIcon?: any;
};

const PersonalInformation = () => {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.UserDetails);

  const disabled = true;
  return (
    <div className="mt-[32px]">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">My Details</h2>
        <button onClick={() => setActiveStepId(EStepIds.UserDetails)}>
          <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
        </button>
      </div>

      <div className="flex flex-row gap-[16px]">
        <SelectField
          disabled={disabled}
          options={[
            { label: 'Business', value: 'Business' },
            { label: 'Personal', value: 'Personal' },
          ]}
          label="Business/ Personal *"
          placeholder="Select an option here"
        />
        <SelectField
          disabled={disabled}
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          label="Gender *"
          placeholder="Select an option here"
        />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField disabled={disabled} label="Business Name (Optional)" placeholder="Enter business name here" />
        <InputField disabled={disabled} label="Business Line" isPhoneInput placeholder="Enter your phone number here" />
      </div>

      <div className="flex w-full items-center justify-between mt-[40px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Billing Information</h2>
        <button onClick={() => setActiveStepId(EStepIds.BillingAddress)}>
          <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
        </button>
      </div>

      <div className="flex flex-row gap-[16px]">
        <SelectField
          disabled={disabled}
          options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
          label="Country*"
          placeholder="Select an option here"
        />
        <InputField disabled={disabled} label="Address Line*" isPhoneInput placeholder="Enter address line here" />
      </div>

      <div className="flex flex-row gap-[16px] mt-[16px]">
        <InputField disabled={disabled} label="Address Line 2*" isPhoneInput placeholder="Enter address line here" />
        <InputField disabled={disabled} label="City*" isPhoneInput placeholder="Enter city here" />
      </div>

      <div className="flex flex-row gap-[16px]  mt-[16px]">
        <SelectField
          disabled={disabled}
          options={COUNTRY_CODE_LIST.map((x) => ({ label: `${x?.emoji} ${x?.name}`, value: x?.code }))}
          label="Country or State*"
          placeholder="Select an option here"
        />
        <InputField disabled={disabled} label="Postcode*" isPhoneInput placeholder="Enter postcode here" />
      </div>

      <div className="flex flex-row gap-[16px]  mt-[16px]">
        <div className="basis-[50%]">
          <InputField
            disabled={disabled}
            label="EORI Number (Optional)*"
            isPhoneInput
            placeholder="Enter your EORI number here"
          />
        </div>

        <div className="basis-[50%]"></div>
      </div>

      <div className="flex flex-row gap-[16px]  mt-[16px]">
        <InputField disabled={disabled} label="Residential Address *" isPhoneInput placeholder="Yes" value="Yes" />

        <InputField disabled={disabled} label="VAT Registered *" isPhoneInput placeholder="Yes" value="Yes" />
      </div>

      <div className="flex w-full items-center justify-between mt-[40px]">
        <h2 className="text-[#272727] font-bold text-[16px] mb-[16px]">Other Preferences </h2>
        <button onClick={() => setActiveStepId(EStepIds.OtherPreferences)}>
          <h2 className="text-[#E51520] font-normal text-[16px] mb-[16px]">Edit Information</h2>
        </button>
      </div>

      <div className="flex flex-row gap-[16px]">
        <SelectField
          disabled={disabled}
          options={[]}
          label="How did you find us? *"
          placeholder="Select an option here"
        />
        <InputField
          disabled={disabled}
          label="Referral Code (Optional) *"
          isPhoneInput
          placeholder="Enter your referral code here"
        />
      </div>

      <div className="flex flex-row gap-[16px]  mt-[16px]">
        <InputField
          disabled={disabled}
          label="News & Promotional emails *"
          isPhoneInput
          placeholder="Yes"
          value="Yes"
        />

        <InputField
          disabled={disabled}
          label="Shipping & Documentation Emails *"
          isPhoneInput
          placeholder="Yes"
          value="Yes"
        />
      </div>

      <Button title="Save Changes" className="mt-[48px]" />
    </div>
  );
};

export default UserAccountSettings;

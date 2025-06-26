'use client';

import React, { useState } from 'react';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import SelectField from '@/components/reuseables/SelectField';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppSelector } from '@/store/hook';
import { useAddAddress } from '@/services/hooks/user';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useAlert } from '@/components/reuseables/Alert/alert-context';

function AddAddresses() {
  const COUNTRY_CODE_LIST = useAppSelector((state) => state?.country.countries);
  const router = useRouter();

  const { showAlert } = useAlert();

  const { mutate, isPending } = useAddAddress((response) => {
    if (response?.response?.status >= 400) {
      showAlert(`${response?.response?.data?.message}`, 'error');
      return;
    }
    if (response.status === 200) {
      router.back();
    }
  });

  const [formData, setFormData] = useState({
    address_type: '',
    label: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    contact_email: '',
    post_code: '',
    contact_name: '',
    contact_phone: '',
    drivers_note: '',
    is_default: false,
    is_sender_address: false,
  });

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.address_type.trim() &&
      formData.label.trim() &&
      formData.address_line_1.trim() &&
      formData.address_line_2.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.country.trim() &&
      formData.contact_email.trim() &&
      formData.post_code.trim() &&
      formData.contact_name.trim() &&
      formData.contact_phone.trim()
    );
  };

  const handleSave = () => {
    // console.log(
    //   {
    //     payload: {
    //       ...formData,
    //       address_type: formData.address_type.toLowerCase(),
    //       country_iso: formData.country,
    //     },
    //   },
    //   'address'
    // );

    mutate({
      payload: {
        ...formData,
        address_type: formData.address_type.toLowerCase(),
        country_iso: formData.country,
      },
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[800px] p-4">
        <div className="block lg:hidden mb-4 cursor-pointer" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-black" />
        </div>

        <h1 className="text-[#272727] font-[600] text-[24px] mb-[32px] text-center">Add New Address</h1>

        {/* Address Type & Label */}
        <div className="flex flex-col md:flex-row gap-[16px]">
          <SelectField
            options={[
              { label: 'Personal', value: 'Personal' },
              { label: 'Company', value: 'Company' },
            ]}
            label="Address Type*"
            placeholder="Select address type"
            value={formData.address_type}
            onChange={(val) => handleFieldChange('address_type', val)}
            className="w-full md:w-[380px]"
          />

          <InputField
            label="Label Name *"
            placeholder="Type something here"
            value={formData.label}
            name="label"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />
        </div>

        {/* Address Line 2 */}
        <div className="flex flex-col mt-[16px]">
          <InputField
            label="Address Line 2*"
            placeholder="Type something here"
            value={formData.address_line_2}
            name="address_line_2"
            onChange={handleFieldChange}
            className="w-full"
          />
        </div>

        {/* Address Line 1 & City */}
        <div className="flex flex-col md:flex-row gap-[16px] mt-[16px]">
          <InputField
            label="Address Line 1*"
            placeholder="Type something here"
            value={formData.address_line_1}
            name="address_line_1"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />

          <InputField
            label="City/Town*"
            placeholder="Type something here"
            value={formData.city}
            name="city"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />
        </div>

        {/* State & Country */}
        <div className="flex flex-col md:flex-row gap-[16px] mt-[16px]">
          <InputField
            label="State*"
            placeholder="Type something here"
            value={formData.state}
            name="state"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />

          <SelectField
            options={COUNTRY_CODE_LIST.map((x) => ({
              label: `${x.emoji} ${x.name}`,
              value: x.countryCode,
            }))}
            label="Country*"
            placeholder="Select an option here"
            value={formData.country}
            onChange={(val) => handleFieldChange('country', val)}
            className="w-full md:w-[380px]"
          />
        </div>

        {/* Email & Postcode */}
        <div className="flex flex-col md:flex-row gap-[16px] mt-[16px]">
          <InputField
            label="Contact Email*"
            placeholder="Type something here"
            value={formData.contact_email}
            name="contact_email"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />

          <InputField
            label="Postcode*"
            placeholder="Type something here"
            value={formData.post_code}
            name="post_code"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />
        </div>

        {/* Contact Name & Phone */}
        <div className="flex flex-col md:flex-row gap-[16px] mt-[16px]">
          <InputField
            label="Contact Name*"
            placeholder="Type something here"
            value={formData.contact_name}
            name="contact_name"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />

          <InputField
            label="Contact Phone*"
            isPhoneInput
            placeholder="Type something here"
            value={formData.contact_phone}
            name="contact_phone"
            onChange={handleFieldChange}
            className="w-full md:w-[380px]"
          />
        </div>

        {/* Notes */}
        <div className="flex flex-col mt-[16px]">
          <InputField
            textarea
            label="Delivery Driver notes"
            placeholder="Enter more information here"
            value={formData.drivers_note}
            name="drivers_note"
            onChange={handleFieldChange}
            className="w-full"
          />
        </div>

        {/* Checkboxes */}
        <p className="text-[12px] text-[#0088DD] mt-[18px]">Save Address as default</p>

        <div className="flex gap-[10px] items-center mt-[16px] text-[16px] text-[#272727]">
          <Checkbox
            checked={formData.is_default}
            onCheckedChange={(val) => handleFieldChange('is_default', Boolean(val))}
          />
          <p>Save as default</p>
        </div>

        <div className="flex gap-[10px] items-center mt-[16px] text-[16px] text-[#272727]">
          <Checkbox
            checked={formData.is_sender_address}
            onCheckedChange={(val) => handleFieldChange('is_sender_address', Boolean(val))}
          />
          <p>Save as Sender address</p>
        </div>

        {/* Save Button */}
        <div className="flex flex-col items-center justify-center mt-[50px]">
          <Button
            loading={isPending}
            onClick={handleSave}
            title="Save"
            variant="blue"
            className="w-[274px]"
            disabled={!isFormValid()}
          />
        </div>
      </div>
    </div>
  );
}

export default AddAddresses;

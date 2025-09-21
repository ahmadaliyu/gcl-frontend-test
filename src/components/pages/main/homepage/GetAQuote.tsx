import React, { useEffect, useState } from 'react';
import {
  tabs,
  TTab,
  EChannels,
  channels,
  WeightLengthWidthHeight,
  SendFrom,
  SendTo,
  TTabIds,
  ChooseYourPackages,
  FCLPackages,
  ServiceType,
  NumberOfItems,
} from './constants';
import Button from '@/components/reuseables/Button';
import Link from 'next/link';
import InputField from '@/components/reuseables/InputField';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { RootState } from '@/store/store';
import { useClearCustom, useGetQuotes } from '@/services';
import { loadQuotes } from '@/store/auth/quoteDataSlice';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAlert } from '@/components/reuseables/Alert/alert-context';
import Cookies from 'js-cookie';

function GetAQuote() {
  const [activeTab, setActiveTab] = useState<TTab>(tabs[0]);
  const [activeChannel, setActiveChannel] = useState<EChannels>(EChannels.WithinUK);

  useEffect(() => {
    if (activeTab?.channels?.length) setActiveChannel(activeTab?.channels[0]);
  }, [activeTab?.id]);

  const numberOfActiveChannels = activeTab?.channels?.length || 0;

  return (
    <div className="flex flex-col items-center w-full max-w-[690px]">
      <div className="flex w-full border-b-[#7C98B6] border-b divide-x-[1px] divide-[#7C98B6] divide-y-[0px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex flex-col items-center justify-center cursor-pointer text-[14px] flex-1 font-medium gap-[8px] pb-[16px] border-b-[4px] mb-[-1px] ${
              activeTab?.id === tab.id ? 'text-[#E51520] border-b-[#E51520]' : 'text-white border-b-transparent'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {activeTab?.id === tab.id ? tab.icon_active : tab.icon_inactive}
            <span className="text-center">{tab.title}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between gap-4 w-full rounded-t-[16px] mt-6">
        {channels.map((channel) => {
          if (!activeTab.channels?.includes(channel?.key)) return null;

          const isActiveChannel = activeChannel === channel.key;
          return (
            <div
              key={channel.key}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 h-[53px] rounded-t-[16px] text-[14px] font-medium cursor-pointer ${
                isActiveChannel ? 'bg-[#02044A] text-white' : 'bg-gray-300 text-[#02044A]'
              } ${numberOfActiveChannels > 1 ? '' : 'max-w-[200px]'}`}
              onClick={() => setActiveChannel(channel.key)}
            >
              <span className="text-center text-xs">{channel.title}</span>
              {isActiveChannel ? channel.icon_active : channel.icon_inactive}
            </div>
          );
        })}
      </div>

      {activeTab.id === TTabIds.RoadFreight && <RoadFreightAndAirFreightForm activeChannel={activeChannel} />}
      {activeTab.id === TTabIds.SeaFreight && <SeaFreightForm activeChannel={activeChannel} />}
      {activeTab.id === TTabIds.CustomsClearance && <CustomsClearanceForm activeChannel={activeChannel} />}
    </div>
  );
}

const RoadFreightAndAirFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  const { shipment } = useAppSelector((state: RootState) => state.quote);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestName, setGuestName] = React.useState('');

  const { showAlert } = useAlert();

  const { mutate, isPending } = useGetQuotes((response: any) => {
    console.log('Response data:', response);

    const options = response?.data?.data?.options;

    if (response?.status === 200 && Array.isArray(options) && options.length > 0) {
      dispatch(loadQuotes(response.data));
      router.push('/get-a-quote');
    } else if (response?.status === 200 && Array.isArray(options) && options.length === 0) {
      console.log('hello');
      setShowModal(true);
    } else if (response?.response?.status >= 400) {
      showAlert(`${response?.response?.data?.message}`, 'error');
    }
  });

  const handleGetQuote = () => {
    const payload = {
      shipment: {
        ...shipment,
        despatch_date:
          shipment.despatch_date instanceof Date ? shipment.despatch_date.toISOString() : shipment.despatch_date,
      },
    };
    mutate({ payload });
  };

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="flex-1 bg-white min-h-[100px] rounded-b-[16px] w-full p-4 sm:p-6 md:p-8">
      {/* Row 1: Send From / Send To */}
      <div className="flex flex-col md:flex-row gap-4">
        <SendFrom sendFrom={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      {/* Row 2: What Are You Sending / Packaging */}
      {/* <div className="flex flex-col md:flex-row gap-4 mt-4">
        <WhatAreYouSending />
        <OuterPackagingType />
      </div> */}

      {/* Row 3: Dimensions */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full">
          <WeightLengthWidthHeight />
        </div>
        <div className="w-full" />
      </div>

      {/* Row 4: Submit Button */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full">
          <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleGetQuote}
            title="Get a Quote"
            variant="red"
            className="w-full"
          />
        </div>
        <div className="w-full" />
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No services available for this quote</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="Enter your name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            <Input
              placeholder="Enter your email"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
            <Button title="Submit" onClick={handleModalSubmit} className="w-full" variant="blue" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SeaFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <SendFrom />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <ChooseYourPackages />
        <FCLPackages />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Link href={'/get-a-quote'}>
            <Button title="Get a Quote" variant="red" className="w-full" />
          </Link>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

interface FormData {
  type: string;
  // full_name: string;
  // company_name?: string;
  // email: string;
  // phone: string;
  address: string;
  no_of_items?: number;
  description: string;
}

export const CustomsClearanceForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  const { showAlert } = useAlert();

  const { mutate, isPending } = useClearCustom((response) => {
    console.log(response.status, 'Customs clearance response');
    if (response?.status === 200) {
      showAlert('Customs clearance data submitted successfully', 'success');
    }
    if (response.response.status === 400) {
      showAlert(`${response?.response.data.message}`, 'error');
    }
  });

  const [formData, setFormData] = React.useState<FormData>({
    type: '',
    // full_name: '',
    // email: '',
    // phone: '',
    no_of_items: 0,
    address: '',
    description: '',
  });

  // Updated to match InputField's expected onChange signature
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleNumberOfItemsChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      no_of_items: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      payload: {
        type: formData.type,
        // full_name: formData.full_name,
        // email: formData.email,
        // phone: formData.phone,
        no_of_items: formData.no_of_items || 0,
        address: formData.address,
        description: formData.description,
      },
    });
    console.log(formData, 'Form Data Submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <ServiceType value={formData.type} onValueChange={handleServiceTypeChange} />
        {/* <InputField
          label="Full Name"
          placeholder="Enter name here"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
        /> */}
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        {/* <InputField
          label="Company name"
          placeholder="Enter company name here"
          name="company_name"
          value={formData.company_name || ''}
          onChange={handleInputChange}
        /> */}
        {/* <InputField
          label="Email Address"
          placeholder="username@email.com"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        /> */}
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField
            isPhoneInput
            label="Address"
            placeholder="Enter Address here"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          {/* {activeChannel === EChannels.MultipleClearance && (
            <NumberOfItems value={formData.no_of_items} onChange={handleNumberOfItemsChange} />
          )} */}
          <NumberOfItems value={formData.no_of_items} onChange={handleNumberOfItemsChange} />
        </div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField
            label="Give More Details"
            placeholder="Type here..."
            textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Button
            loading={isPending}
            disabled={isPending}
            type="submit"
            title="Submit"
            variant="red"
            className="w-full"
          />
        </div>
        <div className="flex-1"></div>
      </div>
    </form>
  );
};

export default GetAQuote;

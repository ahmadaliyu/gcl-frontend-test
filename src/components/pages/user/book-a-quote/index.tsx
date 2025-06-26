import React, { useEffect, useState } from 'react';
import {
  tabs,
  TTab,
  EChannels,
  channels,
  WeightLengthWidthHeight,
  WhatAreYouSending,
  SendFrom,
  OuterPackagingType,
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
import { useGetCities, useGetCountries, useGetQuotes } from '@/services';
import { loadQuotes } from '@/store/auth/quoteDataSlice';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { clearQuotesData } from '@/store/auth/quoteSlice';
import { Input } from '@/components/ui/input';
import { storage } from '@/lib/storage/localstorage';
import Footer from '@/components/layout/main/footer';
import NavBarIndex from '@/components/layout/main/navbar';
import { setCities, setCountries } from '@/store/auth/countrySlice';

function BookAQuote() {
  const [activeTab, setActiveTab] = useState<TTab>(tabs[0]);
  const [activeChannel, setActiveChannel] = useState<EChannels>(EChannels.WithinUK);

  const { data: countries, isLoading: isLoadingCountries } = useGetCountries();
  const { data: cities, isLoading: isLoadingCities } = useGetCities();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (countries?.data) {
      const transformedCountries = countries.data.map((country) => ({
        name: country.name,
        countryCode: country.alpha_2_code,
        alpha_2_code: country.alpha_2_code,
        has_postal: country.has_postal,
        is_active: country.is_active,
        emoji: country.alpha_2_code
          .split('')
          .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
          .join(''),
      }));
      dispatch(setCountries(transformedCountries));
    }
  }, [countries, dispatch]);

  useEffect(() => {
    if (cities?.data) {
      const transformedCities = cities.data.map((city) => ({
        label: city.name,
        name: city.name,
        code: city.code,
        is_active: city.is_active,
      }));
      dispatch(setCities(transformedCities));
    }
  }, [cities, dispatch]);

  useEffect(() => {
    if (activeTab?.channels?.length) setActiveChannel(activeTab?.channels[0]);
  }, [activeTab?.id]);

  const numberOfActiveChannels = activeTab?.channels?.length || 0;

  return (
    <div className="relative min-h-screen flex flex-col bg-[#ffffff]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/images/homepage-banner-1.webp" alt="frame" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-[40px] pb-[80px] px-4 z-10">
        <div className="w-full max-w-[1440px] flex flex-col items-center">
          <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%]">
            {/* Tabs */}
            <div className="flex border-b border-[#7C98B6] divide-x divide-[#7C98B6]">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex flex-col items-center justify-center cursor-pointer text-[14px] flex-1 font-medium gap-2 pb-4 border-b-4 ${
                    activeTab?.id === tab.id ? 'text-[#E51520] border-b-[#E51520]' : 'text-white border-b-transparent'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {activeTab?.id === tab.id ? tab.icon_active : tab.icon_inactive}
                  <span className="text-center">{tab.title}</span>
                </div>
              ))}
            </div>

            {/* Channels */}
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

            {/* Dynamic Form */}
            <div className="mt-6">
              {activeTab.id === TTabIds.RoadFreight && <RoadFreightForm activeChannel={activeChannel} />}
              {activeTab.id === TTabIds.AirFreight && <AirFreightForm activeChannel={activeChannel} />}
              {activeTab.id === TTabIds.SeaFreight && <SeaFreightForm activeChannel={activeChannel} />}
              {activeTab.id === TTabIds.CustomsClearance && <CustomsClearanceForm activeChannel={activeChannel} />}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-white/90 backdrop-blur-sm py-4">
        <Footer />
      </footer>
    </div>
  );
}

// Road Freight Form (similar to the original combined form)
const RoadFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  const { shipment } = useAppSelector((state: RootState) => state.quote);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestName, setGuestName] = React.useState('');

  const { mutate, isPending } = useGetQuotes((response: any) => {
    if (response?.data?.data?.options && response.data.data.options.length === 0) {
      setShowModal(true);
      return;
    }
    if (response?.status === 200) {
      dispatch(loadQuotes(response.data));
      router.push('/get-a-quote');
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
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex flex-col md:flex-row gap-4">
        <SendFrom sendFrom={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      {/* <div className="flex flex-col md:flex-row gap-4 mt-4">
        <WhatAreYouSending />
        <OuterPackagingType />
      </div> */}

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <WeightLengthWidthHeight />
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleGetQuote}
            title="Get a Quote"
            variant="red"
            className="w-full"
          />
        </div>
        <div className="flex-1" />
      </div>

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

// Air Freight Form (similar to Road Freight but with potential air-specific fields)
const AirFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  const { shipment } = useAppSelector((state: RootState) => state.quote);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestName, setGuestName] = React.useState('');

  const { mutate, isPending } = useGetQuotes((response: any) => {
    if (response?.data?.data?.options && response.data.data.options.length === 0) {
      setShowModal(true);
      return;
    }
    if (response?.status === 200) {
      dispatch(loadQuotes(response.data));
      router.push('/get-a-quote');
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
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex flex-col md:flex-row gap-4">
        <SendFrom sendFrom={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      {/* <div className="flex flex-col md:flex-row gap-4 mt-4">
        <WhatAreYouSending />
        <OuterPackagingType />
      </div> */}

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <WeightLengthWidthHeight />
        </div>
        <div className="flex-1"></div>
      </div>

      {/* Air-specific fields could be added here */}
      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleGetQuote}
            title="Get a Quote"
            variant="red"
            className="w-full"
          />
        </div>
        <div className="flex-1" />
      </div>

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

const CustomsClearanceForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <ServiceType />
        <InputField label="Full Name" placeholder="Enter name here" />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <InputField label="Company name" placeholder="Enter company name here" />
        <InputField label="Email Address" placeholder="username@email.com" />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField label="Phone number" placeholder="Enter phone here" />
        </div>
        <div className="flex-1">{activeChannel === EChannels.MultipleClearance && <NumberOfItems />}</div>
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField label="Give More Details" placeholder="Type here..." textarea />
        </div>
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

export default BookAQuote;

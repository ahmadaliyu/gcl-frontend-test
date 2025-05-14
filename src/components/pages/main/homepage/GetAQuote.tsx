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
            className={`flex flex-col items-center cursor-pointer text-[14px] flex-1 font-medium gap-[8px] pb-[16px] border-b-[4px] mb-[-1px] ${
              activeTab?.id === tab.id ? 'text-[#E51520] border-b-[#E51520]' : 'text-white border-b-transparent'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {activeTab?.id === tab.id ? tab.icon_active : tab.icon_inactive}
            <span>{tab.title}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 flex justify-between gap-[16px] w-full rounded-t-[16px] mt-[24px]">
        {channels.map((channel) => {
          if (!activeTab.channels?.includes(channel?.key)) return null;
          return (
            <div
              key={channel.key}
              className={`flex-1 flex items-center justify-center w-full h-[53px] rounded-t-[16px] text-[14px] font-[500] cursor-pointer ${
                activeChannel !== channel.key ? 'bg-[#02044A] text-white' : 'bg-white text-[#02044A]'
              } ${numberOfActiveChannels > 1 ? '' : 'max-w-[200px]'}`}
              onClick={() => setActiveChannel(channel.key)}
            >
              <span>{channel.title}</span>
            </div>
          );
        })}
      </div>
      {activeTab.id === TTabIds.RoadFreight && <RoadFreightForm activeChannel={activeChannel} />}
      {activeTab.id === TTabIds.SeaFreight && <SeaFreightForm activeChannel={activeChannel} />}
      {activeTab.id === TTabIds.AirFreight && <AirFreightForm activeChannel={activeChannel} />}
      {activeTab.id === TTabIds.CustomsClearance && <CustomsClearanceForm activeChannel={activeChannel} />}
    </div>
  );
}

const RoadFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <SendFrom />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <WhatAreYouSending />
        <OuterPackagingType />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <WeightLengthWidthHeight />
        </div>
        <div className="flex-1"></div>
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

const AirFreightForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  return (
    <div className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <SendFrom />
        <SendTo sendTo={activeChannel === EChannels?.WithinUK ? 'uk' : 'international'} />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <WhatAreYouSending />
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

export default GetAQuote;

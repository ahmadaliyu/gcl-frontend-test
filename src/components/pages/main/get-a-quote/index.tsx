import React, { Fragment, useState } from 'react';
import { activeStep, inActiveStep, steps, EStepIds } from './constants';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '@/components/reuseables/Button';
import Link from 'next/link';

const services = [
  {
    id: 'SFX-001-3921',
    company: 'SwiftFreight',
    transitTime: '3',
    weight: '2.50kg',
    surcharge: '$5.00',
    total: '$45.00',
    collection: '$0.00',
    insurance: '$50 free cover',
  },

  {
    id: 'GMO-002-8473',
    company: 'GlobalMove',
    transitTime: '7',
    weight: '10.00kg',
    surcharge: '$12.50',
    total: '$120.00',
    collection: '$10.00',
    insurance: '$100 optional',
  },

  {
    id: 'PSV-003-1256',
    company: 'PackSavvy',
    transitTime: '2',
    weight: '1.20kg',
    surcharge: '$0.00',
    total: '$15.00',
    collection: '$0.00',
    insurance: '$20 free cover',
  },

  {
    id: 'EXL-004-6739',
    company: 'ExpressLane',
    transitTime: '5',
    weight: '6.75kg',
    surcharge: '$8.00',
    total: '$75.50',
    collection: '$5.00',
    insurance: '$75 free cover',
  },

  {
    id: 'CGK-005-2948',
    company: 'CargoKing',
    transitTime: '9',
    weight: '15.30kg',
    surcharge: '$20.00',
    total: '$200.00',
    collection: '$15.00',
    insurance: '$150 optional',
  },

  {
    id: 'QSH-006-5182',
    company: 'QuickShip',
    transitTime: '1',
    weight: '0.80kg',
    surcharge: '$2.00',
    total: '$12.00',
    collection: '$0.00',
    insurance: '$10 free cover',
  },

  {
    id: 'FFL-007-9304',
    company: 'FreightFlow',
    transitTime: '6',
    weight: '8.00kg',
    surcharge: '$0.00',
    total: '$90.00',
    collection: '$0.00',
    insurance: '$80 free cover',
  },

  {
    id: 'MMS-008-3761',
    company: 'MoveMasters',
    transitTime: '4',
    weight: '3.15kg',
    surcharge: '$3.50',
    total: '$38.00',
    collection: '$0.00',
    insurance: '$30 free cover',
  },

  {
    id: 'PPR-009-7520',
    company: 'ParcelPro',
    transitTime: '8',
    weight: '12.40kg',
    surcharge: '$15.00',
    total: '$145.00',
    collection: '$10.00',
    insurance: '$120 optional',
  },

  {
    id: 'SPT-010-4893',
    company: 'SpeedyTrans',
    transitTime: '3',
    weight: '5.60kg',
    surcharge: '$0.00',
    total: '$60.00',
    collection: '$5.00',
    insurance: '$50 free cover',
  },
];

function GetAQuote() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.SampleQuote);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

  return (
    <div className="py-[80px]">
      <div className="max-screen-wrapper bg-[#fff]">
        <div className="max-screen-inner">
          <div className="flex justify-between items-center">
            {steps.map((item, index) => {
              const isLast = steps?.length - 1 === index;

              const active = activeStepId === item.id || !(activeStepIndex < index);

              return (
                <Fragment key={item.id}>
                  <div
                    className="flex flex-col items-center cursor-pointer relative z-[2]"
                    onClick={() => setActiveStepId(item.id)}
                  >
                    {active ? activeStep : inActiveStep}
                    <h2 className={`text-[14px] mt-[8px] ${active ? 'text-black' : 'text-[#757575]'}`}>{item.title}</h2>
                  </div>
                  {isLast ? null : (
                    <div
                      className={`flex-1  ${active ? 'bg-[#0088DD]' : 'bg-[#E3E3E3]'
                        } h-[4px] mt-[-25px] mx-[-25px] relative z-[1]`}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>

          <div className="flex items-center justify-center pt-[80px] gap-[40px]">
            <p className="text-[#232526] text-[24px] font-[600] font-poppins text-center">Destination</p>
            <svg width="57" height="32" viewBox="0 0 57 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_0_14055)">
                <rect x="0.5" width="56" height="32" rx="8" fill="#272727" />
                <g clipPath="url(#clip1_0_14055)">
                  <path d="M-11.5 26H68.5V46H-11.5V26Z" fill="#FFCC00" />
                  <path d="M-11.5 -14H68.5V6H-11.5V-14Z" fill="#000001" />
                  <path d="M-11.5 6H68.5V26H-11.5V6Z" fill="#FF0000" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_0_14055">
                  <rect x="0.5" width="56" height="32" rx="8" fill="white" />
                </clipPath>
                <clipPath id="clip1_0_14055">
                  <rect width="80" height="60" fill="white" transform="translate(-11.5 -14)" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="flex items-center justify-center ">
            <p className="text-[#0088DD] text-[14px] font-[400] font-poppins text-center">
              Please check for any restrictions to Germany here.
            </p>
          </div>

          <div className="flex items-center justify-center mb-[40px]">
            <p className="text-[#757575] text-[12px] font-[400] font-poppins text-center">
              If you believe this to be an error, please
            </p>
            <p className="text-[#0088DD] text-[12px] font-[400] font-poppins text-center">contact us</p>
          </div>

          <Table className="mb-[100px] mt-[40px]">
            <TableHeader>
              <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">
                  Services (hover for more info)
                </TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Est Transit Time</TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Weight</TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Surcharge</TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Total</TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Collection</TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Insurance Cover</TableHead>
                <TableHead className="text-[#272727] text-[14px] py-[31px] px-[8px]">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.map((service, index) => (
                <TableRow key={service?.id}>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px] flex items-center gap-[10px]">
                    <img src="/icons/outer.png" className="w-[80px] h-[56px]" />
                    <span>{service.company}</span>
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.transitTime}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.weight}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.surcharge}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.total}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.collection}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.insurance}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    <Link href={'/auth/login'}>
                      <Button title="Proceed" height="38px" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default GetAQuote;

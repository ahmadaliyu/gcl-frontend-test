import React, { Fragment, useState } from 'react';
import { steps, EStepIds, inActiveStep, activeStep } from '../constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '@/components/reuseables/Button';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
import { updateBookingField } from '@/store/booking/bookingSlice';
import { setPriceDetails } from '@/store/auth/quoteDataSlice';

function GetAQuote() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.SampleQuote);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

  const { quote } = useAppSelector((state) => state.quoteData);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleNext = (serviceId: string, handlingFee: string, totalAmount: number, totalPrice: number) => {
    let priceDetails = { handlingFee, totalAmount, totalPrice };
    if (user?.email) {
      dispatch(updateBookingField({ field: 'service_id', value: serviceId }));
      dispatch(setPriceDetails(priceDetails));
      router.push(`/quote-review`);
    } else {
      dispatch(updateBookingField({ field: 'service_id', value: serviceId }));
      dispatch(setPriceDetails(priceDetails));
      router.push(`/auth/login?quote=quote`);
    }
  };

  const SERVICES = !!quote?.data
    ? quote?.data?.options.map((option) => ({
        id: option.serviceId,
        company: option.serviceName,
        type: option.serviceType,
        delivery: new Date(option.estimatedDeliveryDate).toLocaleDateString(),
        transitTime: `${option.estimatedDeliveryTime} hours`,
        weight: quote.data.parcels.reduce((sum, p) => sum + p.items.reduce((s, i) => s + i.weight, 0), 0) + 'kg',
        fees: `£${option.legDetails.reduce((sum, leg) => sum + parseFloat(leg.handlingFee), 0)}`,
        total: `£${(
          parseFloat(option.totalPrice.toString()) +
          option.legDetails.reduce((sum, leg) => sum + parseFloat(leg.handlingFee || '0'), 0)
        ).toFixed(2)}`,
        totalPrice: option.totalPrice,
        isExpress: option.isExpress,
      }))
    : [];

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
                      className={`flex-1  ${
                        active ? 'bg-[#0088DD]' : 'bg-[#E3E3E3]'
                      } h-[4px] mt-[-25px] mx-[-25px] relative z-[1]`}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>

          <div className="flex items-center justify-center pt-[80px] gap-[40px]">
            <p className="text-[#232526] text-[24px] font-[600] font-poppins text-center">Destination:</p>
            <p className="text-[#232526] text-[24px] font-[600] font-poppins text-center">
              {quote?.data?.destination?.country_iso}
            </p>
          </div>

          <div className="flex items-center justify-center ">
            <p className="text-[#0088DD] text-[14px] font-[400] font-poppins text-center">
              Please check for any restrictions to {quote?.data?.origin.country_iso || 'this country'} here.
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
              {SERVICES.map((service, index) => (
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
                    {service.fees}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.total}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.type}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.company}
                  </TableCell>
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    <Button
                      onClick={() =>
                        handleNext(
                          service.id,
                          service.fees.replace('£', ''),
                          Number(service.total.replace('£', '')),
                          Number(service.totalPrice)
                        )
                      }
                      title="Buy Now"
                    />
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

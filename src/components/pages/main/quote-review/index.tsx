import React, { Fragment, useEffect, useState } from 'react';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import Link from 'next/link';
import { EStepIds, steps } from './constants';
import SelectField from '@/components/reuseables/SelectField';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
import { useCreateBooking, useGetAddresses } from '@/services';
import {
  addProduct,
  deleteProduct,
  resetBooking,
  updateBookingField,
  updateProduct,
} from '@/store/booking/bookingSlice';
import { clearQuotesData } from '@/store/auth/quoteSlice';
import { clearQuote } from '@/store/auth/quoteDataSlice';
import { useAlert } from '@/components/reuseables/Alert/alert-context';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BookingState } from '@/store/booking/types';

function WelcomePage() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.ReceipientDetails);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

  return (
    <div>
      <div className="mx-auto mt-[56px] pb-[100px]">
        <div className="flex justify-between items-center max-w-[900px] mx-auto mb-[32px]">
          {steps.map((item, index) => {
            const isLast = steps?.length - 1 === index;
            const active = activeStepId === item.id || !(activeStepIndex < index);

            return (
              <Fragment key={item.id}>
                <div
                  className="flex flex-col items-center cursor-pointer relative z-[2]"
                  onClick={() => setActiveStepId(item?.id)}
                >
                  {active ? item?.activeIcon : item?.inactiveIcon}
                  <h2 className={`text-[14px] mt-[8px] ${active ? 'text-black' : 'text-[#757575]'}`}>{item.title}</h2>
                </div>
                {isLast ? null : (
                  <div
                    className={`flex-1  ${
                      active ? 'bg-[#E51520]' : 'bg-[#E3E3E3]'
                    } h-[2px] mt-[-25px] mx-[-25px] relative z-[1]`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>

        {/* {activeStepId === EStepIds.QuoteReview && <QuoteReview setActiveStepId={setActiveStepId} />} */}
        {activeStepId === EStepIds.ReceipientDetails && <ReceipientDetails setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.PackageDetails && <PackageDetails setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.PreviewFinish && <PreviewFinish setActiveStepId={setActiveStepId} />}
      </div>
    </div>
  );
}

export default WelcomePage;

const ReceipientDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const { isFetching, data } = useGetAddresses();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const senderAddresses = data?.data?.filter((addr) => addr.is_sender_address) || [];
  const recipientAddresses = data?.data?.filter((addr) => !addr.is_sender_address) || [];

  const senderAddressOptions = senderAddresses.map((address) => ({
    label: address.label || address.address_line_1 || 'Unnamed Address',
    value: address.id,
  }));

  const recipientAddressOptions = recipientAddresses.map((address) => ({
    label: address.label || address.address_line_1 || 'Unnamed Address',
    value: address.id,
  }));

  const [senderFormData, setSenderFormData] = useState({
    address_id: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postcode: '',
    contact_name: '',
    contact_email: '',
    onsite_telephone: '',
    delivery_note: '',
    country: '',
    country_iso: '',
    address_type: '',
  });

  const [recipientFormData, setRecipientFormData] = useState({
    address_id: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postcode: '',
    contact_name: '',
    contact_email: '',
    onsite_telephone: '',
    delivery_note: '',
    country: '',
    country_iso: '',
    address_type: '',
  });

  const handleSenderFieldChange = (name: string, value: string) => {
    setSenderFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReceiverFieldChange = (name: string, value: string) => {
    setRecipientFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFormattedAddress = (form: typeof senderFormData) => ({
    type: form.address_type,
    label: form.address_id,
    address_line_1: form.address_line_1,
    address_line_2: form.address_line_2,
    country: form.country,
    country_iso: form.country_iso,
    state: form.state,
    city: form.city,
    post_code: form.postcode,
    contact_name: form.contact_name,
    contact_email: form.contact_email,
    contact_phone: form.onsite_telephone,
    drivers_note: form.delivery_note,
    is_sender_address: form === senderFormData,
  });

  const handleAddressSelect = (type: 'sender' | 'recipient', addressId: string) => {
    const source = type === 'sender' ? senderAddresses : recipientAddresses;
    const selectedAddress = source.find((addr) => addr.id === addressId);
    if (!selectedAddress) return;

    const setter = type === 'sender' ? setSenderFormData : setRecipientFormData;
    setter((prev) => ({
      ...prev,
      address_id: selectedAddress.label || '',
      address_line_1: selectedAddress.address_line_1 || '',
      address_line_2: selectedAddress.address_line_2 || '',
      city: selectedAddress.city || '',
      state: selectedAddress.state || '',
      postcode: selectedAddress.post_code || '',
      contact_name: selectedAddress.contact_name || '',
      contact_email: selectedAddress.contact_email || '',
      onsite_telephone: selectedAddress.contact_phone || '',
      delivery_note: selectedAddress.drivers_note || '',
      country: selectedAddress.country || '',
      country_iso: selectedAddress.country_iso || '',
      address_type: selectedAddress.address_type || '',
    }));
  };

  const isFormValid = (form: typeof senderFormData) =>
    form.address_id.trim() &&
    form.address_line_1.trim() &&
    form.address_line_2.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.postcode.trim() &&
    form.contact_name.trim() &&
    form.contact_email.trim() &&
    form.onsite_telephone.trim() &&
    form.country.trim() &&
    form.delivery_note.trim() &&
    form.address_type.trim();

  const handleContinue = () => {
    dispatch(
      updateBookingField({
        field: 'sender_address',
        value: getFormattedAddress(senderFormData),
      })
    );
    dispatch(
      updateBookingField({
        field: 'recipient_address',
        value: getFormattedAddress(recipientFormData),
      })
    );
    setActiveStepId?.(EStepIds.PackageDetails);
  };

  const handleAddAddress = () => router.push('user/add-address');

  useEffect(() => {
    if (senderAddresses.length > 0) {
      const defaultSender = senderAddresses.find((addr) => addr.is_default) || senderAddresses[0];
      handleAddressSelect('sender', defaultSender.id);
    }

    if (recipientAddresses.length > 0) {
      const defaultRecipient = recipientAddresses.find((addr) => addr.is_default) || recipientAddresses[0];
      handleAddressSelect('recipient', defaultRecipient.id);
    }
  }, [data]);

  return (
    <div className="max-w-[900px] items-center flex flex-col mx-auto mt-[56px] pb-[100px] px-4 sm:px-6">
      <h1 className="text-[#02044A] text-center text-2xl md:text-[36px] font-medium">Recipient Details</h1>
      <p className="text-[#272727] text-center text-base md:text-[18px] mt-4">We would like to know your address</p>

      <div className="flex justify-end mt-4 px-4 sm:px-0">
        <button
          className="w-full sm:w-[200px] text-sm border border-gray-400 text-gray-700 px-4 py-2 rounded"
          onClick={handleAddAddress}
        >
          Add address
        </button>
      </div>

      <div className="mt-8 px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Sender Details */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[#272727] font-bold text-base md:text-[16px] mb-2">Sender From</h2>

            <SelectField
              options={senderAddressOptions}
              label="Select a saved address"
              placeholder="Select an option"
              value={senderFormData.address_id}
              onChange={(val: string) => handleAddressSelect('sender', val)}
            />

            {[
              { name: 'address_line_1', label: 'Address Line 1 *' },
              { name: 'address_line_2', label: 'Address Line 2 *' },
              { name: 'city', label: 'City/Town *' },
              { name: 'state', label: 'State *' },
              { name: 'postcode', label: 'Postcode *' },
              { name: 'onsite_telephone', label: 'On-Site Telephone *' },
              { name: 'contact_name', label: 'Contact Name *' },
              { name: 'contact_email', label: 'Contact Email *' },
              { name: 'delivery_note', label: 'Delivery Driver Note' },
            ].map(({ name, label }) => (
              <InputField
                key={name}
                name={name}
                label={label}
                value={senderFormData[name as keyof typeof senderFormData]}
                onChange={handleSenderFieldChange}
              />
            ))}

            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Personal', value: 'personal' },
                { label: 'Company', value: 'company' },
              ]}
              label="Personal or Company *"
              value={senderFormData.address_type}
              onChange={(val: string) => handleSenderFieldChange('address_type', val)}
            />

            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'United States', value: 'United States' },
                { label: 'United Kingdom', value: 'United Kingdom' },
              ]}
              label="Country *"
              value={senderFormData.country}
              onChange={(val: string) => handleSenderFieldChange('country', val)}
            />
          </div>

          {/* Recipient Details */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[#272727] font-bold text-base md:text-[16px] mb-2">Deliver To</h2>

            <SelectField
              options={recipientAddressOptions}
              label="Select a saved address"
              placeholder="Select an option"
              value={recipientFormData.address_id}
              onChange={(val: string) => handleAddressSelect('recipient', val)}
            />

            {[
              { name: 'address_line_1', label: 'Address Line 1 *' },
              { name: 'address_line_2', label: 'Address Line 2 *' },
              { name: 'city', label: 'City/Town *' },
              { name: 'state', label: 'State *' },
              { name: 'postcode', label: 'Postcode *' },
              { name: 'onsite_telephone', label: 'On-Site Telephone *' },
              { name: 'contact_name', label: 'Contact Name *' },
              { name: 'contact_email', label: 'Contact Email *' },
              { name: 'delivery_note', label: 'Delivery Driver Note' },
            ].map(({ name, label }) => (
              <InputField
                key={name}
                name={name}
                label={label}
                value={recipientFormData[name as keyof typeof recipientFormData]}
                onChange={handleReceiverFieldChange}
              />
            ))}

            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Personal', value: 'personal' },
                { label: 'Company', value: 'company' },
              ]}
              label="Personal or Company *"
              value={recipientFormData.address_type}
              onChange={(val: string) => handleReceiverFieldChange('address_type', val)}
            />

            <SelectField
              placeholder="Select an option"
              options={[
                { label: 'Nigeria', value: 'Nigeria' },
                { label: 'United States', value: 'United States' },
                { label: 'United Kingdom', value: 'United Kingdom' },
              ]}
              label="Country *"
              value={recipientFormData.country}
              onChange={(val: string) => handleReceiverFieldChange('country', val)}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-12 px-4">
          <Button
            onClick={handleContinue}
            title="Continue"
            variant="blue"
            className="w-full max-w-[274px]"
            disabled={!isFormValid(senderFormData) || !isFormValid(recipientFormData)}
          />
        </div>

        <p className="text-sm sm:text-base text-[#21222D] font-normal max-w-[630px] mt-6 mx-auto text-center px-4 sm:px-0">
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
    </div>
  );
};

// const PackageDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
//   const booking = useAppSelector((state) => state.booking);
//   const { priceDetails } = useAppSelector((state) => state.quoteData);
//   const dispatch = useAppDispatch();

//   const [form, setForm] = useState({
//     package_no: booking?.product_value || '',
//     product_type: booking?.product_type || '',
//     product_weight: booking?.product_weight || '',
//     product_details: booking?.product_details || '',
//     quantity: booking.product_qty || '1',
//     product_book: booking?.product_book || '',
//     product_code: booking?.product_code || '',
//     unit_weight: booking?.product_weight || '',
//     product_value: booking?.product_value || '',
//   });

//   const handleFieldChange = (field: string, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleContinue = () => {
//     const fieldMap = {
//       ...form,
//       product_qty: form.quantity,
//       amount: Number(priceDetails.handlingFee) + Number(form.quantity) * priceDetails?.totalPrice,
//     };

//     Object.entries(fieldMap).forEach(([field, value]) => {
//       dispatch(updateBookingField({ field, value }));
//     });

//     setActiveStepId?.(EStepIds.PreviewFinish);
//     // console.log(form, 'hmmmm');
//   };

//   const isFormValid = () => {
//     return (
//       // form.package_no.trim() &&
//       form.product_book.trim() &&
//       form.product_details.trim() &&
//       form.product_type.trim() &&
//       form.product_value.trim() &&
//       form.product_weight.trim() &&
//       form.quantity.trim()
//     );
//   };

//   return (
//     <div className="w-full flex justify-center px-4 sm:px-6 py-6">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 sm:p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Package Information</h1>
//           <p className="text-gray-600 text-base sm:text-lg">We would like to know what you are sending</p>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-lg font-medium text-gray-700 mb-4 text-center sm:text-left">Package 1 Details</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Column 1 */}
//             <div className="space-y-4">
//               <InputField
//                 label="Package Number"
//                 value={form.package_no}
//                 name="package_no"
//                 onChange={handleFieldChange}
//                 placeholder="Enter package number"
//                 className="w-full"
//               />

//               <InputField
//                 label="Product Type"
//                 value={form.product_type}
//                 name="product_type"
//                 onChange={handleFieldChange}
//                 placeholder="E.g Electronics"
//                 className="w-full"
//               />

//               <InputField
//                 label="Product Details"
//                 value={form.product_details}
//                 name="product_details"
//                 onChange={handleFieldChange}
//                 placeholder="E.g A 15-inch laptop with accessories"
//                 className="w-full"
//               />
//               <InputField
//                 label="Product Quantity"
//                 value={form.quantity}
//                 name="quantity"
//                 onChange={handleFieldChange}
//                 placeholder="Enter quantity"
//                 type="number"
//                 className="w-full"
//               />
//             </div>

//             {/* Column 2 */}
//             <div className="space-y-4">
//               <InputField
//                 label="Product Book"
//                 value={form.product_book}
//                 name="product_book"
//                 onChange={handleFieldChange}
//                 placeholder="E.g My product Book"
//                 className="w-full"
//               />
//               <InputField
//                 label="Product Code"
//                 value={form.product_code}
//                 name="product_code"
//                 onChange={handleFieldChange}
//                 placeholder="E.g PROD123"
//                 className="w-full"
//               />
//               <InputField
//                 label="Product Weight (kg)"
//                 value={form.product_weight}
//                 name="product_weight"
//                 onChange={handleFieldChange}
//                 placeholder="Enter product weight"
//                 type="number"
//                 className="w-full"
//               />
//               <InputField
//                 label="Product Unit Value (GBP)"
//                 value={form.product_value}
//                 name="product_value"
//                 onChange={handleFieldChange}
//                 placeholder="Enter unit value"
//                 type="number"
//                 className="w-full"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//           <Button
//             onClick={handleContinue}
//             title="Proceed"
//             variant="red"
//             className="w-full sm:w-auto min-w-[200px]"
//             disabled={!isFormValid()}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const PreviewFinish = ({ setActiveStepId }: { setActiveStepId?: any }) => {
//   const booking = useAppSelector((state) => state.booking);
//   const quote = useAppSelector((state) => state.quote);
//   const { quote: quoteData, priceDetails } = useAppSelector((state) => state.quoteData);
//   const dispatch = useAppDispatch();
//   const { showAlert } = useAlert();

//   const { isPending, mutate } = useCreateBooking((response: any) => {
//     if (response?.data?.data.url) {
//       dispatch(clearQuotesData());
//       dispatch(clearQuote());
//       dispatch(resetBooking());
//       window.location.href = response?.data?.data?.url;
//     } else {
//       console.error('Stripe Checkout URL not found');
//       showAlert(response?.response?.data?.message, 'error');
//     }
//   });

//   const handleSubmit = async () => {
//     console.log(
//       {
//         ...booking,
//         origin: {
//           country: quoteData?.data?.origin?.name,
//           country_iso: quoteData?.data?.origin?.country_iso,
//           postcode: quoteData?.data?.origin?.postcode,
//         },
//         destination: {
//           country: quoteData?.data?.destination?.name,
//           country_iso: quoteData?.data?.destination?.country_iso,
//           postcode: quoteData?.data?.destination?.postcode,
//         },
//         amount: Number((booking?.amount ?? 0).toFixed(2)),
//         parcel: quote?.shipment.parcels,
//       },
//       'booking payload all'
//     );

//     // mutate({
//     //   payload: {
//     //     ...booking,
//     //     origin: {
//     //       country: quoteData?.data?.origin?.country_iso,
//     //       country_iso: quoteData?.data?.origin?.country_iso,
//     //       postcode: quoteData?.data?.origin?.postcode,
//     //     },
//     //     destination: {
//     //       country: quoteData?.data?.destination?.country_iso,
//     //       country_iso: quoteData?.data?.destination?.country_iso,
//     //       postcode: quoteData?.data?.destination?.postcode,
//     //     },
//     //     amount: Number((booking?.amount ?? 0).toFixed(2)),
//     //     parcel: quote?.shipment.parcels,
//     //   } as any,
//     // });
//   };

//   // const toggleCheckbox = (field: string) => {
//   //   switch (field) {
//   //     case 'is_insured':
//   //       dispatch(updateBookingField({ field, value: !booking.is_insured }));
//   //       break;
//   //     case 'has_protection':
//   //       dispatch(updateBookingField({ field, value: !booking.has_protection }));
//   //       break;
//   //     case 'is_sign_required':
//   //       dispatch(updateBookingField({ field, value: !booking.is_sign_required }));
//   //       break;
//   //   }
//   // };

//   const handlePrintChange = (value: 'home' | 'shop') => {
//     dispatch(updateBookingField({ field: 'print_type', value }));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
//       <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Order Summary</h1>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Main Section */}
//         <div className="w-full lg:w-[65%] space-y-8">
//           {/* Packages Table */}
//           <div className="overflow-auto rounded border border-gray-200">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100 text-left">
//                 <tr>
//                   <th className="px-4 py-2 border-b">Parcel #</th>
//                   <th className="px-4 py-2 border-b">Item #</th>
//                   <th className="px-4 py-2 border-b">Quantity</th>
//                   <th className="px-4 py-2 border-b">Weight</th>
//                   <th className="px-4 py-2 border-b">Unit Weight</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {quote?.shipment.parcels?.map((parcel, parcelIndex) =>
//                   parcel.items?.map((item, itemIndex) => (
//                     <tr key={`${parcelIndex}-${itemIndex}`} className="border-b hover:bg-gray-50 transition">
//                       <td className="px-4 py-2">{parcelIndex + 1}</td>
//                       <td className="px-4 py-2">{itemIndex + 1}</td>
//                       <td className="px-4 py-2">{item.quantity || 'N/A'}</td>
//                       <td className="px-4 py-2">{item.weight || '0'}</td>
//                       <td className="px-4 py-2">{item.unit_weight || '0'} Kg</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Address Section */}
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <h2 className="text-base font-semibold mb-1">Return Details</h2>
//               <div className="bg-gray-50 p-4 rounded text-sm space-y-1">
//                 <p>{booking.sender_address?.contact_name}</p>
//                 <p>{booking.sender_address?.address_line_1}</p>
//                 <p>{booking.sender_address?.post_code}</p>
//                 <p>{booking.sender_address?.city}</p>
//               </div>
//             </div>

//             <div className="flex-1">
//               <h2 className="text-base font-semibold mb-1">Delivery Details</h2>
//               <div className="bg-gray-50 p-4 rounded text-sm space-y-1">
//                 <p>{booking.sender_address?.contact_name}</p>
//                 <p>{booking.sender_address?.address_line_2}</p>
//                 <p>{booking.sender_address?.post_code}</p>
//                 <p>{booking.sender_address?.country}</p>
//               </div>
//             </div>
//           </div>

//           {/* Optional Features */}
//           {/* <div>
//             <h2 className="text-base font-semibold mb-2">Optional Features</h2>
//             <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
//               {(
//                 [
//                   { label: 'Package Insured', key: 'is_insured' },
//                   { label: 'Additional Protection', key: 'has_protection' },
//                   { label: 'Signature Required', key: 'is_sign_required' },
//                 ] as const
//               ).map(({ label, key }) => (
//                 <label key={key} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={booking[key as 'is_insured' | 'has_protection' | 'is_sign_required']}
//                     onChange={() => toggleCheckbox(key)}
//                   />
//                   {label}
//                 </label>
//               ))}
//             </div>
//           </div> */}

//           {/* Print Options */}
//           {/* <div>
//             <h2 className="text-base font-semibold mb-2">Print Option</h2>
//             <div className="flex flex-col sm:flex-row gap-3 sm:items-center bg-gray-50 p-4 rounded text-sm">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="printOption"
//                   value="home"
//                   checked={booking.print_type === 'home'}
//                   onChange={() => handlePrintChange('home')}
//                 />
//                 Print at Home
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="printOption"
//                   value="shop"
//                   checked={booking.print_type === 'shop'}
//                   onChange={() => handlePrintChange('shop')}
//                 />
//                 Print in Shop (GBP 2.34)
//               </label>
//             </div>
//           </div> */}
//         </div>

//         {/* Summary Section */}
//         <div className="w-full lg:w-[35%]">
//           <div className="bg-gray-50 p-6 rounded-lg text-sm space-y-4">
//             <div className="flex justify-between">
//               <span>Base Price</span>
//               <span>£{priceDetails?.totalPrice || '0.00'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Parcel Protection</span>
//               <span>£{priceDetails?.handlingFee || '0.00'}</span>
//             </div>
//             <div className="flex justify-between font-medium border-t pt-2">
//               <span>Sub-Total</span>
//               <span>£{priceDetails?.totalAmount || '0.00'}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>VAT</span>
//               <span>£0.00</span>
//             </div>
//             <div className="flex justify-between font-bold text-base border-t pt-2">
//               <span>Total Due</span>
//               <span>£{(booking?.amount ?? 0).toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Button */}
//       <div className="mt-6 flex justify-center">
//         <Button
//           title="Proceed to Payment"
//           onClick={handleSubmit}
//           disabled={isPending}
//           loading={isPending}
//           variant="yellow"
//           className="w-full sm:w-auto"
//         />
//       </div>
//     </div>
//   );
// };

const initialForm: Omit<BookingState['product_data'][0], 'id'> = {
  product_book: '',
  product_code: '',
  product_type: '',
  product_details: '',
  product_weight: '',
  product_value: '',
  product_qty: '1',
};

const PackageDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);
  const packages = booking.product_data;
  const { priceDetails } = useAppSelector((state) => state.quoteData);

  const [currentForm, setCurrentForm] = useState(initialForm);
  const [editingPackage, setEditingPackage] = useState<BookingState['product_data'][0] | null>(null);

  const isFormValid = (pkg: typeof currentForm) => {
    return (
      pkg.product_book.trim() &&
      pkg.product_details.trim() &&
      pkg.product_type.trim() &&
      pkg.product_value.trim() &&
      pkg.product_weight.trim() &&
      pkg.product_qty.trim()
    );
  };

  const arePackagesEqual = (a: typeof currentForm, b: typeof currentForm) => {
    return (
      a.product_book === b.product_book &&
      a.product_code === b.product_code &&
      a.product_type === b.product_type &&
      a.product_details === b.product_details &&
      a.product_weight === b.product_weight &&
      a.product_value === b.product_value &&
      a.product_qty === b.product_qty
    );
  };

  const handleFieldChange = (field: keyof typeof currentForm, value: string) => {
    if (editingPackage) {
      setEditingPackage({ ...editingPackage, [field]: value });
    } else {
      setCurrentForm({ ...currentForm, [field]: value });
    }
  };

  const handleAddToList = () => {
    if (!isFormValid(currentForm)) return;

    const duplicate = packages.find((pkg) => arePackagesEqual(pkg, currentForm));
    if (duplicate) {
      alert('This package has already been added.');
      return;
    }

    dispatch(addProduct(currentForm));
    setCurrentForm(initialForm);
  };

  const handleUpdatePackage = () => {
    if (!editingPackage || !editingPackage.id) return;

    dispatch(updateProduct(editingPackage));
    setEditingPackage(null);
  };

  const handleDeletePackage = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleContinue = () => {
    console.log(packages, 'packages before continue');

    if (packages.length > 0) {
      const amount = Number(priceDetails.totalAmount);

      dispatch(updateBookingField({ field: 'amount', value: amount }));

      const cleanedPackages = packages.map(({ id, print_type, ...rest }) => rest);
      dispatch(updateBookingField({ field: 'product_data', value: cleanedPackages }));
    }

    setActiveStepId?.(EStepIds.PreviewFinish);
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Package Information</h1>
          <p className="text-gray-600 text-base sm:text-lg">We would like to know what you are sending</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Product Type"
                value={editingPackage?.product_type || currentForm.product_type}
                name="product_type"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="E.g Electronics"
              />
              <InputField
                label="Product Details"
                value={editingPackage?.product_details || currentForm.product_details}
                name="product_details"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="E.g A 15-inch laptop with accessories"
              />
              <InputField
                label="Product Quantity"
                value={editingPackage?.product_qty || currentForm.product_qty}
                name="product_qty"
                type="number"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="Enter quantity"
              />
              <InputField
                label="Product Book"
                value={editingPackage?.product_book || currentForm.product_book}
                name="product_book"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="E.g My product book"
              />
              <InputField
                label="Product Code"
                value={editingPackage?.product_code || currentForm.product_code}
                name="product_code"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="E.g PROD123"
              />
              <InputField
                label="Product Weight (kg)"
                value={editingPackage?.product_weight || currentForm.product_weight}
                name="product_weight"
                type="number"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="Enter weight"
              />
              <InputField
                label="Product Unit Value (GBP)"
                value={editingPackage?.product_value || currentForm.product_value}
                name="product_value"
                type="number"
                onChange={(name, value) => handleFieldChange(name as keyof typeof currentForm, value)}
                placeholder="Enter unit value"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-start gap-4 mt-4">
              {editingPackage ? (
                <>
                  <Button
                    onClick={handleUpdatePackage}
                    title="Update Package"
                    variant="red"
                    className="w-full sm:w-auto min-w-[200px]"
                    disabled={!isFormValid(editingPackage)}
                  />
                  <Button
                    onClick={() => setEditingPackage(null)}
                    title="Cancel"
                    variant="outlined-blue"
                    className="w-full sm:w-auto min-w-[200px]"
                  />
                </>
              ) : (
                <>
                  <Button
                    onClick={handleAddToList}
                    title="Add Package"
                    variant="red"
                    className="w-full sm:w-auto min-w-[200px]"
                    disabled={!isFormValid(currentForm)}
                  />
                  <Button
                    onClick={handleContinue}
                    title="Continue"
                    variant="outlined-blue"
                    className="w-full sm:w-auto min-w-[200px]"
                    disabled={packages.length === 0}
                  />
                </>
              )}
            </div>
          </div>

          <div className="space-y-4 overflow-x-auto">
            <h4 className="font-semibold text-lg text-gray-700">Added Packages</h4>

            {packages.length === 0 ? (
              <div className="border rounded-lg p-4 text-center bg-gray-50">
                <p className="text-gray-500">No packages added yet</p>
              </div>
            ) : (
              <div className="min-w-full">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="text-left p-2 border">Pkg. No</th>
                      <th className="text-left p-2 border">Type</th>
                      <th className="text-left p-2 border">Details</th>
                      <th className="text-left p-2 border">Qty</th>
                      <th className="text-left p-2 border">Weight (kg)</th>
                      <th className="text-left p-2 border">Value (£)</th>
                      <th className="text-left p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg, idx) => (
                      <tr key={pkg.id || idx} className="hover:bg-gray-50">
                        <td className="p-2 border">{idx + 1}</td>
                        <td className="p-2 border">{pkg.product_type}</td>
                        <td className="p-2 border max-w-xs truncate">{pkg.product_details}</td>
                        <td className="p-2 border">{pkg.product_qty}</td>
                        <td className="p-2 border">{pkg.product_weight}</td>
                        <td className="p-2 border">£{pkg.product_value}</td>
                        <td className="p-2 border">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setEditingPackage(pkg)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => pkg.id && handleDeletePackage(pkg.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewFinish = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const booking = useAppSelector((state) => state.booking);
  const quote = useAppSelector((state) => state.quote);
  const { quote: quoteData, priceDetails } = useAppSelector((state) => state.quoteData);
  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();

  const { isPending, mutate } = useCreateBooking((response: any) => {
    console.log(response, 'booking response');

    if (response?.data?.data.url) {
      dispatch(clearQuotesData());
      dispatch(clearQuote());
      dispatch(resetBooking());
      window.location.href = response?.data?.data?.url;
    } else {
      console.error('Stripe Checkout URL not found');
      showAlert(response?.response?.data?.message, 'error');
    }
  });

  const handleSubmit = async () => {
    const payload = {
      ...booking,
      origin: {
        country: quoteData?.data?.origin?.name,
        country_iso: quoteData?.data?.origin?.country_iso,
        postcode: quoteData?.data?.origin?.postcode,
      },
      destination: {
        country: quoteData?.data?.destination?.name,
        country_iso: quoteData?.data?.destination?.country_iso,
        postcode: quoteData?.data?.destination?.postcode,
      },
      amount: Number((booking?.amount ?? 0).toFixed(2)),
      parcel: quote?.shipment.parcels,
    };

    console.log(payload, 'booking payload all');
    mutate({ payload });
  };

  const toggleAdditionalService = (service: { name: string; amount: number }) => {
    const isSelected = booking.additional_services?.some((s) => s.name === service.name);
    if (isSelected) {
      dispatch({ type: 'booking/removeAdditionalService', payload: service });
    } else {
      dispatch({ type: 'booking/addAdditionalService', payload: service });
    }
  };

  const handlePrintChange = (value: 'home' | 'shop') => {
    dispatch(updateBookingField({ field: 'print_type', value }));
  };

  const additionalServices = [
    {
      name: 'is_insured',
      amount: 10.0,
      label: 'Package Insurance',
    },
    {
      name: 'has_protection',
      amount: 20.0,
      label: 'Additional Protection',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Order Summary</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left/Main Side */}
        <div className="w-full lg:w-[65%] space-y-8">
          {/* Product Summary */}
          <div>
            <h2 className="text-base font-semibold mb-2">Product Summary</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2 border-b">Prd. No</th>
                    <th className="px-4 py-2 border-b">Type</th>
                    <th className="px-4 py-2 border-b">Details</th>
                    <th className="px-4 py-2 border-b">Qty</th>
                    <th className="px-4 py-2 border-b">Weight (kg)</th>
                    <th className="px-4 py-2 border-b">Value (£)</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.product_data?.map((pkg, idx) => (
                    <tr key={pkg.id || idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{pkg.product_type}</td>
                      <td className="px-4 py-2">{pkg.product_details}</td>
                      <td className="px-4 py-2">{pkg.product_qty}</td>
                      <td className="px-4 py-2">{pkg.product_weight}</td>
                      <td className="px-4 py-2">£{pkg.product_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Parcel Summary */}
          <div>
            <h2 className="text-base font-semibold mb-2">Parcel Summary</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    {/* <th className="px-4 py-2 border-b">Parcel </th> */}
                    <th className="px-4 py-2 border-b">Item </th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    <th className="px-4 py-2 border-b">Weight</th>
                    <th className="px-4 py-2 border-b">Unit Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {quote?.shipment.parcels?.map((parcel, parcelIndex) =>
                    parcel.items?.map((item, itemIndex) => (
                      <tr key={`${parcelIndex}-${itemIndex}`} className="border-b hover:bg-gray-50 transition">
                        {/* <td className="px-4 py-2">{parcelIndex + 1}</td> */}
                        <td className="px-4 py-2">{itemIndex + 1}</td>
                        <td className="px-4 py-2">{item.quantity || 'N/A'}</td>
                        <td className="px-4 py-2">{item.weight || '0'}</td>
                        <td className="px-4 py-2">{item.unit_weight || '0'} Kg</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Address Details */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h2 className="text-base font-semibold mb-1">Return Details</h2>
              <div className="bg-gray-50 p-4 rounded text-sm space-y-1">
                <p>{booking.sender_address?.contact_name}</p>
                <p>{booking.sender_address?.address_line_1}</p>
                <p>{booking.sender_address?.post_code}</p>
                <p>{booking.sender_address?.city}</p>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-base font-semibold mb-1">Delivery Details</h2>
              <div className="bg-gray-50 p-4 rounded text-sm space-y-1">
                <p>{booking.recipient_address?.contact_name}</p>
                <p>{booking.recipient_address?.address_line_1}</p>
                <p>{booking.recipient_address?.post_code}</p>
                <p>{booking.recipient_address?.city}</p>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <h2 className="text-base font-semibold mb-2">Additional Services</h2>
            <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
              {additionalServices.map((service) => (
                <label key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={booking.additional_services?.some((s) => s.name === service.name)}
                      onChange={() => toggleAdditionalService(service)}
                    />
                    {service.label}
                  </div>
                  <span>£{service.amount.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary Box */}
        <div className="w-full lg:w-[35%]">
          <div className="bg-gray-50 p-6 rounded-lg text-sm space-y-4">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>£{priceDetails?.totalPrice || '0.00'}</span>
            </div>

            {booking.additional_services?.map((service) => (
              <div key={service.name} className="flex justify-between">
                <span>{additionalServices.find((s) => s.name === service.name)?.label || service.name}</span>
                <span>£{service.amount.toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between">
              <span>Parcel Protection</span>
              <span>£{priceDetails?.handlingFee || '0.00'}</span>
            </div>

            <div className="flex justify-between font-medium border-t pt-2">
              <span>Sub-Total</span>
              <span>£{priceDetails?.totalAmount || '0.00'}</span>
            </div>

            <div className="flex justify-between">
              <span>VAT</span>
              <span>£0.00</span>
            </div>

            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>Total Due</span>
              <span>£{(booking?.amount ?? 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <Button
          title="Proceed to Payment"
          onClick={handleSubmit}
          disabled={isPending}
          loading={isPending}
          variant="yellow"
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
};

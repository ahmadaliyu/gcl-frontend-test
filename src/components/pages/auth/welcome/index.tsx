import React, { Fragment, useEffect, useState } from 'react';
import Button from '@/components/reuseables/Button';
import InputField from '@/components/reuseables/InputField';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { EStepIds, steps } from './constants';
import SelectField from '@/components/reuseables/SelectField';
// import { COUNTRY_CODE_LIST } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updateField, selectForm } from '@/store/auth/formSlice';
import { City, Country, CountryResponse, useGetCities, useGetCountries, useRegister } from '@/services';
import { useRouter } from 'next/navigation';
import { resetCountry, setCities, setCountries } from '@/store/auth/countrySlice';
import { debounce } from 'lodash';
import axios from 'axios';
import { useAlert } from '@/components/reuseables/Alert/alert-context';

function WelcomePage() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.UserDetails);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);
  const form = useAppSelector(selectForm);

  const { countries: COUNTRY_CODE_LIST, cities: CITIES } = useAppSelector((state) => state.country);

  const router = useRouter();
  const { showAlert } = useAlert();

  const { isPending, mutate } = useRegister((response) => {
    if (response?.status === 201 || response?.data?.success) {
      router.push('/auth/verify-email');
    } else {
      showAlert(`${response?.response?.data?.message}`, 'error');
    }
  });

  const handleSubmit = () => {
    const { confirmPassword, postcodeSearch, ...rest } = form;

    // Conditionally exclude `state`
    const { state, ...restWithoutState } = rest;
    const submissionData = !form.state ? restWithoutState : rest;

    // console.log(submissionData, 'submission form');

    mutate({ payload: submissionData });
  };

  return (
    <div>
      <div className="max-w-[900px] mx-auto mt-[56px] pb-[100px]">
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

        {activeStepId === EStepIds.UserDetails && <UserDetails setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.BillingAddress && <BillingAddress setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.OtherPreferences && <OtherPreferences setActiveStepId={setActiveStepId} />}
        {activeStepId === EStepIds.PreviewFinish && (
          <PreviewFinish
            COUNTRY_CODE_LIST={COUNTRY_CODE_LIST.map((x) => ({
              ...x,
              label: `${x?.emoji ?? ''} ${x?.name ?? ''}`.trim(),
              value: x?.name ?? '',
            }))}
            CITIES={CITIES.map((city) => ({
              ...city,
              label: city.label ?? city.name,
            }))}
            form={form}
            setActiveStepId={setActiveStepId}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}

export default WelcomePage;

const UserDetails = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const form = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  return (
    <>
      <h1 className="text-[#02044A] text-center text-[36px] font-medium">Welcome to GCL, {form.first_name}</h1>
      <p className="text-[#272727] text-center text-[18px] mt-[16px]">
        Just a few more steps to get some important shipping information
      </p>
      <div className="mt-8 px-4 sm:px-6 md:px-0">
        <h2 className="text-[#272727] font-bold text-[16px] mb-4">Your Details</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <SelectField
            options={[
              { label: 'Business', value: 'Business' },
              { label: 'Personal', value: 'Personal' },
            ]}
            value={form.account_type}
            onChange={(value) => handleFieldChange('account_type', value)}
            label="Business/ Personal *"
            placeholder="Select an option here"
          />
          <SelectField
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            value={form.gender}
            onChange={(value) => handleFieldChange('gender', value)}
            label="Gender *"
            placeholder="Select an option here"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <InputField
            name="business_name"
            value={form.business_name}
            onChange={handleInputChange}
            label="Business Name (Optional)"
            placeholder="Enter business name here"
          />
          <InputField
            name="business_phone"
            value={form.business_phone}
            onChange={handleInputChange}
            label="Business Line"
            placeholder="Enter your phone number here"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <Button
            onClick={() => setActiveStepId?.(EStepIds.BillingAddress)}
            title="Continue"
            variant="blue"
            className="w-full max-w-[274px]"
          />
        </div>

        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-6 mx-auto text-center px-4">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD] underline">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD] underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

const BillingAddress = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const form = useAppSelector(selectForm);
  const dispatch = useAppDispatch();
  const { countries: COUNTRY_CODE_LIST, cities: CITIES } = useAppSelector((state) => state.country);

  const [postcodeSearch, setPostcodeSearch] = useState('');
  const [postcodeSuggestions, setPostcodeSuggestions] = useState<string[]>([]);
  const [postcodeError, setPostcodeError] = useState<string>('');
  const [isValidatingPostcode, setIsValidatingPostcode] = useState(false);

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    dispatch(updateField({ field, value }));
    if (field === 'country') {
      dispatch(updateField({ field: 'post_code', value: '' }));
      if (value !== 'Nigeria') {
        dispatch(updateField({ field: 'state', value: '' }));
      }
      setPostcodeSearch('');
      setPostcodeSuggestions([]);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  const handleCheckboxChange = (field: keyof typeof form, checked: boolean) => {
    dispatch(updateField({ field, value: checked }));
  };

  const { data: countries } = useGetCountries();
  const { data: cities } = useGetCities();

  const selectedCountryCode = COUNTRY_CODE_LIST.find((c) => c.name === form.country)?.countryCode;
  const isNigeria = selectedCountryCode === 'NG';

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
        id: city.name,
        label: city.name,
        value: city.name,
        name: city.name,
        code: city.code,
        is_active: city.is_active,
      }));
      dispatch(setCities(transformedCities));
    }
  }, [cities, dispatch]);

  const fetchPostcodes = debounce(async (query: string) => {
    try {
      setIsValidatingPostcode(true);
      const response = await axios.get(`https://api.postcodes.io/postcodes?q=${query}`);
      const result = response.data?.result;

      if (!result || result.length === 0) {
        setPostcodeSuggestions([]);
        setPostcodeError('Invalid postcode. Please enter a valid one.');
      } else {
        const postcodes = result.map((item: any) => item.postcode);
        setPostcodeSuggestions(postcodes);
        setPostcodeError('');
      }
    } catch (err) {
      setPostcodeSuggestions([]);
      setPostcodeError('Postcode lookup failed');
    } finally {
      setIsValidatingPostcode(false);
    }
  }, 800);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-[#272727] text-center text-lg md:text-xl px-4 mb-8">
        We would like to know your billing address
      </p>

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h2 className="text-[#272727] font-bold text-lg md:text-xl mb-6">Billing Details</h2>

        <div className="space-y-6">
          {/* Country Select - Full width */}
          <SelectField
            options={COUNTRY_CODE_LIST.map((x) => ({
              label: `${x?.emoji} ${x?.name}`,
              value: x?.name,
            }))}
            value={form.country}
            onChange={(value) => handleFieldChange('country', value)}
            label="Country*"
            placeholder="Select an option here"
          />

          {/* Address Line 1 and 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              value={form.address_line_1}
              name="address_line_1"
              onChange={handleInputChange}
              label="Address Line*"
              placeholder="Enter address line here"
            />
            <InputField
              value={form.address_line_2}
              name="address_line_2"
              onChange={handleInputChange}
              label="Address Line 2"
              placeholder="Enter address line here"
            />
          </div>

          {/* City and State/Postcode - Properly aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputField
                value={form.city}
                name="city"
                onChange={handleInputChange}
                label="City*"
                placeholder="Enter city here"
              />
            </div>

            {isNigeria ? (
              <div>
                <SelectField
                  options={CITIES.map((x) => ({
                    label: x.name,
                    value: x.name,
                  }))}
                  value={form.state}
                  onChange={(value) => {
                    handleFieldChange('state', value);
                    const selectedCity = CITIES.find((c) => c.name === value);
                    if (selectedCity) {
                      dispatch(updateField({ field: 'post_code', value: selectedCity.code }));
                    }
                  }}
                  label="State*"
                  placeholder="Select an option here"
                />
              </div>
            ) : (
              <div className="relative">
                <InputField
                  name="postcodeSearch"
                  value={postcodeSearch}
                  onChange={(name, value) => {
                    setPostcodeSearch(value);
                    fetchPostcodes(value);
                  }}
                  label="Search Postcode*"
                  placeholder="Type postcode here to search"
                  error={postcodeError}
                />
                {postcodeSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md bg-white max-h-[150px] overflow-y-auto shadow-lg">
                    {postcodeSuggestions.map((pc, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          dispatch(updateField({ field: 'post_code', value: pc }));
                          setPostcodeSearch(pc);
                          setPostcodeSuggestions([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                      >
                        {pc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Postcode display and EORI Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isNigeria ? (
              <div className="flex flex-col">
                <label className="text-[#0088DD] text-[12px] mb-1">Postcode</label>
                <div className="w-full border border-[#CCD6DF] rounded-[10px] h-[61px] py-[8px] px-[16px] bg-[#F5F5F5] flex items-center">
                  <span className={`text-[12px] ${form.post_code ? 'text-[#272727]' : 'text-[#757575]'}`}>
                    {form.post_code || 'Postcode will be auto-filled'}
                  </span>
                </div>
              </div>
            ) : (
              <InputField
                name="post_code"
                value={form.post_code || ''}
                label="Selected Postcode"
                disabled
                placeholder="No postcode selected"
              />
            )}

            <InputField
              value={form.eori_number}
              name="eori_number"
              onChange={handleInputChange}
              label="EORI Number (Optional)"
              placeholder="Enter your EORI number here"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Checkbox
                checked={form.is_residential}
                onCheckedChange={(checked) => handleCheckboxChange('is_residential', checked as boolean)}
                className="mr-3"
              />
              <label className="text-base text-[#272727]">I confirm that this is a residential address</label>
            </div>
            <div className="flex items-center">
              <Checkbox
                checked={form.is_vat_registered}
                onCheckedChange={(checked) => handleCheckboxChange('is_vat_registered', checked as boolean)}
                className="mr-3"
              />
              <label className="text-base text-[#272727]">I confirm that I am VAT registered</label>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-6">
            <Button
              onClick={() => setActiveStepId?.(EStepIds.OtherPreferences)}
              title="Continue"
              variant="blue"
              className="w-full md:w-auto md:min-w-[200px]"
              disabled={!isNigeria && (!form.post_code || !!postcodeError || isValidatingPostcode)}
            />
          </div>

          {/* Footer Text */}
          <p className="text-sm md:text-base text-[#21222D] text-center pt-6 border-t border-gray-100">
            Your information is safe with us. Read more about our{' '}
            <Link href="/terms-and-conditions" className="text-[#0088DD] hover:underline">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-[#0088DD] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const OtherPreferences = ({ setActiveStepId }: { setActiveStepId?: any }) => {
  const form = useAppSelector(selectForm);
  const { countries: COUNTRY_CODE_LIST } = useAppSelector((state) => state.country);
  const dispatch = useAppDispatch();

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(updateField({ field: name as any, value }));
  };

  const handleCheckboxChange = (field: keyof typeof form, checked: boolean) => {
    dispatch(updateField({ field, value: checked }));
  };

  return (
    <>
      <p className="text-[#272727] text-center text-[18px] px-4">
        Last step, let’s get some basic preferences from you
      </p>

      <div className="mt-8 px-4 sm:px-6 md:px-0">
        <h2 className="text-[#272727] font-bold text-[16px] mb-4">Other Preferences</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <SelectField
            options={[
              { label: 'Social Media', value: 'Social Media' },
              { label: 'Friend', value: 'Friend' },
              { label: 'Google Search', value: 'Google Search' },
            ]}
            value={form.how_you_found_us}
            onChange={(value) => handleFieldChange('how_you_found_us', value)}
            label="How did you find us? *"
            placeholder="Select an option here"
          />
          <InputField
            value={form.ref_by}
            name="ref_by"
            onChange={handleInputChange}
            label="Referral Code (Optional)"
            placeholder="Enter your referral code here"
          />
        </div>

        <div className="flex gap-2 items-center mt-6 text-[16px] text-[#272727]">
          <Checkbox
            checked={form.promotional_emails}
            onCheckedChange={(checked) => handleCheckboxChange('promotional_emails', checked as boolean)}
          />
          <p>Opt in for news and promotional emails</p>
        </div>

        <div className="flex gap-2 items-center mt-2 text-[16px] text-[#272727]">
          <Checkbox
            checked={form.shipping_emails}
            onCheckedChange={(checked) => handleCheckboxChange('shipping_emails', checked as boolean)}
          />
          <p>Opt in for shipping and documentation emails</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <Button
            onClick={() => setActiveStepId?.(EStepIds.PreviewFinish)}
            title="Continue"
            variant="blue"
            className="w-full max-w-[274px]"
          />
        </div>

        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-6 mx-auto text-center px-4">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD] underline">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD] underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

const PreviewFinish = ({
  setActiveStepId,
  handleSubmit,
  isPending,
  COUNTRY_CODE_LIST,
  CITIES,
  form,
}: {
  setActiveStepId?: any;
  handleSubmit: () => void;
  isPending: boolean;
  COUNTRY_CODE_LIST: Country[];
  CITIES: City[];
  form: any;
}) => {
  return (
    <>
      <p className="text-[#272727] text-center text-[18px] px-4">
        And you're done. Please check the details and confirm all the details that you entered
      </p>

      <h2 className="text-[#272727] font-bold text-[16px] text-center mt-4 mb-4 px-4">Final Preview</h2>

      <div className="mt-8 px-4 sm:px-6 md:px-0">
        {/* === Your Details === */}
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="text-[#272727] font-bold text-[16px] mb-4">Your Details</h2>
          <button onClick={() => setActiveStepId(EStepIds.UserDetails)}>
            <h2 className="text-[#E51520] font-normal text-[16px] mb-4">Edit Information</h2>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <SelectField
            disabled
            options={[
              { label: 'Business', value: 'Business' },
              { label: 'Personal', value: 'Personal' },
            ]}
            value={form.account_type}
            label="Business/ Personal *"
            placeholder="Select an option here"
          />
          <SelectField
            disabled
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            value={form.gender}
            label="Gender *"
            placeholder="Select an option here"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <InputField
            disabled
            value={form.business_name}
            label="Business Name (Optional)"
            placeholder="Enter business name here"
          />
          <InputField
            disabled
            value={form.business_phone}
            label="Business Line"
            placeholder="Enter your phone number here"
          />
        </div>

        {/* === Billing Info === */}
        <div className="flex items-center justify-between flex-wrap mt-10">
          <h2 className="text-[#272727] font-bold text-[16px] mb-4">Billing Information</h2>
          <button onClick={() => setActiveStepId(EStepIds.BillingAddress)}>
            <h2 className="text-[#E51520] font-normal text-[16px] mb-4">Edit Information</h2>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <SelectField
            disabled
            options={CITIES.map((x) => ({ label: x.label, value: x.label }))}
            value={form.country}
            label="Country*"
            placeholder={form.country}
          />
          <InputField disabled value={form.address_line_1} label="Address Line*" placeholder={form.address_line_1} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <InputField disabled value={form.address_line_2} label="Address Line 2" placeholder={form.address_line_2} />
          <InputField disabled value={form.city} label="City*" placeholder="Enter city here" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <SelectField
            disabled
            options={COUNTRY_CODE_LIST.map((x) => ({ label: x.name, value: x.name }))}
            value={form.state}
            label="State*"
            placeholder="Select an option here"
          />
          <InputField disabled value={form.post_code} label="Postcode*" placeholder={form.post_code} />
        </div>

        <div className="mt-4">
          <InputField
            disabled
            value={form.eori_number}
            label="EORI Number (Optional)"
            placeholder={form.eori_number}
            className="w-full"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <InputField
            disabled
            value={form.is_residential ? 'Yes' : 'No'}
            label="Residential Address *"
            placeholder={form.is_residential ? 'Yes' : 'No'}
          />
          <InputField
            disabled
            value={form.is_vat_registered ? 'Yes' : 'No'}
            label="VAT Registered *"
            placeholder={form.is_vat_registered ? 'Yes' : 'No'}
          />
        </div>

        {/* === Other Preferences === */}
        <div className="flex items-center justify-between flex-wrap mt-10">
          <h2 className="text-[#272727] font-bold text-[16px] mb-4">Other Preferences</h2>
          <button onClick={() => setActiveStepId(EStepIds.OtherPreferences)}>
            <h2 className="text-[#E51520] font-normal text-[16px] mb-4">Edit Information</h2>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <SelectField
            disabled
            options={[
              { label: 'Social Media', value: 'Social Media' },
              { label: 'Friend', value: 'Friend' },
              { label: 'Google Search', value: 'Google Search' },
            ]}
            value={form.how_you_found_us}
            label="How did you find us? *"
            placeholder={form.how_you_found_us}
          />
          <InputField disabled value={form.ref_by} label="Referral Code (Optional)" placeholder={form.ref_by} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <InputField
            disabled
            value={form.promotional_emails ? 'Yes' : 'No'}
            label="News & Promotional emails *"
            placeholder={form.promotional_emails ? 'Yes' : 'No'}
          />
          <InputField
            disabled
            value={form.shipping_emails ? 'Yes' : 'No'}
            label="Shipping & Documentation Emails *"
            placeholder={form.shipping_emails ? 'Yes' : 'No'}
          />
        </div>

        {/* === Confirm Button === */}
        <div className="flex flex-col items-center justify-center mt-12">
          <Button
            onClick={handleSubmit}
            loading={isPending}
            title="Confirm & Continue to my Quote"
            variant="blue"
            className="w-full max-w-[465px]"
          />
        </div>

        {/* === Disclaimer === */}
        <p className="text-[16px] text-[#21222D] font-normal max-w-[630px] mt-6 mx-auto text-center px-4">
          Your information is safe with us. Read more about our{' '}
          <Link target="_blank" href="/terms-and-conditions" className="text-[#0088DD] underline">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="/privacy-policy" className="text-[#0088DD] underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

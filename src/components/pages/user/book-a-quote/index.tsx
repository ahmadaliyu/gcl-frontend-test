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
import { useClearCustom, useGetAddresses, useGetCities, useGetCountries, useGetQuotes } from '@/services';
import { loadQuotes } from '@/store/auth/quoteDataSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Footer from '@/components/layout/main/footer';
import { setCities, setCountries } from '@/store/auth/countrySlice';
import { useAlert } from '@/components/reuseables/Alert/alert-context';
import { useUploadFile } from '@/services/hooks/user';
import Cookies from 'js-cookie';

function BookAQuote() {
  const [activeChannel, setActiveChannel] = useState<EChannels>(EChannels.WithinUK);

  const { data: countries, isLoading: isLoadingCountries } = useGetCountries();
  const { data: cities, isLoading: isLoadingCities } = useGetCities();

  const searchParams = useSearchParams();

  const isCustomClearance = searchParams?.get('isCustomClearance') === 'true';

  const [activeTab, setActiveTab] = useState<TTab>(isCustomClearance ? tabs[1] : tabs[0]); // this will change when we have road and sea freight

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
              {/* {activeTab.id === TTabIds.RoadFreight && <RoadFreightForm activeChannel={activeChannel} />} */}
              {activeTab.id === TTabIds.AirFreight && <AirFreightForm activeChannel={activeChannel} />}
              {/* {activeTab.id === TTabIds.SeaFreight && <SeaFreightForm activeChannel={activeChannel} />} */}
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
    // console.log(payload, 111);

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

interface FormData {
  type: string;
  address: string;
  no_of_items?: number;
  description: string;
  full_name?: string;
  email?: string;
  phone?: string;
}

export const CustomsClearanceForm = ({ activeChannel }: { activeChannel?: EChannels }) => {
  const { showAlert } = useAlert();
  const router = useRouter();

  const { data: addresses } = useGetAddresses();

  const { mutate, isPending } = useClearCustom((response) => {
    if (response?.status === 200) {
      showAlert('Customs clearance data submitted successfully', 'success');
    }
    if (response.response?.status === 400) {
      showAlert(`${response?.response.data.message}`, 'error');
    }
  });

  const { mutate: uploadFile, isPending: uploading } = useUploadFile((res) => {
    if (res?.data.filePath) {
      setUploadedFileData({
        filePath: res.data.filePath,
        url: res.data.filePath || res.data.filePath,
      });
      showAlert('File uploaded successfully', 'success');
    }
  });

  // ✅ pick default address (exclude line1 & line2)
  const defaultAddressObj = addresses?.data?.find((addr: any) => addr?.is_default) || null;

  const defaultAddress = defaultAddressObj
    ? `${defaultAddressObj.city || ''}, ${defaultAddressObj.state || ''}, ${defaultAddressObj.country || ''}, ${
        defaultAddressObj.post_code || ''
      }`
        .replace(/\s*,\s*,/g, ',')
        .trim()
    : '';

  const [formData, setFormData] = React.useState<FormData>({
    type: '',
    no_of_items: 0,
    address: defaultAddress,
    description: '',
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [uploadedFileData, setUploadedFileData] = React.useState<any>(null);

  React.useEffect(() => {
    if (defaultAddress && !formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: defaultAddress,
      }));
    }
  }, [addresses]);

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

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        showAlert('Please select a PDF, JPG, JPEG, or PNG file', 'error');
        return;
      }

      if (file.size > maxSize) {
        showAlert('File size must be less than 10MB', 'error');
        return;
      }

      setSelectedFile(file);
      // Set default name as filename without extension
      const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
      setFileName(nameWithoutExt);

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For PDF files, show a PDF icon
        setFilePreview('pdf');
      }

      showAlert(`File "${file.name}" selected. Click upload to proceed.`, 'info');
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile || !fileName.trim()) {
      showAlert('Please select a file and enter a name', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    uploadFile(
      { payload: formData },
      {
        onSuccess: (uploadResponse) => {
          const fileData = uploadResponse.data.data;

          const newFile = {
            name: fileName.trim(),
            filePath: fileData.filePath || fileData.url || fileData.path || 'File uploaded successfully',
            originalFileName: selectedFile.name, // Keep original filename for display
            fileSize: selectedFile.size, // Keep file size for display
          };

          setUploadedFileData(newFile);
          // Don't clear selectedFile and filePreview - keep them for display
          showAlert('File uploaded successfully', 'success');
        },
        onError: (error) => {
          showAlert('File upload failed', 'error');
        },
      }
    );
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFileName('');
    setUploadedFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showAlert('File removed', 'info');
  };

  const handleChangeFile = () => {
    // Clear everything and allow user to select a new file
    setSelectedFile(null);
    setFilePreview(null);
    setFileName('');
    setUploadedFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    triggerFileSelect();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check if user is logged in
    const token = Cookies.get('token');
    if (!token) {
      showAlert('Please login to continue', 'error');
      router.push('/auth/login');
      return;
    }

    // Submit with file data as a separate object in the payload
    mutate({
      payload: {
        type: formData.type,
        no_of_items: formData.no_of_items || 0,
        address: formData.address,
        description: formData.description,
        data: uploadedFileData, // File data as separate object
      },
    });
  };

  // ✅ Enhanced validation - file upload is now required
  const isFormValid =
    formData.type.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.description.trim() !== '' &&
    (formData.no_of_items ?? 0) > 0 &&
    uploadedFileData !== null;

  return (
    <form onSubmit={handleSubmit} className="flex-1 h-full bg-white min-h-[100px] rounded-b-[16px] w-full p-[16px]">
      <div className="flex gap-[16px]">
        <ServiceType value={formData.type} onValueChange={handleServiceTypeChange} />
      </div>

      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <InputField
            label="Address"
            placeholder="Enter Address here"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <NumberOfItems value={formData.no_of_items} onChange={handleNumberOfItemsChange} />
        </div>
      </div>

      {/* Give More Details as TextArea */}
      <div className="flex gap-[16px] mt-[16px]">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Give More Details</label>
          <textarea
            className="w-full border rounded-md p-2 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Type here..."
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Upload Air Waybill / Bill of Lading - Improved UI with Preview */}
      <div className="mt-[16px]">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Air Waybill / Bill of Lading *
          <span className="text-xs text-gray-500 ml-2">(PDF, JPG, PNG up to 10MB)</span>
        </label>

        <div className="space-y-4">
          {/* File input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
          />

          {/* File name input - Show when file is selected but not uploaded */}
          {selectedFile && !uploadedFileData && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
              <input
                type="text"
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
          )}

          {/* Upload area */}
          {!selectedFile && !uploadedFileData ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50"
              onClick={triggerFileSelect}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to select a file</p>
              <p className="text-xs text-gray-500">or drag and drop here</p>
            </div>
          ) : (
            /* File preview and actions */
            <div className="border-2 border-gray-200 rounded-lg p-4">
              {/* File preview */}
              <div className="flex items-center space-x-4">
                {filePreview && filePreview !== 'pdf' ? (
                  <div className="flex-shrink-0">
                    <img src={filePreview} alt="File preview" className="h-16 w-16 object-cover rounded border" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 bg-red-100 rounded-lg h-16 w-16 flex items-center justify-center">
                    <svg className="h-8 w-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFileData ? uploadedFileData.name : selectedFile?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {((uploadedFileData?.fileSize || selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {/* {!uploadedFileData && (
                    <p className="text-xs text-amber-600 mt-1">File selected but not uploaded yet</p>
                  )} */}
                  {uploadedFileData && <p className="text-xs text-green-600 mt-1">File uploaded successfully</p>}
                </div>

                <div className="flex items-center space-x-2">
                  {!uploadedFileData ? (
                    <>
                      <Button
                        type="button"
                        title="Change"
                        variant="outlined-blue"
                        onClick={handleChangeFile}
                        className="px-3 py-1 text-sm"
                      />
                      <Button
                        type="button"
                        title={uploading ? 'Uploading...' : 'Upload'}
                        variant="red"
                        onClick={handleFileUpload}
                        disabled={uploading || !fileName.trim()}
                        className="px-3 py-1 text-sm"
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        title="Change File"
                        variant="outlined-blue"
                        onClick={handleChangeFile}
                        className="px-3 py-1 text-sm"
                      />
                      <Button
                        type="button"
                        title="Remove"
                        variant="outlined-red"
                        onClick={handleRemoveFile}
                        className="px-3 py-1 text-sm"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Upload progress */}
              {uploading && (
                <div className="mt-3 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs text-blue-600">Uploading...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-[16px] mt-[24px]">
        <div className="flex-1">
          <Button
            loading={isPending}
            disabled={!isFormValid || isPending}
            type="submit"
            title={'Submit'}
            variant="red"
            className="w-full py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Validation hint */}
      {/* {!uploadedFileData && (
        <p className="text-sm text-amber-600 mt-2 text-center">* File must be uploaded before submitting the form</p>
      )} */}
    </form>
  );
};

export default BookAQuote;

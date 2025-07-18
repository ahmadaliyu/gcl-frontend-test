'use client';

import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Spinner from '@/components/reuseables/Spinner';
import { useGetAddresses } from '@/services';
import { useDeleteAddress, useSetDefaultAddress } from '@/services/hooks/user';
import { useAppDispatch } from '@/store/hook';
import { saveAddress } from '@/store/user/addressSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AddressSkeleton from './skeleton';
import { useAlert } from '@/components/reuseables/Alert/alert-context';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

enum TabIds {
  ContactAddresses = 'contact-addresses',
  MyAddresses = 'my-addresses',
}

const tabs = [
  { id: TabIds.ContactAddresses, title: 'Contact Addresses' },
  { id: TabIds.MyAddresses, title: 'My Addresses' },
];

function MySavedAddresses() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.ContactAddresses);
  const [step, setstep] = useState<'show' | 'edit'>('show');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<any>(null);
  const [activeDefaultId, setActiveDefaultId] = useState<string | null>(null);

  const { showAlert } = useAlert();
  const { mutate, isPending } = useDeleteAddress((response) => {
    if (response.status === 200) {
      showAlert('Address Deleted', 'success');
      refetch();
      setShowDeleteModal(false);
      setAddressToDelete(null);
    } else {
      showAlert(`${response?.response?.data?.message}`, 'error');
      setShowDeleteModal(false);
    }
  });

  const { data: addresses, isLoading, refetch } = useGetAddresses();
  const { mutate: setDefault } = useSetDefaultAddress((response) => {
    if (response?.status === 200) {
      showAlert('Address set as default', 'success');
      refetch();
    }
    setActiveDefaultId(null);
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteClick = (address: any) => {
    setAddressToDelete(address);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (id: string) => {
    mutate(id);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAddressToDelete(null);
  };

  const handleEditClick = (data: any) => {
    router.push('/user/edit-address');
    dispatch(
      saveAddress({
        ...data,
        drivers_note: data.drivers_note ?? '',
        address_type: data?.address_type,
      })
    );
  };

  const handleMakeDefault = async (id: string) => {
    setActiveDefaultId(id);
    setDefault({ id });
  };

  return (
    <UserDashboardWrapper>
      {step === 'edit' ? null : (
        <div className="px-4">
          <h1 className="text-[#272727] font-semibold text-2xl mb-8">My Saved Addresses</h1>

          <div>
            {activeTab === TabIds.ContactAddresses && (
              <>
                {isLoading ? (
                  <AddressSkeleton />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AddNew />

                    {addresses?.data.map((address: any, index: number) => {
                      const isDefault = address.is_default;
                      const isSettingThisOne = activeDefaultId === address.id;

                      return (
                        <div
                          key={index}
                          className={`relative w-full h-fit rounded-xl p-4 border flex flex-col justify-between ${
                            isDefault ? 'border-green-500 bg-[#F5F5F5]' : 'border-[#E0E0E0] bg-[#F5F5F5]'
                          }`}
                        >
                          {isSettingThisOne && (
                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-xl">
                              <Spinner />
                            </div>
                          )}

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-[#333]">{address.label}</h3>

                              {isDefault && (
                                <span className="text-xs text-green-600 border border-green-500 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}

                              <span
                                className={`text-xs ${
                                  address.is_sender_address
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                } px-2 py-0.5 rounded-full`}
                              >
                                {address.is_sender_address ? 'Sender Address' : 'Receiver Address'}
                              </span>
                            </div>

                            {!isDefault && (
                              <button
                                onClick={() => handleMakeDefault(address.id)}
                                className="mt-2 text-xs border border-[#E51520] text-[#E51520] px-3 py-1 rounded-full hover:bg-[#FCE8E9] transition"
                              >
                                Make Default
                              </button>
                            )}

                            <p className="text-sm text-[#666]">{address.state}</p>
                            <p className="text-sm text-[#666]">{address.city}</p>
                            <p className="text-sm text-[#666]">{address.post_code}</p>
                            <p className="text-sm text-[#666]">{address.country}</p>
                            <p className="text-sm text-[#666] mt-2">{address.contact_phone}</p>
                          </div>

                          <div className="flex justify-between items-end mt-4">
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleEditClick(address)}
                                className="text-gray-600 hover:text-black transition"
                                title="Edit Address"
                              >
                                <FiEdit2 className="text-xl" />
                              </button>

                              <button
                                onClick={() => handleDeleteClick(address)}
                                className="text-red-500 hover:text-red-700 transition"
                                title="Delete Address"
                              >
                                <FiTrash2 className="text-xl" />
                              </button>
                            </div>
                            <p className="text-xs text-[#666] text-right">Last Used: {address.createdAt}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                <p className="mb-6">Are you sure you want to delete the address for {addressToDelete?.contact_name}?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelDelete}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(addressToDelete.id)}
                    className="px-4 py-2 bg-[#E51520] text-white rounded-md hover:bg-[#C0111A]"
                  >
                    {isPending ? <Spinner /> : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </UserDashboardWrapper>
  );
}

const AddNew = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/user/add-address')}
      className="bg-[#FCE8E9] w-full rounded-xl p-6 border border-[#E0E0E0] flex flex-col items-center justify-center min-h-[180px] text-center hover:bg-[#fbd1d3] transition"
    >
      <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4v40M4 24h40" stroke="#E51520" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-[#E51520] font-bold text-base mt-2">Add New Address</p>
      <p className="text-[#E51520] text-sm">Click here to add a new contact address</p>
    </button>
  );
};

export default MySavedAddresses;

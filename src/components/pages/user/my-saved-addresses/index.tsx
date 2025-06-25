'use client';

import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import Spinner from '@/components/reuseables/Spinner';
import { useGetAddresses } from '@/services';
import { useDeleteAddress } from '@/services/hooks/user';
import { useAppDispatch } from '@/store/hook';
import { saveAddress } from '@/store/user/addressSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AddressSkeleton from './skeleton';

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

  interface Address {
    id?: string;
    label: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    contact_email: string;
    post_code: string;
    contact_name: string;
    contact_phone: string;
    notes?: string;
    is_default: boolean;
    is_sender_address: boolean;
  }

  const { mutate, isPending } = useDeleteAddress((response) => {
    if (response) {
      setShowDeleteModal(false);
      setAddressToDelete(null);
    }
  });

  const router = useRouter();
  const { data: addresses, isLoading } = useGetAddresses();
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

  const handleEditClick = (data: Address) => {
    router.push('/user/edit-address');
    dispatch(saveAddress({ ...data, notes: data.notes ?? '' }));
  };

  return (
    <UserDashboardWrapper>
      {step === 'edit' ? null : (
        <div className="px-4">
          <h1 className="text-[#272727] font-semibold text-2xl mb-8">My Saved Addresses</h1>

          <div className="flex flex-col sm:flex-row gap-2 mb-6 border-b border-[#E3E3E3]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 text-sm sm:text-base text-left sm:text-center ${
                  activeTab === tab.id
                    ? 'bg-[#FCE8E9] border-b-4 sm:border-b-4 border-[#E51520] font-semibold'
                    : 'bg-transparent border-b-4 border-transparent text-[#666]'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div>
            {activeTab === TabIds.ContactAddresses && (
              <>
                {isLoading ? (
                  <AddressSkeleton />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AddNew />

                    {addresses?.data.map((address, index) => (
                      <div
                        key={index}
                        className="bg-[#F5F5F5] w-full h-fit rounded-xl p-4 border border-[#E0E0E0] flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-[#333]">{address.label}</h3>
                          <p className="text-sm text-[#666]">{address.state}</p>
                          <p className="text-sm text-[#666]">{address.city}</p>
                          <p className="text-sm text-[#666]">{address.post_code}</p>
                          <p className="text-sm text-[#666]">{address.country}</p>
                          <p className="text-sm text-[#666] mt-2">{address.contact_phone}</p>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => handleEditClick(address)}
                              className="flex items-center gap-1 px-3 py-1 text-xxs sm:text-sm bg-black text-white rounded-full hover:bg-[#444] transition"
                            >
                              ✎ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(address)}
                              className="flex items-center gap-1 px-3 py-1 text-xxs sm:text-sm bg-[#E51520] text-white rounded-full hover:bg-[#c0101a] transition"
                            >
                              🗑 Delete
                            </button>
                          </div>
                          <p className="text-xs text-[#666] text-right">Last Used: {address.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {activeTab === TabIds.MyAddresses && <div>{/* Placeholder for MyAddresses */}</div>}
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

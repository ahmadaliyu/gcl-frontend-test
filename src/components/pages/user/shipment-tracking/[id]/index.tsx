'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useGetNote, useTrackBooking } from '@/services';
import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const statusColors: Record<string, string> = {
  'Order Placed': 'bg-gray-200 text-gray-800',
  transit: 'bg-yellow-100 text-yellow-800',
  'On Hold': 'bg-red-100 text-red-700',
  'Arrived at UK Office': 'bg-blue-100 text-blue-800',
  'Clearance in Progress': 'bg-purple-100 text-purple-800',
  Cancelled: 'bg-red-600 text-red-200',
  Delivered: 'bg-green-400 text-green-200',
};

const ShipmentTracking = () => {
  const params = useParams();
  const bookingIdParam = params?.id;
  const bookingId = Array.isArray(bookingIdParam) ? bookingIdParam[0] : bookingIdParam;

  const router = useRouter();

  const { data: trackingData, isLoading } = useTrackBooking(bookingId);
  const { data: notes } = useGetNote(bookingId);

  const [showAllNotes, setShowAllNotes] = useState(false);

  const TRACKERS = useMemo(() => {
    return trackingData?.resp || [];
  }, [trackingData]);

  const displayedNotes = useMemo(() => {
    return showAllNotes ? notes?.resp : notes?.resp?.slice(0, 3);
  }, [showAllNotes, notes]);

  if (isLoading) {
    return (
      <UserDashboardWrapper>
        <div className="max-w-3xl mx-auto px-4 py-10">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-black" />
          </button>
          <h2 className="text-2xl font-semibold mb-8 text-left text-gray-800">Shipment Tracking</h2>
          <div className="relative">
            <div className="absolute left-[18px] top-0 w-0.5 h-full bg-gray-300" />
            <div className="space-y-8 ml-10">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-[-30px] top-1/2 w-5 h-5 rounded-full bg-gray-200 border-4 border-white shadow-md transform -translate-y-1/2" />
                  <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-md space-y-2">
                    <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </UserDashboardWrapper>
    );
  }

  if (!TRACKERS || TRACKERS.length === 0) {
    return (
      <UserDashboardWrapper>
        <div className="max-w-3xl mx-auto px-4 py-10">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-black" />
          </button>
          <h2 className="text-2xl font-semibold mb-8 text-left text-gray-800">Shipment Tracking</h2>
          <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500">No tracking information available for this shipment.</p>
            <p className="text-sm text-gray-400 mt-2">Please check back later for updates.</p>
          </div>
        </div>
      </UserDashboardWrapper>
    );
  }

  return (
    <UserDashboardWrapper>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-black" />
        </button>
        <h2 className="text-2xl font-semibold mb-8 text-left text-gray-800">Shipment Tracking</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Tracking timeline (left side - spans 2/3) */}
          <div className="md:col-span-2 relative">
            <div className="absolute left-[18px] top-0 w-0.5 h-full bg-gray-300" />
            <div className="space-y-8 ml-10">
              {TRACKERS.map((item, index) => {
                const colorClass = statusColors[item.status] || 'bg-gray-100 text-gray-700';
                return (
                  <div key={index} className="relative">
                    <div
                      className={`absolute left-[-30px] top-1/2 w-5 h-5 rounded-full border-4 border-white shadow-md transform -translate-y-1/2 ${
                        statusColors[item.status]?.split(' ')[0] || 'bg-gray-300'
                      }`}
                    />
                    <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-md">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
                      </div>
                      <p className="text-gray-700 mt-2">{item.comment}</p>
                      <p className="text-sm text-gray-500 mt-1">{dayjs(item.createdAt).format('MMM D, YYYY h:mm A')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes (right side) */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Notes</h3>
            {Array.isArray(displayedNotes) && displayedNotes.length > 0 ? (
              <div className="space-y-4">
                {displayedNotes.map((note) => (
                  <div key={note.id} className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
                    <p className="text-gray-700">{note.note}</p>
                    <p className="text-sm text-gray-500 mt-1">{dayjs(note.createdAt).format('MMM D, YYYY h:mm A')}</p>
                  </div>
                ))}
                {Array.isArray(notes?.resp) && notes.resp.length > 3 && !showAllNotes && (
                  <div className="mt-4 text-center">
                    <button onClick={() => setShowAllNotes(true)} className="text-blue-600 hover:underline font-medium">
                      See more
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm text-gray-500">
                No notes available for this booking.
              </div>
            )}
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
};

export default ShipmentTracking;

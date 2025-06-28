import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dayjs from 'dayjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetBooking } from '@/services';
import { useRouter } from 'next/navigation';
import LoadingSkeleton from './my-booking-skeleton';

enum TabIds {
  SentPackages = 'sent-packages',
  RecievedPackages = 'recieved-packages',
}

enum StatusFilter {
  All = 'all',
  Paid = 'Paid',
  InTransit = 'Transit',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

const tabs = [
  { id: TabIds.RecievedPackages, title: 'Received Packages' },
  { id: TabIds.SentPackages, title: 'Sent Packages' },
];

const statusOptions = [
  { id: StatusFilter.All, label: 'All Statuses' },
  { id: StatusFilter.Paid, label: 'Paid' },
  { id: StatusFilter.InTransit, label: 'In Transit' },
  { id: StatusFilter.Delivered, label: 'Delivered' },
  { id: StatusFilter.Cancelled, label: 'Cancelled' },
];

function MyBookings() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.RecievedPackages);
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>(StatusFilter.All);
  const [selectedDateFilter, setSelectedDateFilter] = useState<'all' | 'today' | 'last7days' | 'thisMonth'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetBooking();
  const router = useRouter();

  const filteredBookings = useMemo(() => {
    const bookings = data?.data || [];
    if (!Array.isArray(bookings)) return [];

    return bookings.filter((booking) => {
      const bookingDate = dayjs(booking.createdAt);
      const statusMatch =
        selectedStatus === StatusFilter.All || booking.status?.toLowerCase() === selectedStatus.toLowerCase();

      const searchMatch =
        booking.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.status?.toLowerCase().includes(searchTerm.toLowerCase());

      let dateMatch = true;
      if (selectedDateFilter === 'today') {
        dateMatch = bookingDate.isSame(dayjs(), 'day');
      } else if (selectedDateFilter === 'last7days') {
        dateMatch = bookingDate.isAfter(dayjs().subtract(7, 'day'));
      } else if (selectedDateFilter === 'thisMonth') {
        dateMatch = bookingDate.isSame(dayjs(), 'month');
      }

      return statusMatch && dateMatch && searchMatch;
    });
  }, [data, selectedStatus, selectedDateFilter, searchTerm]);

  const handleBookNew = () => router.push('/user/book-a-quote');
  const handleTrack = (id: string) => router.push(`/user/shipment-tracking/${id}`);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <UserDashboardWrapper>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-8 gap-4 w-full">
        <h1 className="text-[#272727] font-semibold text-lg md:text-2xl">My Bookings</h1>
        <button
          onClick={handleBookNew}
          className="bg-[#2E7D32] text-white px-4 py-2 rounded-md font-medium hover:bg-[#256b2b] transition w-full sm:w-auto text-sm md:text-base"
        >
          Book New
        </button>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 px-3 text-sm w-full sm:w-auto"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 items-center justify-center px-3 w-full sm:w-auto text-sm">
              {selectedDateFilter === 'all'
                ? 'Filter by Date'
                : `Date: ${
                    selectedDateFilter === 'today'
                      ? 'Today'
                      : selectedDateFilter === 'last7days'
                      ? 'Last 7 Days'
                      : 'This Month'
                  }`}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 rounded-lg p-2">
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {['all', 'today', 'last7days', 'thisMonth'].map((key) => (
                <DropdownMenuItem key={key} onClick={() => setSelectedDateFilter(key as any)} className="text-sm">
                  <span className="capitalize">{key === 'all' ? 'All' : key.replace('last7days', 'Last 7 Days')}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 items-center justify-center px-3 w-full sm:w-auto text-sm">
              {selectedStatus === StatusFilter.All
                ? 'Filter by Status'
                : `Status: ${statusOptions.find((o) => o.id === selectedStatus)?.label}`}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 rounded-lg p-2">
            <DropdownMenuLabel className="text-sm">Select status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => setSelectedStatus(option.id as StatusFilter)}
                  className={`text-sm ${selectedStatus === option.id ? 'bg-gray-100' : ''}`}
                >
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        {/* Mobile Cards View */}
        {/* Mobile Cards View */}
        <div className="sm:hidden space-y-3">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">Recipient</p>
                    <p className="text-gray-600">{service.code || 'Recipient'}</p>
                  </div>
                  <div
                    className={`border h-8 flex items-center justify-center border-[#E3E3E3] font-medium px-2 rounded-full text-xs
            ${
              service.status === 'In Transit'
                ? 'bg-[#FFF6C5] border-[#BB5802] text-[#BB5802]'
                : service.status === 'Delivered'
                ? 'bg-[#EAF0F6] border-[#02044A] text-[#02044A]'
                : service.status === 'Cancelled'
                ? 'bg-[#FCE8E9] border-[#E51520] text-[#E51520]'
                : 'bg-[#E6F4EA] border-[#2E7D32] text-[#2E7D32]'
            }`}
                  >
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1).toLowerCase()}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="font-medium text-sm">Total Paid</p>
                    <p className="text-gray-600">{`£${service.amount}`}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Created</p>
                    <p className="text-gray-600">{new Date(service.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {/* Add Track button here */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleTrack(service.code)}
                    className="bg-[#2E7D32] hover:bg-[#256b2b] text-white text-sm px-4 py-2 rounded-md transition"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No bookings found</div>
          )}
        </div>

        {/* Desktop Table View */}
        <Table className="hidden sm:table min-w-full mt-4 mb-12">
          <TableHeader>
            <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
              <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Recipient</TableHead>
              <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Status</TableHead>
              <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Total Paid</TableHead>
              <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Created</TableHead>
              <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium py-4 px-2">{service.code || 'Recipient'}</TableCell>
                  <TableCell>
                    <div
                      className={`border h-10 flex items-center justify-center border-[#E3E3E3] font-medium w-24 px-2 rounded-full text-sm
            ${
              service.status.toLowerCase() === 'transit'
                ? 'bg-[#FFF6C5] border-[#BB5802] text-[#BB5802]'
                : service.status.toLowerCase() === 'delivered'
                ? 'bg-[#EAF0F6] border-[#02044A] text-[#02044A]'
                : service.status.toLowerCase() === 'cancelled'
                ? 'bg-[#FCE8E9] border-[#E51520] text-[#E51520]'
                : service.status.toLowerCase() === 'paid'
                ? 'bg-[#E6F4EA] border-[#2E7D32] text-[#2E7D32]'
                : 'bg-[#E6F4EA] border-[#2E7D32] text-[#2E7D32]'
            }`}
                    >
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1).toLowerCase()}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium py-4 px-2">{`£${service.amount}`}</TableCell>
                  <TableCell className="font-medium py-4 px-2">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4 px-2">
                    <button
                      onClick={() => handleTrack(service.code)}
                      className="bg-[#2E7D32] hover:bg-[#256b2b] text-white text-sm px-3 py-1 rounded-md transition"
                    >
                      Track
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </UserDashboardWrapper>
  );
}

export default MyBookings;

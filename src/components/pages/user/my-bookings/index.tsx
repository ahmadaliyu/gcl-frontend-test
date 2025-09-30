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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

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
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        booking.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.Service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.Service?.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destination_country_iso?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.origin_country_iso?.toLowerCase().includes(searchTerm.toLowerCase());

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

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const statusColors: Record<string, string> = {
    'Order Placed': 'bg-gray-200 text-gray-800',
    transit: 'bg-yellow-100 text-yellow-800',
    'On Hold': 'bg-red-100 text-red-700',
    'Arrived at UK Office': 'bg-blue-100 text-blue-800',
    'Clearance in Progress': 'bg-purple-100 text-purple-800',
    Cancelled: 'bg-red-600 text-red-200',
    Delivered: 'bg-green-400 text-green-200',
    paid: 'bg-green-100 text-green-800',
  };

  const formatAdditionalServices = (services?: { name: string; amount: string }[]) => {
    if (!services || services.length === 0) return 'No additional services';
    return services.map((s) => `${s.name.replace(/_/g, ' ')}: £${s.amount}`).join('\n');
  };

  const formatServiceType = (serviceType: string) => {
    return serviceType
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const shortenServiceName = (name: string, maxLength: number = 30) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  const shortenCountryName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  const formatLegDetails = (leg: any) => {
    return {
      from: leg.from?.replace(/_/g, ' ').toUpperCase() || 'Unknown',
      to: leg.to?.replace(/_/g, ' ').toUpperCase() || 'Unknown',
      courier: leg.courier || 'Not specified',
      price: `£${leg.price || '0'}`,
      amount: `£${leg.amount || '0'}`,
      handlingFee: `£${leg.handlingFee || '0'}`,
    };
  };

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
          placeholder="Search by order ID, status, service, destination, or country"
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

      {/* Booking Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Booking Details</DialogTitle>
            <DialogDescription>Complete information for order {selectedBooking?.code}</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-700">Order ID</h3>
                  <p className="text-lg font-mono">{selectedBooking.code}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Status</h3>
                  <Badge className={statusColors[selectedBooking.status]}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1).toLowerCase()}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Total Amount</h3>
                  <p className="text-lg font-bold text-green-600">£{selectedBooking.amount}</p>
                </div>
              </div>

              {/* Service Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Service Information</h3>
                  {selectedBooking.Service && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {selectedBooking.Service.image_url && (
                          <img
                            src={selectedBooking.Service.image_url}
                            alt={selectedBooking.Service.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-medium">{selectedBooking.Service.name}</p>
                          <p className="text-sm text-gray-600 capitalize">
                            {formatServiceType(selectedBooking.Service.service_type)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Dates</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{new Date(selectedBooking.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span>{new Date(selectedBooking.updatedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Origin</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedBooking.origin}</p>
                    {selectedBooking.origin_country_iso && (
                      <p className="text-sm text-gray-600">Country: {selectedBooking.origin_country_iso}</p>
                    )}
                    {selectedBooking.origin_postcode && (
                      <p className="text-sm text-gray-600">Postcode: {selectedBooking.origin_postcode}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Destination</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedBooking.destination}</p>
                    {selectedBooking.destination_country_iso && (
                      <p className="text-sm text-gray-600">Country: {selectedBooking.destination_country_iso}</p>
                    )}
                    {selectedBooking.destination_postcode && (
                      <p className="text-sm text-gray-600">Postcode: {selectedBooking.destination_postcode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Information */}
              {selectedBooking.product_data && selectedBooking.product_data.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Product Information</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-2 text-left">Product Name</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Code</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Type</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Quantity</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Weight</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBooking.product_data.map((product: any, index: number) => (
                          <tr key={index}>
                            <td className="border border-gray-200 px-4 py-2">{product.product_book}</td>
                            <td className="border border-gray-200 px-4 py-2">{product.product_code}</td>
                            <td className="border border-gray-200 px-4 py-2">{product.product_type}</td>
                            <td className="border border-gray-200 px-4 py-2">{product.product_qty}</td>
                            <td className="border border-gray-200 px-4 py-2">{product.product_weight} kg</td>
                            <td className="border border-gray-200 px-4 py-2">£{product.product_value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {selectedBooking.product_data[0]?.product_details && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">Product Details:</h4>
                      <p className="text-sm">{selectedBooking.product_data[0].product_details}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Services */}
              {selectedBooking.AdditionalBookingServices && selectedBooking.AdditionalBookingServices.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Additional Services</h3>
                  <div className="space-y-2">
                    {selectedBooking.AdditionalBookingServices.map((service: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="capitalize">{service.name.replace(/_/g, ' ')}</span>
                        <span className="font-semibold">£{service.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leg Details */}
              {selectedBooking.leg_details && selectedBooking.leg_details.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Shipping Legs</h3>
                  <div className="space-y-4">
                    {selectedBooking.leg_details.map((leg: any, index: number) => {
                      const formattedLeg = formatLegDetails(leg);
                      return (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">Leg {index + 1}</h4>
                            <Badge variant="outline">{formattedLeg.courier}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">From:</span> {formattedLeg.from}
                            </div>
                            <div>
                              <span className="font-medium">To:</span> {formattedLeg.to}
                            </div>
                            <div>
                              <span className="font-medium">Price:</span> {formattedLeg.price}
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span> {formattedLeg.amount}
                            </div>
                            <div>
                              <span className="font-medium">Handling Fee:</span> {formattedLeg.handlingFee}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Comments */}
              {selectedBooking.comment && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Comments</h3>
                  <p className="p-3 bg-yellow-50 rounded-lg">{selectedBooking.comment}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile View */}
      <div className="sm:hidden space-y-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4">
              {/* Service Info Section */}
              {booking.Service && (
                <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                  {booking.Service.image_url && (
                    <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={booking.Service.image_url}
                        alt={booking.Service.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="font-medium text-sm line-clamp-1 cursor-help">
                            {shortenServiceName(booking.Service.name, 25)}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{booking.Service.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-xs text-gray-500 capitalize">
                      {formatServiceType(booking.Service.service_type)}
                    </p>
                  </div>
                </div>
              )}

              {/* Destination & Origin Section */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="font-medium text-sm text-gray-600">From</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm cursor-help">{shortenCountryName(booking.origin || 'Unknown', 15)}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{booking.origin || 'Unknown origin'}</p>
                        {booking.origin_country_iso && (
                          <p className="text-xs text-gray-500">({booking.origin_country_iso})</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-600">To</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm cursor-help">
                          {shortenCountryName(booking.destination || 'Unknown', 15)}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{booking.destination || 'Unknown destination'}</p>
                        {booking.destination_country_iso && (
                          <p className="text-xs text-gray-500">({booking.destination_country_iso})</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-sm">Order ID</p>
                  <p className="text-gray-600">{booking.code || 'Order ID'}</p>
                </div>
                <div
                  className={`border h-7 flex items-center justify-center border-[#E3E3E3] font-medium px-2 rounded-full text-xs
              ${statusColors[booking.status]?.split(' ')[0] || 'bg-gray-300'}`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}
                </div>
              </div>

              {/* Additional Services Inline Display */}
              {booking.AdditionalBookingServices && booking.AdditionalBookingServices.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-sm mb-1">Additional services</p>
                  <ul className="text-gray-600 text-sm list-disc list-inside">
                    {booking.AdditionalBookingServices.map((s, idx) => (
                      <li key={idx}>
                        {s.name.replace(/_/g, ' ')}: £{s.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="font-medium text-sm">Total Paid</p>
                  <p className="text-gray-600">{`£${booking.amount}`}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Created</p>
                  <p className="text-gray-600">{new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <button
                  onClick={() => handleViewDetails(booking)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleTrack(booking.id)}
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

      {/* Desktop View */}
      <Table className="hidden sm:table min-w-full mt-4 mb-12">
        <TableHeader>
          <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Service</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Type</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Origin</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Destination</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Order ID</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Status</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Total Paid</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Created</TableHead>
            <TableHead className="text-[#272727] font-medium text-sm py-3 px-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                {/* Service Name Column with Tooltip */}
                <TableCell className="py-4 px-2">
                  {booking.Service ? (
                    <div className="flex items-center gap-3">
                      {booking.Service.image_url && (
                        <div className="w-10 h-10 relative rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={booking.Service.image_url}
                            alt={booking.Service.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="min-w-0 cursor-help">
                              <p className="font-medium text-sm line-clamp-1">
                                {shortenServiceName(booking.Service.name)}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[300px]">
                            <p className="font-medium">{booking.Service.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <span className="text-gray-400">No service info</span>
                  )}
                </TableCell>

                {/* Service Type Column */}
                <TableCell className="py-4 px-2">
                  {booking.Service ? (
                    <span className="text-sm text-gray-600 capitalize">
                      {formatServiceType(booking.Service.service_type)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>

                {/* Origin Column */}
                <TableCell className="py-4 px-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <p className="text-sm font-medium">{shortenCountryName(booking.origin || 'Unknown')}</p>
                          {booking.origin_country_iso && (
                            <p className="text-xs text-gray-500">({booking.origin_country_iso})</p>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{booking.origin || 'Unknown origin'}</p>
                        {booking.origin_country_iso && (
                          <p className="text-sm">Country Code: {booking.origin_country_iso}</p>
                        )}
                        {booking.origin_postcode && <p className="text-sm">Postcode: {booking.origin_postcode}</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                {/* Destination Column */}
                <TableCell className="py-4 px-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <p className="text-sm font-medium">{shortenCountryName(booking.destination || 'Unknown')}</p>
                          {booking.destination_country_iso && (
                            <p className="text-xs text-gray-500">({booking.destination_country_iso})</p>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{booking.destination || 'Unknown destination'}</p>
                        {booking.destination_country_iso && (
                          <p className="text-sm">Country Code: {booking.destination_country_iso}</p>
                        )}
                        {booking.destination_postcode && (
                          <p className="text-sm">Postcode: {booking.destination_postcode}</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                {/* Order ID Column with Tooltip */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TableCell className="font-medium py-4 px-2 cursor-help">{booking.code || 'Order ID'}</TableCell>
                    </TooltipTrigger>
                    <TooltipContent className="whitespace-pre-line max-w-[250px]">
                      {formatAdditionalServices(booking.AdditionalBookingServices)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Status Column */}
                <TableCell>
                  <div
                    className={
                      `border h-7 flex items-center justify-center border-[#E3E3E3] font-medium px-0 rounded-full text-xs
                        ${statusColors[booking.status]?.split(' ')[0]}` || 'bg-gray-300'
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}
                  </div>
                </TableCell>

                {/* Total Paid Column */}
                <TableCell className="font-medium py-4 px-2">{`£${booking.amount}`}</TableCell>

                {/* Created Date Column */}
                <TableCell className="font-medium py-4 px-2">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions Column */}
                <TableCell className="py-4 px-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleTrack(booking.id)}
                      className="bg-[#2E7D32] hover:bg-[#256b2b] text-white text-sm px-3 py-1 rounded-md transition"
                    >
                      Track
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </UserDashboardWrapper>
  );
}

export default MyBookings;

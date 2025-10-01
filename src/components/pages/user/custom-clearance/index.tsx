import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import { useGetCustomClearance } from '@/services/hooks/user';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CustomClearance() {
  const { data, isPending } = useGetCustomClearance();
  const router = useRouter();
  const [selectedClearance, setSelectedClearance] = useState<any | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'processing':
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Function to get file name from path
  const getFileNameFromPath = (filePath: string) => {
    return filePath.split('/').pop() || 'file';
  };

  // Function to determine file type and icon
  const getFileInfo = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return { type: 'image', icon: '🖼️' };
    } else if (['pdf'].includes(extension || '')) {
      return { type: 'pdf', icon: '📄' };
    } else if (['doc', 'docx'].includes(extension || '')) {
      return { type: 'document', icon: '📝' };
    } else {
      return { type: 'file', icon: '📎' };
    }
  };

  if (isPending) {
    return <ClearanceSkeleton />;
  }

  const clearances = data?.data || [];

  const handleNewClearance = () => {
    router.push('/user/book-a-quote?isCustomClearance=true');
  };

  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Custom Clearance Requests</h1>
                <p className="mt-1 text-sm text-gray-500">Manage and track all your custom clearance applications</p>
              </div>
              <button
                onClick={handleNewClearance}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                New Clearance
              </button>
            </div>

            {clearances.length === 0 ? (
              <div className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900">No clearance requests found</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't submitted any custom clearance requests yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item(s)
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clearances.map((clearance) => (
                        <tr key={clearance.id} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                                {clearance.first_name[0]}
                                {clearance.last_name[0]}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {clearance.first_name} {clearance.last_name}
                                </div>
                                <div className="text-sm text-gray-500">{clearance.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {clearance.type}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{clearance.no_of_items}</div>
                            {/* <div className="text-sm text-gray-500">items</div> */}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                clearance.status
                              )}`}
                            >
                              {clearance.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(clearance.created_at)}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedClearance(clearance)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden">
                  <div className="divide-y divide-gray-200">
                    {clearances.map((clearance) => (
                      <div key={clearance.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                              {clearance.first_name[0]}
                              {clearance.last_name[0]}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {clearance.first_name} {clearance.last_name}
                              </div>
                              <div className="text-sm text-gray-500">{clearance.email}</div>
                            </div>
                          </div>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              clearance.status
                            )}`}
                          >
                            {clearance.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-500">Type:</span>
                            <span className="ml-2 text-gray-900">{clearance.type}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Items:</span>
                            <span className="ml-2 text-gray-900">{clearance.no_of_items}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium text-gray-500">Created:</span>
                            <span className="ml-2 text-gray-900">{formatDate(clearance.created_at)}</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setSelectedClearance(clearance)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedClearance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Clearance Request Details</h2>
              <button
                onClick={() => setSelectedClearance(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold"
              >
                ×
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Information */}
                <div className="space-y-6">
                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">👤</span>
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-500">Full Name:</span>
                        <p className="text-gray-900">
                          {selectedClearance.first_name} {selectedClearance.last_name}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Email:</span>
                        <p className="text-gray-900 break-all">{selectedClearance.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Phone:</span>
                        <p className="text-gray-900">{selectedClearance.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Address:</span>
                        <p className="text-gray-900">{selectedClearance.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Clearance Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📋</span>
                      Clearance Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-500">Type:</span>
                        <p className="text-gray-900 capitalize">{selectedClearance.type}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Items:</span>
                        <p className="text-gray-900">{selectedClearance.no_of_items}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Status:</span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            selectedClearance.status
                          )}`}
                        >
                          {selectedClearance.status}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Description:</span>
                        <p className="text-gray-900">{selectedClearance.description || 'No description provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🕒</span>
                      Timeline
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Created:</span>
                        <span className="text-gray-900">{formatDate(selectedClearance.created_at)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Last Updated:</span>
                        <span className="text-gray-900">{formatDate(selectedClearance.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Files */}
                <div className="space-y-6">
                  {/* Uploaded Files */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📎</span>
                      Uploaded Documents
                    </h3>

                    {/* Meta Files */}
                    {selectedClearance.meta?.files && selectedClearance.meta.files.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Additional Files:</h4>
                        <div className="space-y-2">
                          {selectedClearance.meta.files.map((file: any, index: number) => {
                            const fileName = getFileNameFromPath(file.filePath);
                            const fileInfo = getFileInfo(fileName);
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                              >
                                <div className="flex items-center">
                                  <span className="text-lg mr-3">{fileInfo.icon}</span>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                      {file.name || fileName}
                                    </p>
                                    <p className="text-xs text-gray-500">{fileInfo.type.toUpperCase()}</p>
                                  </div>
                                </div>
                                {/* <button
                                  onClick={() => window.open(file.filePath, '_blank')}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  View
                                </button> */}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Waybill Document */}
                    {selectedClearance.waybil_doc && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Waybill Document:</h4>
                        <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                          <div className="flex items-center">
                            <span className="text-lg mr-3">📦</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {getFileNameFromPath(selectedClearance.waybil_doc)}
                              </p>
                              <p className="text-xs text-gray-500">Waybill</p>
                            </div>
                          </div>
                          {/* <button
                            onClick={() => window.open(selectedClearance.waybil_doc, '_blank')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </button> */}
                        </div>
                      </div>
                    )}

                    {/* No Files Message */}
                    {(!selectedClearance.meta?.files || selectedClearance.meta.files.length === 0) &&
                      !selectedClearance.waybil_doc && (
                        <div className="text-center py-4 text-gray-500">
                          <p>No files uploaded</p>
                        </div>
                      )}
                  </div>

                  {/* Status Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">ℹ️</span>
                      Request Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Request ID:</span>
                        <span className="text-gray-900 font-mono text-xs">{selectedClearance.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">User ID:</span>
                        <span className="text-gray-900 font-mono text-xs">{selectedClearance.user_id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedClearance(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
              {/* <button
                onClick={() => {
                  // Add any action for editing or processing
                  console.log('Process clearance:', selectedClearance.id);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Process Request
              </button> */}
            </div>
          </div>
        </div>
      )}
    </UserDashboardWrapper>
  );
}

// Skeleton component remains the same...
function ClearanceSkeleton() {
  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 sm:w-64 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 sm:w-48 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full sm:w-32 animate-pulse"></div>
            </div>

            {/* Desktop Skeleton */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[...Array(6)].map((_, i) => (
                      <th key={i} className="px-4 sm:px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <td key={cellIndex} className="px-4 sm:px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Skeleton */}
            <div className="md:hidden divide-y divide-gray-200">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="ml-3">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="col-span-2 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

export default CustomClearance;

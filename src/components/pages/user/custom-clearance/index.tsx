import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import { useGetCustomClearance } from '@/services/hooks/user';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CustomClearance() {
  const { data, isPending } = useGetCustomClearance();

  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'processing':
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
                {/* <div className="mt-6">
                  <Link
                    href="/user/book-a-quote"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Request Your First Clearance
                  </Link>
                </div> */}
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
                          Items
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
                              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                                  {clearance.first_name[0]}
                                  {clearance.last_name[0]}
                                </div>
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
                            <div className="text-sm text-gray-500">items</div>
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
                            <button className="text-indigo-600 hover:text-indigo-900">View</button>
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
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {clearance.first_name[0]}
                                {clearance.last_name[0]}
                              </div>
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
                          <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View</button>
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
    </UserDashboardWrapper>
  );
}

// Responsive Skeleton Loading Component
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

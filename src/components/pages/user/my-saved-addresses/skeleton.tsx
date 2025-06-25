import React from 'react';

const AddressSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-[#F5F5F5] w-full rounded-xl p-4 border border-[#E0E0E0] animate-pulse flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="h-4 w-2/3 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
            <div className="h-3 w-1/3 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
            <div className="h-3 w-1/4 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded mt-2" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-gray-300 rounded-full" />
              <div className="h-8 w-16 bg-gray-300 rounded-full" />
            </div>
            <div className="h-3 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressSkeleton;

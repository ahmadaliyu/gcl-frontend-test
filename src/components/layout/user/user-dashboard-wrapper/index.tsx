'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

function UserDashboardWrapper({
  children,
  menuType,
}: {
  children?: React.ReactNode;
  menuType?: 'account-settings-menu' | 'my-account-menu';
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="max-screen-wrapper">
        <div className="max-screen-inner">
          <div className="flex w-full min-h-[100vh]">
            <div className="">
              <div className="sticky top-[0px]"></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-screen-wrapper">
      <div className="max-screen-inner">
        {/* Mobile header */}
        <div className="md:hidden flex justify-between items-center p-4 border-b">
          <button onClick={() => setSidebarOpen(true)}>
            <HamburgerMenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <div className="flex w-full min-h-[60vh] relative">
          {/* Sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-0 h-full">
              <Sidebar />
            </div>
          </div>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
              <div className="fixed top-0 left-0 w-[80%] max-w-[320px] h-full bg-white z-50 shadow-lg">
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </div>
            </>
          )}

          {/* Content */}
          <div className="flex-1 md:pl-[30px] py-[52px] mb-[200px] px-4 md:px-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardWrapper;

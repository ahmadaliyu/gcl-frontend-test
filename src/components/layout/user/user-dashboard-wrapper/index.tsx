'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';

function UserDashboardWrapper({
  children,
  menuType,
}: {
  children?: React.ReactNode;
  menuType?: 'account-settings-menu' | 'my-account-menu';
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="max-screen-wrapper  ">
        <div className="max-screen-inner ">
          <div className="flex w-full min-h-[100vh]">
            <div className="">
              <div className="sticky top-[0px]"></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-screen-wrapper  ">
      <div className="max-screen-inner ">
        <div className="flex w-full min-h-[60vh]">
          <div className="">
            <div className="sticky top-[0px]">
              <Sidebar />
            </div>
          </div>
          <div className="flex-1 md:pl-[30px] py-[52px] mb-[200px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardWrapper;

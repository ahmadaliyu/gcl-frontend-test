'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menus } from './constants';

function Sidebar() {
  const pathName = usePathname();

  return (
    <div className="pr-4 pt-[22px] w-[352px] hidden md:block border-[#F8F8F8] border shadow-lg rounded-[16px] py-[24px]">
      <h1 className="text-[#111111] text-[24px] leading-[32px] font-[400]  px-[24px]">Menu</h1>

      <div className="mt-6">
        <div className="flex flex-col gap-2" role="listitem">
          {menus.map((item, index) => (
            <Link href={item.link} key={index} className="inline-flex items-center w-full" role="list">
              <div
                className={`inline-flex items-center w-full py-[12px]  px-[24px]  gap-[16px] ${
                  pathName === item.link ? 'bg-[#E51520] ' : ' '
                }`}
              >
                {item?.type === 'action'
                  ? item?.leftIcon
                  : pathName === item.link
                  ? item.leftIconActive
                  : item.leftIconInActive}

                <span
                  className={`text-[12px] lg:text-[14px] font-medium leading-[20px] lg:leading-[22px] ${
                    item?.textColor
                      ? `text-[${item?.textColor}]`
                      : pathName === item.link
                      ? 'text-[#fafafa] '
                      : 'text-[#4e4e4e]'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

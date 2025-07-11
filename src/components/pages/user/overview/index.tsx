import UserDashboardWrapper from '@/components/layout/user/user-dashboard-wrapper';
import { storage } from '@/lib/storage/localstorage';
import { useGetProfile } from '@/services/hooks/profile/useGetProfile';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { RootState } from '@/store/store';
import { setUser } from '@/store/user/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const pending = (
  <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="79" height="23" rx="11.5" fill="#FFF6C5" />
    <rect x="0.5" y="0.5" width="79" height="23" rx="11.5" stroke="#BB5802" />
    <path
      d="M18.2441 17H17.2598V8.59766H18.2441V17ZM25.3105 17H24.3496V13.5781C24.3496 12.3047 23.8848 11.668 22.9551 11.668C22.4746 11.668 22.0762 11.8496 21.7598 12.2129C21.4473 12.5723 21.291 13.0273 21.291 13.5781V17H20.3301V11H21.291V11.9961H21.3145C21.7676 11.2383 22.4238 10.8594 23.2832 10.8594C23.9395 10.8594 24.4414 11.0723 24.7891 11.498C25.1367 11.9199 25.3105 12.5312 25.3105 13.332V17ZM35.5176 9.48828H33.0918V17H32.1074V9.48828H29.6875V8.59766H35.5176V9.48828ZM38.7988 11.9727C38.6309 11.8438 38.3887 11.7793 38.0723 11.7793C37.6621 11.7793 37.3184 11.9727 37.041 12.3594C36.7676 12.7461 36.6309 13.2734 36.6309 13.9414V17H35.6699V11H36.6309V12.2363H36.6543C36.791 11.8145 37 11.4863 37.2812 11.252C37.5625 11.0137 37.877 10.8945 38.2246 10.8945C38.4746 10.8945 38.666 10.9219 38.7988 10.9766V11.9727ZM44.1367 17H43.1758V16.0625H43.1523C42.7344 16.7812 42.1191 17.1406 41.3066 17.1406C40.709 17.1406 40.2402 16.9824 39.9004 16.666C39.5645 16.3496 39.3965 15.9297 39.3965 15.4062C39.3965 14.2852 40.0566 13.6328 41.377 13.4492L43.1758 13.1973C43.1758 12.1777 42.7637 11.668 41.9395 11.668C41.2168 11.668 40.5645 11.9141 39.9824 12.4062V11.4219C40.5723 11.0469 41.252 10.8594 42.0215 10.8594C43.4316 10.8594 44.1367 11.6055 44.1367 13.0977V17ZM43.1758 13.9648L41.7285 14.1641C41.2832 14.2266 40.9473 14.3379 40.7207 14.498C40.4941 14.6543 40.3809 14.9336 40.3809 15.3359C40.3809 15.6289 40.4844 15.8691 40.6914 16.0566C40.9023 16.2402 41.1816 16.332 41.5293 16.332C42.0059 16.332 42.3984 16.166 42.707 15.834C43.0195 15.498 43.1758 15.0742 43.1758 14.5625V13.9648ZM50.9277 17H49.9668V13.5781C49.9668 12.3047 49.502 11.668 48.5723 11.668C48.0918 11.668 47.6934 11.8496 47.377 12.2129C47.0645 12.5723 46.9082 13.0273 46.9082 13.5781V17H45.9473V11H46.9082V11.9961H46.9316C47.3848 11.2383 48.041 10.8594 48.9004 10.8594C49.5566 10.8594 50.0586 11.0723 50.4062 11.498C50.7539 11.9199 50.9277 12.5312 50.9277 13.332V17ZM52.3809 16.7832V15.752C52.9043 16.1387 53.4805 16.332 54.1094 16.332C54.9531 16.332 55.375 16.0508 55.375 15.4883C55.375 15.3281 55.3379 15.1934 55.2637 15.084C55.1934 14.9707 55.0957 14.8711 54.9707 14.7852C54.8496 14.6992 54.7051 14.623 54.5371 14.5566C54.373 14.4863 54.1953 14.4141 54.0039 14.3398C53.7383 14.2344 53.5039 14.1289 53.3008 14.0234C53.1016 13.9141 52.9336 13.793 52.7969 13.6602C52.6641 13.5234 52.5625 13.3691 52.4922 13.1973C52.4258 13.0254 52.3926 12.8242 52.3926 12.5938C52.3926 12.3125 52.457 12.0645 52.5859 11.8496C52.7148 11.6309 52.8867 11.4492 53.1016 11.3047C53.3164 11.1562 53.5605 11.0449 53.834 10.9707C54.1113 10.8965 54.3965 10.8594 54.6895 10.8594C55.209 10.8594 55.6738 10.9492 56.084 11.1289V12.1016C55.6426 11.8125 55.1348 11.668 54.5605 11.668C54.3809 11.668 54.2188 11.6895 54.0742 11.7324C53.9297 11.7715 53.8047 11.8281 53.6992 11.9023C53.5977 11.9766 53.5176 12.0664 53.459 12.1719C53.4043 12.2734 53.377 12.3867 53.377 12.5117C53.377 12.668 53.4043 12.7988 53.459 12.9043C53.5176 13.0098 53.6016 13.1035 53.7109 13.1855C53.8203 13.2676 53.9531 13.3418 54.1094 13.4082C54.2656 13.4746 54.4434 13.5469 54.6426 13.625C54.9082 13.7266 55.1465 13.832 55.3574 13.9414C55.5684 14.0469 55.748 14.168 55.8965 14.3047C56.0449 14.4375 56.1582 14.5918 56.2363 14.7676C56.3184 14.9434 56.3594 15.1523 56.3594 15.3945C56.3594 15.6914 56.293 15.9492 56.1602 16.168C56.0312 16.3867 55.8574 16.5684 55.6387 16.7129C55.4199 16.8574 55.168 16.9648 54.8828 17.0352C54.5977 17.1055 54.2988 17.1406 53.9863 17.1406C53.3691 17.1406 52.834 17.0215 52.3809 16.7832ZM58.334 9.47656C58.1621 9.47656 58.0156 9.41797 57.8945 9.30078C57.7734 9.18359 57.7129 9.03516 57.7129 8.85547C57.7129 8.67578 57.7734 8.52734 57.8945 8.41016C58.0156 8.28906 58.1621 8.22852 58.334 8.22852C58.5098 8.22852 58.6582 8.28906 58.7793 8.41016C58.9043 8.52734 58.9668 8.67578 58.9668 8.85547C58.9668 9.02734 58.9043 9.17383 58.7793 9.29492C58.6582 9.41602 58.5098 9.47656 58.334 9.47656ZM58.8027 17H57.8418V11H58.8027V17ZM63.5312 16.9414C63.3047 17.0664 63.0059 17.1289 62.6348 17.1289C61.584 17.1289 61.0586 16.543 61.0586 15.3711V11.8203H60.0273V11H61.0586V9.53516L62.0195 9.22461V11H63.5312V11.8203H62.0195V15.2012C62.0195 15.6035 62.0879 15.8906 62.2246 16.0625C62.3613 16.2344 62.5879 16.3203 62.9043 16.3203C63.1465 16.3203 63.3555 16.2539 63.5312 16.1211V16.9414Z"
      fill="#BB5802"
    />
  </svg>
);

const datex = (
  <svg width="80" height="22" viewBox="0 0 80 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="22" rx="11" fill="#F7B9BC" />
    <path
      d="M18.4326 15H17.5244L16.7822 13.0371H13.8135L13.1152 15H12.2021L14.8877 7.99805H15.7373L18.4326 15ZM16.5137 12.2998L15.415 9.31641C15.3792 9.21875 15.3434 9.0625 15.3076 8.84766H15.2881C15.2555 9.04622 15.2181 9.20247 15.1758 9.31641L14.0869 12.2998H16.5137ZM20.1807 14.2773H20.1611V17.2998H19.3604V10H20.1611V10.8789H20.1807C20.5745 10.2148 21.1507 9.88281 21.9092 9.88281C22.5537 9.88281 23.0566 10.1074 23.418 10.5566C23.7793 11.0026 23.96 11.6016 23.96 12.3535C23.96 13.1901 23.7565 13.8607 23.3496 14.3652C22.9427 14.8665 22.3861 15.1172 21.6797 15.1172C21.0319 15.1172 20.5322 14.8372 20.1807 14.2773ZM20.1611 12.2607V12.959C20.1611 13.3724 20.2946 13.724 20.5615 14.0137C20.8317 14.3001 21.1735 14.4434 21.5869 14.4434C22.0719 14.4434 22.4512 14.2578 22.7246 13.8867C23.0013 13.5156 23.1396 12.9997 23.1396 12.3389C23.1396 11.7822 23.0111 11.346 22.7539 11.0303C22.4967 10.7145 22.1484 10.5566 21.709 10.5566C21.2435 10.5566 20.8691 10.7194 20.5859 11.0449C20.3027 11.3672 20.1611 11.7725 20.1611 12.2607ZM27.8467 10.8105C27.7067 10.7031 27.5049 10.6494 27.2412 10.6494C26.8994 10.6494 26.613 10.8105 26.3818 11.1328C26.154 11.4551 26.04 11.8945 26.04 12.4512V15H25.2393V10H26.04V11.0303H26.0596C26.1735 10.6787 26.3477 10.4053 26.582 10.21C26.8164 10.0114 27.0785 9.91211 27.3682 9.91211C27.5765 9.91211 27.736 9.9349 27.8467 9.98047V10.8105ZM35.4688 15H31.5088V14.2969H33.0908V8.85742L31.4697 9.34082V8.5791L33.8916 7.8418V14.2969H35.4688V15ZM38.667 15.1172C37.9736 15.1172 37.4316 14.8193 37.041 14.2236C36.6536 13.6279 36.46 12.7669 36.46 11.6406C36.46 10.4036 36.6618 9.46777 37.0654 8.83301C37.4723 8.19824 38.0583 7.88086 38.8232 7.88086C40.2881 7.88086 41.0205 9.07715 41.0205 11.4697C41.0205 12.6546 40.8138 13.5596 40.4004 14.1846C39.987 14.8063 39.4092 15.1172 38.667 15.1172ZM38.7793 8.55957C37.7799 8.55957 37.2803 9.57357 37.2803 11.6016C37.2803 13.4961 37.7702 14.4434 38.75 14.4434C39.7168 14.4434 40.2002 13.4798 40.2002 11.5527C40.2002 9.55729 39.7266 8.55957 38.7793 8.55957ZM42.9736 13.8867L42.1924 16.2891H41.6211L42.1924 13.8867H42.9736ZM51.0303 15H46.8115V14.2871L48.8525 12.2412C49.3734 11.7204 49.7445 11.2874 49.9658 10.9424C50.1904 10.5941 50.3027 10.223 50.3027 9.8291C50.3027 9.42546 50.1872 9.11296 49.9561 8.8916C49.7249 8.67025 49.3962 8.55957 48.9697 8.55957C48.3447 8.55957 47.7458 8.8265 47.1729 9.36035V8.52051C47.7197 8.09408 48.3561 7.88086 49.082 7.88086C49.707 7.88086 50.1986 8.05013 50.5566 8.38867C50.9147 8.72721 51.0938 9.18132 51.0938 9.75098C51.0938 10.2002 50.9701 10.6396 50.7227 11.0693C50.4753 11.4958 50.0309 12.0264 49.3896 12.6611L47.7734 14.2578V14.2773H51.0303V15ZM54.3604 15.1172C53.667 15.1172 53.125 14.8193 52.7344 14.2236C52.347 13.6279 52.1533 12.7669 52.1533 11.6406C52.1533 10.4036 52.3551 9.46777 52.7588 8.83301C53.1657 8.19824 53.7516 7.88086 54.5166 7.88086C55.9814 7.88086 56.7139 9.07715 56.7139 11.4697C56.7139 12.6546 56.5072 13.5596 56.0938 14.1846C55.6803 14.8063 55.1025 15.1172 54.3604 15.1172ZM54.4727 8.55957C53.4733 8.55957 52.9736 9.57357 52.9736 11.6016C52.9736 13.4961 53.4635 14.4434 54.4434 14.4434C55.4102 14.4434 55.8936 13.4798 55.8936 11.5527C55.8936 9.55729 55.4199 8.55957 54.4727 8.55957ZM61.8115 15H57.5928V14.2871L59.6338 12.2412C60.1546 11.7204 60.5257 11.2874 60.7471 10.9424C60.9717 10.5941 61.084 10.223 61.084 9.8291C61.084 9.42546 60.9684 9.11296 60.7373 8.8916C60.5062 8.67025 60.1774 8.55957 59.751 8.55957C59.126 8.55957 58.527 8.8265 57.9541 9.36035V8.52051C58.501 8.09408 59.1374 7.88086 59.8633 7.88086C60.4883 7.88086 60.9798 8.05013 61.3379 8.38867C61.696 8.72721 61.875 9.18132 61.875 9.75098C61.875 10.2002 61.7513 10.6396 61.5039 11.0693C61.2565 11.4958 60.8122 12.0264 60.1709 12.6611L58.5547 14.2578V14.2773H61.8115V15ZM67.5635 13.1396H66.665V15H65.874V13.1396H62.583V12.6172L65.6982 7.99805H66.665V12.4902H67.5635V13.1396ZM65.874 12.4902V9.46289C65.874 9.24805 65.8805 9.00716 65.8936 8.74023H65.874C65.8285 8.85742 65.7389 9.03646 65.6055 9.27734L63.4521 12.4902H65.874Z"
      fill="#616161"
    />
  </svg>
);

function DashboardOverview() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetProfile();

  const user = useAppSelector((state: RootState) => state);

  const router = useRouter();

  const handleBookNew = () => router.push('/user/book-a-quote');

  return (
    <UserDashboardWrapper>
      <div>
        <h1 className="text-[#272727] font-[600] text-[24px]">My Overview</h1>
        <div className="flex gap-[32px] ">
          {/* <button
            onClick={handleBookNew}
            className="shrink-0 w-[240px] h-[104px] flex flex-col gap-[8px] hover:border hover:border-[#E51520] items-center justify-center rounded-[4px] shadow-md bg-[#02044A]"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.0349 4.84961C14.5183 4.84961 10.0349 9.33294 10.0349 14.8496V19.6663C10.0349 20.6829 9.60161 22.2329 9.08494 23.0996L7.16828 26.2829C5.98494 28.2496 6.80161 30.4329 8.96828 31.1663C16.1516 33.5663 23.9016 33.5663 31.0849 31.1663C33.1016 30.4996 33.9849 28.1163 32.8849 26.2829L30.9683 23.0996C30.4683 22.2329 30.0349 20.6829 30.0349 19.6663V14.8496C30.0349 9.34961 25.5349 4.84961 20.0349 4.84961Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M23.1159 5.33242C22.5992 5.18242 22.0659 5.06576 21.5159 4.99909C19.9159 4.79909 18.3826 4.91576 16.9492 5.33242C17.4326 4.09909 18.6326 3.23242 20.0326 3.23242C21.4326 3.23242 22.6326 4.09909 23.1159 5.33242Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.0352 31.7676C25.0352 34.5176 22.7852 36.7676 20.0352 36.7676C18.6685 36.7676 17.4018 36.2009 16.5018 35.3009C15.6018 34.4009 15.0352 33.1342 15.0352 31.7676"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>

            <span className="text-[16px] font-medium text-white">Book New</span>
          </button> */}
          <Link href="/user/shipment-tracking">
            {/* <button className="shrink-0 w-[240px] h-[104px] flex flex-col gap-[8px] hover:border hover:border-[#E51520] items-center justify-center rounded-[4px] shadow-md">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.28516 12.4004L20.0018 20.917L34.6185 12.4503"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 36.0171V20.9004"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M36.0177 21.384V15.284C36.0177 12.984 34.3677 10.184 32.351 9.06735L23.451 4.13398C21.551 3.06732 18.451 3.06732 16.551 4.13398L7.65101 9.06735C5.63434 10.184 3.98438 12.984 3.98438 15.284V24.7174C3.98438 27.0174 5.63434 29.8173 7.65101 30.934L16.551 35.8674C17.501 36.4007 18.751 36.6674 20.001 36.6674C21.251 36.6674 22.501 36.4007 23.451 35.8674"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32.0013 35.6667C34.9468 35.6667 37.3346 33.2789 37.3346 30.3334C37.3346 27.3878 34.9468 25 32.0013 25C29.0558 25 26.668 27.3878 26.668 30.3334C26.668 33.2789 29.0558 35.6667 32.0013 35.6667Z"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M38.3346 36.6667L36.668 35"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[16px] font-medium text-[#E51520]">Track a shipment</span>
            </button> */}
          </Link>

          {/* <Link href="/user/notifications">
            <button className="shrink-0 w-[240px] h-[104px] flex flex-col gap-[8px] hover:border hover:border-[#E51520] items-center justify-center rounded-[4px] shadow-md">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.0349 4.84961C14.5183 4.84961 10.0349 9.33294 10.0349 14.8496V19.6663C10.0349 20.6829 9.60161 22.2329 9.08494 23.0996L7.16828 26.2829C5.98494 28.2496 6.80161 30.4329 8.96828 31.1663C16.1516 33.5663 23.9016 33.5663 31.0849 31.1663C33.1016 30.4996 33.9849 28.1163 32.8849 26.2829L30.9683 23.0996C30.4683 22.2329 30.0349 20.6829 30.0349 19.6663V14.8496C30.0349 9.34961 25.5349 4.84961 20.0349 4.84961Z"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M23.1159 5.33242C22.5992 5.18242 22.0659 5.06576 21.5159 4.99909C19.9159 4.79909 18.3826 4.91576 16.9492 5.33242C17.4326 4.09909 18.6326 3.23242 20.0326 3.23242C21.4326 3.23242 22.6326 4.09909 23.1159 5.33242Z"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25.0352 31.7676C25.0352 34.5176 22.7852 36.7676 20.0352 36.7676C18.6685 36.7676 17.4018 36.2009 16.5018 35.3009C15.6018 34.4009 15.0352 33.1342 15.0352 31.7676"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>

              <span className="text-[16px] font-medium text-[#E51520]">Notification Panel</span>
            </button>
          </Link> */}

          {/* <Link href="/user/support-and-help-center">
            <button className="shrink-0 w-[240px] h-[104px] flex flex-col gap-[8px] hover:border hover:border-[#E51520] items-center justify-center rounded-[4px] shadow-md">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M28.332 30.7175H21.6654L14.2487 35.6508C13.1487 36.3842 11.6654 35.6009 11.6654 34.2676V30.7175C6.66536 30.7175 3.33203 27.3842 3.33203 22.3842V12.3841C3.33203 7.38411 6.66536 4.05078 11.6654 4.05078H28.332C33.332 4.05078 36.6654 7.38411 36.6654 12.3841V22.3842C36.6654 27.3842 33.332 30.7175 28.332 30.7175Z"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.001 18.9336V18.5837C20.001 17.4503 20.701 16.8503 21.401 16.367C22.0844 15.9003 22.7676 15.3003 22.7676 14.2003C22.7676 12.667 21.5343 11.4336 20.001 11.4336C18.4677 11.4336 17.2344 12.667 17.2344 14.2003"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.9938 22.9173H20.0088"
                  stroke="#DC3545"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[16px] font-medium text-[#E51520]">Contact Support</span>
            </button>
          </Link> */}
        </div>

        <div className="flex w-full gap-[24px] mt-[40px] max-h-[520px] overflow-y-aut">
          <div className="flex-1 flex flex-col  gap-[16px]">
            <h2 className="text-[#242424] font-[500] text-[18px] uppercase ">Recent Shipments</h2>
            <Shipment />
            <Shipment />
            <Shipment />
            <Shipment />
            <Shipment />
          </div>

          <div className="flex-1 flex flex-col  gap-[16px] max-h-[520px] overflow-y-auto">
            <h2 className="text-[#242424] font-[500] text-[18px] uppercase  ">Latest Notifications</h2>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
          </div>
        </div>

        <div className="flex w-full gap-[24px] mt-[20px] max-h-[520px] overflow-y-aut">
          <div className="flex-1 flex flex-col  gap-[16px]">
            <a className="text-[#E51520] font-medium text-[12px] text-center underline">See More</a>
          </div>
          <div className="flex-1 flex flex-col  gap-[16px]">
            <a className="text-[#E51520] font-medium text-[12px] text-center underline">See More</a>
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

const Shipment = () => {
  return (
    <div className="flex gap-[16px] border-b border-b-[#E0E0E0] pb-[8px] pr-2 cursor-pointer">
      <img src="/images/Ebay__3_.png.png" className="w-[40px] h-[40px]" />
      <div className="flex flex-col gap-[4px]">
        <span className="text-[#242424] text-[16px] font-[500]">Sent to James Dean</span>
        <div className="flex gap-[8px]">
          <span className="text-[#616161] text-[14px] font-[400]">Air Cargo</span>
          {pending}
        </div>
      </div>
      <div className="flex flex-col  ml-auto justify-between items-end h-full gap-[8px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.51562 6C9.23948 6 9.01562 6.22386 9.01562 6.5C9.01562 6.77614 9.23948 7 9.51562 7H12.2929L8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L13 7.70711V10.4844C13 10.7605 13.2239 10.9844 13.5 10.9844C13.7761 10.9844 14 10.7605 14 10.4844V6.5C14 6.22386 13.7761 6 13.5 6H9.51562ZM12.7656 17C14.0136 17 15.0481 16.0855 15.2354 14.8901C16.2572 14.5761 17 13.6248 17 12.5V5.5C17 4.11929 15.8807 3 14.5 3H7.5C6.36321 3 5.40363 3.75875 5.10007 4.79744C3.90947 4.98887 3 6.02104 3 7.26562V13.5C3 15.433 4.567 17 6.5 17H12.7656ZM4 7.26562C4 6.61252 4.4174 6.0569 5 5.85098V12.5C5 13.8807 6.11929 15 7.5 15H14.1803C13.9744 15.5826 13.4187 16 12.7656 16H6.5C5.11929 16 4 14.8807 4 13.5V7.26562ZM7.5 4H14.5C15.3284 4 16 4.67157 16 5.5V12.5C16 13.3284 15.3284 14 14.5 14H7.5C6.67157 14 6 13.3284 6 12.5V5.5C6 4.67157 6.67157 4 7.5 4Z"
            fill="#7C98B6"
          />
        </svg>

        <p className="text-[12px] text-[#000000B2]">Created: 02 Mar. 2025</p>
      </div>
    </div>
  );
};

const Notification = () => {
  return (
    <div className="flex flex-col gap-[8px] border-b border-b-[#E0E0E0] pb-[8px] pr-2 cursor-pointer">
      {datex}
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-[12px] text-[#000000B2]">Get 15% discount for new shipment</p>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.51562 6C9.23948 6 9.01562 6.22386 9.01562 6.5C9.01562 6.77614 9.23948 7 9.51562 7H12.2929L8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L13 7.70711V10.4844C13 10.7605 13.2239 10.9844 13.5 10.9844C13.7761 10.9844 14 10.7605 14 10.4844V6.5C14 6.22386 13.7761 6 13.5 6H9.51562ZM12.7656 17C14.0136 17 15.0481 16.0855 15.2354 14.8901C16.2572 14.5761 17 13.6248 17 12.5V5.5C17 4.11929 15.8807 3 14.5 3H7.5C6.36321 3 5.40363 3.75875 5.10007 4.79744C3.90947 4.98887 3 6.02104 3 7.26562V13.5C3 15.433 4.567 17 6.5 17H12.7656ZM4 7.26562C4 6.61252 4.4174 6.0569 5 5.85098V12.5C5 13.8807 6.11929 15 7.5 15H14.1803C13.9744 15.5826 13.4187 16 12.7656 16H6.5C5.11929 16 4 14.8807 4 13.5V7.26562ZM7.5 4H14.5C15.3284 4 16 4.67157 16 5.5V12.5C16 13.3284 15.3284 14 14.5 14H7.5C6.67157 14 6 13.3284 6 12.5V5.5C6 4.67157 6.67157 4 7.5 4Z"
            fill="#7C98B6"
          />
        </svg>
      </div>
    </div>
  );
};

export default DashboardOverview;

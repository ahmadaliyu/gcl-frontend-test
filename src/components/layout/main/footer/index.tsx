'use client';
import Button from '@/components/reuseables/Button';
import React from 'react';

function Footer() {
  return (
    <>
      <div className="max-screen-wrapper bg-[#272727] py-[30px] pt-[100px] mt-[100px]">
        <div className="max-screen-inner ">
          <div className="bg-[#DC3545] h-[163px] mt-[-160px] rounded-[10px] mb-[70px] flex flex-row items-center justify-between px-[30px]">
            <div>
              <a href="/">
                <img src="/images/logo.png" className="w-[153px] h-[62px]" alt="logo" />
              </a>
            </div>

            <div>
              <p className="text-white mb-[16px] text-[18px] font-[600]">Connect With Us :</p>
              <div className="flex gap-[20px]">
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.934 28.5909V20.5705H15.8132V17.6827H17.934V15.2162C17.934 13.278 19.1868 11.498 22.0734 11.498C23.2421 11.498 24.1064 11.6101 24.1064 11.6101L24.0382 14.3068C24.0382 14.3068 23.1569 14.2982 22.1951 14.2982C21.1541 14.2982 20.9874 14.7779 20.9874 15.5741V17.6827H24.121L23.9847 20.5705H20.9874V28.5909H17.934Z"
                    fill="white"
                  />
                  <path
                    d="M19.9027 37.4616C29.7258 37.4616 37.6891 29.4983 37.6891 19.6751C37.6891 9.85193 29.7258 1.88867 19.9027 1.88867C10.0795 1.88867 2.11621 9.85193 2.11621 19.6751C2.11621 29.4983 10.0795 37.4616 19.9027 37.4616Z"
                    stroke="white"
                    strokeWidth="1.22665"
                  />
                </svg>

                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M28.7816 14.7823C28.1529 15.0535 27.4689 15.2486 26.7643 15.3246C27.4958 14.89 28.0436 14.2034 28.3049 13.3937C27.6185 13.802 26.8666 14.0883 26.0824 14.24C25.7546 13.8896 25.3582 13.6104 24.9179 13.42C24.4775 13.2295 24.0026 13.1317 23.5228 13.1328C21.5817 13.1328 20.0205 14.7063 20.0205 16.6372C20.0205 16.9084 20.0533 17.1795 20.1068 17.4404C17.2001 17.2884 14.6078 15.8998 12.8843 13.7737C12.5702 14.3101 12.4057 14.9208 12.4077 15.5423C12.4077 16.7584 13.026 17.8307 13.9689 18.4613C13.4133 18.4394 12.8706 18.2867 12.3851 18.0156V18.0587C12.3851 19.7616 13.5889 21.1728 15.1932 21.4973C14.8919 21.5756 14.5821 21.6157 14.2708 21.6165C14.0428 21.6165 13.8271 21.5939 13.6094 21.5631C14.0531 22.9518 15.3452 23.9604 16.8838 23.9932C15.68 24.9361 14.1723 25.4907 12.535 25.4907C12.2413 25.4907 11.9702 25.4804 11.6887 25.4475C13.2417 26.4439 15.0843 27.019 17.0686 27.019C23.5105 27.019 27.0355 21.6823 27.0355 17.0501C27.0355 16.8981 27.0355 16.7461 27.0253 16.5941C27.7072 16.0949 28.3049 15.4766 28.7816 14.7823Z"
                    fill="white"
                  />
                  <path
                    d="M19.8673 37.4616C29.6904 37.4616 37.6537 29.4983 37.6537 19.6751C37.6537 9.85193 29.6904 1.88867 19.8673 1.88867C10.0441 1.88867 2.08081 9.85193 2.08081 19.6751C2.08081 29.4983 10.0441 37.4616 19.8673 37.4616Z"
                    stroke="white"
                    strokeWidth="1.22665"
                  />
                </svg>

                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M28.7816 14.7823C28.1529 15.0535 27.4689 15.2486 26.7643 15.3246C27.4958 14.89 28.0436 14.2034 28.3049 13.3937C27.6185 13.802 26.8666 14.0883 26.0824 14.24C25.7546 13.8896 25.3582 13.6104 24.9179 13.42C24.4775 13.2295 24.0026 13.1317 23.5228 13.1328C21.5817 13.1328 20.0205 14.7063 20.0205 16.6372C20.0205 16.9084 20.0533 17.1795 20.1068 17.4404C17.2001 17.2884 14.6078 15.8998 12.8843 13.7737C12.5702 14.3101 12.4057 14.9208 12.4077 15.5423C12.4077 16.7584 13.026 17.8307 13.9689 18.4613C13.4133 18.4394 12.8706 18.2867 12.3851 18.0156V18.0587C12.3851 19.7616 13.5889 21.1728 15.1932 21.4973C14.8919 21.5756 14.5821 21.6157 14.2708 21.6165C14.0428 21.6165 13.8271 21.5939 13.6094 21.5631C14.0531 22.9518 15.3452 23.9604 16.8838 23.9932C15.68 24.9361 14.1723 25.4907 12.535 25.4907C12.2413 25.4907 11.9702 25.4804 11.6887 25.4475C13.2417 26.4439 15.0843 27.019 17.0686 27.019C23.5105 27.019 27.0355 21.6823 27.0355 17.0501C27.0355 16.8981 27.0355 16.7461 27.0253 16.5941C27.7072 16.0949 28.3049 15.4766 28.7816 14.7823Z"
                    fill="white"
                  />
                  <path
                    d="M19.8673 37.4616C29.6904 37.4616 37.6537 29.4983 37.6537 19.6751C37.6537 9.85193 29.6904 1.88867 19.8673 1.88867C10.0441 1.88867 2.08081 9.85193 2.08081 19.6751C2.08081 29.4983 10.0441 37.4616 19.8673 37.4616Z"
                    stroke="white"
                    strokeWidth="1.22665"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[500px]">
              <p className="text-white mb-[16px] text-[18px] font-[600]">Get Update Notification :</p>
              <div className="flex gap-[20px]">
                <input
                  className="flex w-full text-white bg-transparent border-white border h-[49px] rounded-[10px] px-[10px] placeholder:text-white/45"
                  placeholder="Enter Your Email"
                />
                <Button title="Sign Up" variant="black" height="49px" />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="max-w-[350px] flex flex-col gap-[5px]">
              <p className="text-[18px] text-[#DC3545] mb-[20px] font-[600]">Contact Us</p>
              <p className="text-white">
                34 Brindley Road, City Park, Old Trafford, M16 9HQ Manchester, United Kingdom.
              </p>

              <div className="flex items-center gap-[14px] mt-[24px]">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.60174 5.22842C9.31016 4.49947 8.60416 4.02148 7.81906 4.02148H5.17833C4.17374 4.02148 3.35938 4.83566 3.35938 5.84023C3.35938 14.3792 10.2817 21.3014 18.8207 21.3014C19.8252 21.3014 20.6394 20.4871 20.6394 19.4824L20.6399 16.8413C20.6399 16.0562 20.162 15.3503 19.433 15.0587L16.902 14.0467C16.2473 13.7848 15.5017 13.9026 14.9599 14.3541L14.3067 14.8989C13.5439 15.5346 12.4214 15.4841 11.7192 14.7819L9.87991 12.9409C9.17773 12.2387 9.12584 11.1172 9.76157 10.3543L10.3062 9.70113C10.7577 9.15936 10.8767 8.41364 10.6148 7.75885L9.60174 5.22842Z"
                    fill="#21222D"
                    stroke="#DC3545"
                    strokeWidth="1.92"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="text-white">
                  <p>UK</p> <span>0161 706 1220</span>, <span>075 778 33627</span>
                </div>
              </div>

              <div className="flex items-center gap-[14px] mt-[10px]">
                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.31937 2.90141L8.18267 7.32917L8.18469 7.3308C8.83566 7.80821 9.16139 8.04705 9.51822 8.13941C9.83349 8.22091 10.165 8.22091 10.4803 8.13941C10.8374 8.04705 11.164 7.80744 11.8163 7.32917C11.8163 7.32917 15.5771 4.44311 17.6794 2.90141M1.35938 12.3096V5.0136C1.35938 3.93829 1.35937 3.40024 1.56865 2.98953C1.75272 2.62826 2.04623 2.33475 2.4075 2.15068C2.81821 1.94141 3.35626 1.94141 4.43157 1.94141H15.5676C16.6429 1.94141 17.1798 1.94141 17.5905 2.15068C17.9517 2.33475 18.2463 2.62826 18.4303 2.98953C18.6394 3.39984 18.6394 3.93724 18.6394 5.01044V12.3128C18.6394 13.386 18.6394 13.9226 18.4303 14.3329C18.2463 14.6943 17.9517 14.9882 17.5905 15.1724C17.1802 15.3814 16.6435 15.3814 15.5704 15.3814H4.42841C3.35521 15.3814 2.81781 15.3814 2.4075 15.1724C2.04623 14.9882 1.75272 14.6943 1.56865 14.3329C1.35937 13.9223 1.35938 13.3849 1.35938 12.3096Z"
                    fill="#21222D"
                  />
                  <path
                    d="M2.31937 2.90141L8.18267 7.32917L8.18469 7.3308C8.83566 7.80821 9.16139 8.04705 9.51822 8.13941C9.83349 8.22091 10.165 8.22091 10.4803 8.13941C10.8374 8.04705 11.164 7.80744 11.8163 7.32917C11.8163 7.32917 15.5771 4.44311 17.6794 2.90141M1.35938 12.3095V5.0136C1.35938 3.93829 1.35937 3.40024 1.56865 2.98953C1.75272 2.62826 2.04623 2.33475 2.4075 2.15068C2.81821 1.94141 3.35626 1.94141 4.43157 1.94141H15.5676C16.6429 1.94141 17.1798 1.94141 17.5905 2.15068C17.9517 2.33475 18.2463 2.62826 18.4303 2.98953C18.6394 3.39984 18.6394 3.93724 18.6394 5.01044V12.3128C18.6394 13.386 18.6394 13.9226 18.4303 14.3329C18.2463 14.6943 17.9517 14.9882 17.5905 15.1724C17.1802 15.3814 16.6435 15.3814 15.5704 15.3814H4.42841C3.35521 15.3814 2.81781 15.3814 2.4075 15.1724C2.04623 14.9882 1.75272 14.6943 1.56865 14.3329C1.35937 13.9223 1.35938 13.3849 1.35938 12.3095Z"
                    stroke="#DC3545"
                    strokeWidth="1.92"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="text-white">
                  <p>admin@globalcorporatelogistics.com</p>
                </div>
              </div>

              <div className="text-white mt-[10px]">
                <p>Open - Monday To Friday</p>
              </div>
            </div>

            <div className="max-w-[237px] flex flex-col gap-[5px]">
              <p className="text-[18px] text-[#DC3545] mb-[20px] font-[600]">Services</p>

              <p className="text-white">Services</p>
              <p className="text-white">Express Delivery Worldwide</p>
              <p className="text-white">Air Freight</p>
              <p className="text-white">Road Freight</p>
              <p className="text-white">Sea Freight</p>
              <p className="text-white">Custom Clearance Brokerage</p>
              <p className="text-white">Procurement</p>
            </div>

            <div className="max-w-[237px] flex flex-col gap-[5px]">
              <p className="text-[18px] text-[#DC3545] mb-[20px] font-[600]">Quick Links</p>
              <p className="text-white">Home</p>
              <p className="text-white">About Us</p>
              <p className="text-white">Blog</p>
              <p className="text-white">Services</p>
              <p className="text-white">Contact Us</p>
              <p className="text-white">Help</p>
            </div>

            <div className="max-w-[237px] flex flex-col gap-[5px]">
              <p className="text-[18px] text-[#DC3545] mb-[20px] font-[600]">Terms & Condition</p>
              <p className="text-white">Privacy Policy</p>
              <p className="text-white">User Agreement</p>
              <p className="text-white">Terms & Condition</p>
            </div>
          </div>

          <p className="text-white text-center mt-[60px]">
            For smart shipping integration email cs@GlobalCorporatelogistic
          </p>
          <p className="text-white text-center flex items-center justify-center gap-[10px] mt-[10px]">
            <img src="/icons/caution.svg" />
            <span>Service to/from China and other high risk countries not available.</span>
          </p>
        </div>
      </div>

      <div className="border-t-white border-t-[1px] w-full  bg-[#272727]">
        <div className="max-screen-inner  py-[20px]">
          <p className="text-white text-left">© 2024Global Corporate Logistics. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;

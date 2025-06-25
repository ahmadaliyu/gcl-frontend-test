import React, { useEffect } from 'react';
import Button from '@/components/reuseables/Button';
import FaqsPage from '@/components/reuseables/faqs';
import GetAQuote from './GetAQuote';
import { BlurFade } from '@/components/ui/blur-fade';
import './style.css';
import { useGetCities, useGetCountries } from '@/services';
import { useAppDispatch } from '@/store/hook';
import { setCities, setCountries } from '@/store/auth/countrySlice';

function Homepage() {
  const { data: countries, isLoading: isLoadingCountries } = useGetCountries();
  const { data: cities, isLoading: isLoadingCities } = useGetCities();

  console.log(countries, 'hmmm');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (countries?.data) {
      const transformedCountries = countries.data.map((country) => ({
        name: country.name,
        countryCode: country.alpha_2_code,
        alpha_2_code: country.alpha_2_code,
        has_postal: country.has_postal,
        is_active: country.is_active,
        emoji: country.alpha_2_code
          .split('')
          .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
          .join(''),
      }));
      dispatch(setCountries(transformedCountries));
    }
  }, [countries, dispatch]);

  useEffect(() => {
    if (cities?.data) {
      const transformedCities = cities.data.map((city) => ({
        label: city.name,
        name: city.name,
        code: city.code,
        is_active: city.is_active,
      }));
      dispatch(setCities(transformedCities));
    }
  }, [cities, dispatch]);

  return (
    <>
      {/* HEADER */}
      <div className="max-screen-wrapper bg-[#1B4E64] relative">
        <img
          src="/images/homepage-banner-1.webp"
          alt="frame"
          className="absolute left-0 top-0 w-full h-full object-cover"
        />
        <img
          src="/images/homepage-frame.png"
          alt="frame"
          className="absolute left-0 bottom-0 w-full max-w-[400px] md:max-w-none"
        />
        <div className="max-screen-inner h-full flex flex-col md:flex-row min-h-[674px] w-full items-start justify-between gap-[30px] relative z-[10] pt-[60px] md:pt-[100px] px-4 md:px-0">
          <div className="flex-1 h-full flex flex-col gap-[16px] w-full md:w-auto">
            <BlurFade delay={0.25} inView>
              <p className="text-white font-medium text-[16px] md:text-[18px] leading-[27px] uppercase">
                Simplified Shipping Solutions
              </p>
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <p className="text-white font-bold text-[28px] md:text-[42px] leading-[36px] md:leading-[52px] mb-[30px] md:mb-[60px]">
                Global Freight Forwarding And Customs Clearance Services in Manchester, UK
              </p>
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <Button title="Begin UK Import Readiness Quiz" variant="white" className="w-full md:w-auto" />
            </BlurFade>
          </div>
          <div className="flex-1 h-full w-full md:w-auto">
            <BlurFade delay={0.25} inView>
              <GetAQuote />
            </BlurFade>
          </div>
        </div>
      </div>

      {/* BEYOND */}
      <div className="max-screen-wrapper bg-[#fff] py-[30px] md:py-[48px] px-4 md:px-0">
        <div className="max-screen-inner">
          <BlurFade delay={0.25} inView>
            <p className="text-[#0088DD] font-[700] text-[42px] md:text-[92px] leading-[50px] md:leading-[122px] max-w-[1035px]">
              Beyond the Package, We Deliver Care
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#777777] text-[18px] md:text-[24px] leading-[27px] md:leading-[36px] max-w-[968px] my-[16px]">
              We are a UK based freight forwarding and customs clearance company. We are here to help you with your
              logistics needs.
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#21222D] text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] mb-[10px] md:mb-[15px]">
              VAT Number : 378986412
            </p>
            <p className="text-[#21222D] text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] mb-[10px] md:mb-[15px]">
              EORI: GB 016120377000
            </p>
            <p className="text-[#21222D] text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] mb-[10px] md:mb-[15px]">
              Registration Number: 07623919
            </p>
            <p className="text-[#21222D] text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] mb-[20px] md:mb-[15px]">
              BIFA membership: 3738
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <div className="mt-[30px] mb-[40px] md:mt-[40px] md:mb-[56px]">
              <Button title="Read About Us" className="w-full md:w-[311px]" />
            </div>
          </BlurFade>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-[20px]">
            <BlurFade delay={0.1} inView>
              <img
                className="rounded-[16px] md:rounded-[24px] overflow-hidden w-full h-[150px] md:h-[292px] object-cover"
                src="/images/lady_with_sweater.jpg.webp"
                alt="Lady with sweater"
              />
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <img
                className="rounded-[16px] md:rounded-[24px] overflow-hidden w-full h-[150px] md:h-[292px] object-cover"
                src="/images/oldman_with_present.jpg.webp"
                alt="Old man with present"
              />
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <img
                className="rounded-[16px] md:rounded-[24px] overflow-hidden w-full h-[150px] md:h-[292px] object-cover"
                src="/images/girl_looking_into_parcel.jpg.webp"
                alt="Girl looking into parcel"
              />
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <img
                className="rounded-[16px] md:rounded-[24px] overflow-hidden w-full h-[150px] md:h-[292px] object-cover"
                src="/images/girl_new_bicycle.jpg.webp"
                alt="Girl with new bicycle"
              />
            </BlurFade>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-screen-wrapper bg-[#fff] py-[30px] md:py-[48px] px-4 md:px-0">
        <div className="max-screen-inner">
          <BlurFade delay={0.25} inView>
            <p className="uppercase text-center text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#0088DD] font-medium">
              Why Choose Us
            </p>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="text-center text-[24px] md:text-[30px] leading-[32px] md:leading-[47px] text-[#0088DD] font-semibold max-w-[440px] mx-auto mt-[12px] md:mt-[16px]">
              Safe and Faster Logistics Service Near You
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#777777] max-w-[1319px] mx-auto text-[14px] md:text-[16px] px-4 md:px-0">
              Experience hassle-free logistics with Global Corporate Logistics (GCL), your trusted partner for{' '}
              <span className="text-[#DC3545] font-medium capitalize">freight forwarding</span> and{' '}
              <span className="text-[#DC3545] font-medium capitalize">customs clearance solutions</span>! At GCL Parcel,
              we're more than just a logistics provider; we're committed to understanding your unique needs and
              delivering tailored solutions that drive success.
            </p>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] md:gap-[20px] mt-[30px] md:mt-[48px] px-4 md:px-0">
            <BlurFade delay={0.1} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#02044A] border-[1px] border-[#02044A] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/message.png.webp"
                  className="w-[120px] md:w-[170px] h-[140px] md:h-[193px] top-0 right-[-10px] md:right-[-15px] absolute object-contain"
                  alt="World Wide Service"
                />
                <p className="text-white text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] font-[600] mb-[8px]">
                  World Wide <br />
                  Service{' '}
                </p>
                <p className="text-white text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px]">
                  Our trusted network now spans to over 180 countries. Our partners share our dedication to the highest
                  standards of service and communication.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/star.png.webp"
                  className="w-[120px] md:w-[170px] h-[140px] md:h-[193px] top-[-15px] md:top-[-20px] right-[-10px] md:right-[-15px] absolute object-contain"
                  alt="Fast & Reliable"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] h-[56px] md:h-[69px] font-[600] mb-[8px]">
                  Fast & Reliable
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[240px]">
                  We ensure that even the tightest of deadlines can be met with total peace of mind.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Ebay__3_.png.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-0 right-0 absolute object-contain"
                  alt="Knowledge In Your Sector"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] h-[56px] md:h-[69px] font-[600] mb-[8px]">
                  Knowledge In <br />
                  Your Sector
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[240px]">
                  GCL is proud to have extensive knowledge and experience in a wide range of sectors.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Group_1.png.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-[-15px] md:top-[-20px] right-[0] absolute object-contain"
                  alt="Tracking Services"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] h-[56px] md:h-[69px] font-[600] mb-[8px]">
                  Tracking Services
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[240px]">
                  We have our own online track-and- trace system for 24/7 visibility of your shipments.
                </p>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={0.25} inView>
            <Button
              title="Get My Free Quote"
              variant="outlined-red"
              className="mx-auto mt-[30px] md:mt-[48px] w-full md:w-auto"
            />
          </BlurFade>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="flex flex-wrap items-center justify-center gap-[15px] md:gap-[20px] mx-auto max-w-[876px] py-[15px] md:py-[21px] mb-[30px] md:mb-[48px] px-4">
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center justify-center gap-[5px] md:gap-[8px] w-[120px] md:w-auto">
            <img
              src="/icons/Benefit.png"
              className="w-[32px] md:w-[42px] h-[32px] md:h-[42px] object-contain"
              alt="Benefit"
            />
            <p className="text-[#02044A] text-[12px] md:text-[14px] font-medium text-center">State All Benefites</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center justify-center gap-[5px] md:gap-[8px] w-[120px] md:w-auto">
            <img
              src="/icons/Benefit-1.png"
              className="w-[32px] md:w-[42px] h-[32px] md:h-[42px] object-contain"
              alt="Benefit"
            />
            <p className="text-[#02044A] text-[12px] md:text-[14px] font-medium text-center">State All Benefites</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center justify-center gap-[5px] md:gap-[8px] w-[120px] md:w-auto">
            <img
              src="/icons/Benefit-2.png"
              className="w-[32px] md:w-[42px] h-[32px] md:h-[42px] object-contain"
              alt="Benefit"
            />
            <p className="text-[#02044A] text-[12px] md:text-[14px] font-medium text-center">State All Benefites</p>
          </div>
        </BlurFade>

        <div className="bg-[#E51520] rounded-[8px] h-[80px] md:h-[100px] w-[150px] md:w-[200px] flex flex-col items-center justify-center">
          <p className="text-white text-center text-[24px] md:text-[30px] leading-[32px] md:leading-[47px] font-[600]">
            38+
          </p>
          <p className="text-white text-center text-[12px] md:text-[14px] font-[500]">Years Of Experience</p>
        </div>
      </div>

      {/* OUR UK WIDE SERVICES */}
      <div className="max-screen-wrapper bg-[#fff] py-[30px] md:py-[48px] px-4 md:px-0">
        <div className="max-screen-inner">
          <BlurFade delay={0.25} inView>
            <p className="uppercase text-center text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#0088DD] font-medium">
              our UK-wide services
            </p>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="text-center text-[24px] md:text-[30px] leading-[32px] md:leading-[47px] text-[#21222D] font-semibold max-w-[440px] mx-auto mt-[12px] md:mt-[16px] mb-[30px] md:mb-[45px]">
              What We Provide
            </p>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[25px] max-w-[1118px] mx-auto px-4 md:px-0">
            <BlurFade delay={0.1} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Ebay__3_.png-5.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-[-10px] right-[0] absolute object-contain"
                  alt="Air Freight"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] font-[600] mb-[8px]">
                  Air Freight
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Ebay__3_.png-1.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-[-10px] right-[0] absolute object-contain"
                  alt="Sea Freight"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] font-[600] mb-[8px]">
                  Sea Freight
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Ebay__3_.png-2.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-[-10px] right-[0] absolute object-contain"
                  alt="Road Freight"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] font-[600] mb-[8px]">
                  Road Freight
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Ebay__3_.png-3.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-[-10px] right-[0] absolute object-contain"
                  alt="UK Customer Clearance"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] font-[600] mb-[8px]">
                  UK Customer Clearance
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden w-full h-[280px] md:h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[20px] md:p-[24px]">
                <img
                  src="/images/Ebay__3_.png-4.webp"
                  className="w-[120px] md:w-[150px] h-[120px] md:h-[150px] top-[-10px] right-[0] absolute object-contain"
                  alt="Procurement"
                />
                <p className="text-[#3788D1] text-[20px] md:text-[24px] leading-[28px] md:leading-[36px] font-[600] mb-[8px]">
                  Procurement
                </p>
                <p className="text-[#3788D1] text-[12px] md:text-[14px] leading-[20px] md:leading-[25px] h-[100px] md:h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="max-screen-wrapper bg-[#F8F8F8] py-[30px] md:py-[48px] my-[30px] md:my-[48px] font-[600] text-[#21222D] text-[24px] md:text-[30px] px-4 md:px-0">
        <div className="max-screen-inner">
          <p className="text-center mx-auto">
            Global Corporate Logistics <br />
            Prioritizes Seamless Integrations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[15px] md:gap-[20px] items-center justify-center mt-[30px] md:mt-[48px]">
            <img
              className="w-full h-[50px] md:h-[64px] object-contain"
              src="/images/Figure_1.webp"
              alt="Partner logo"
            />
            <img className="w-full h-[50px] md:h-[64px] object-contain" src="/images/5_1.webp" alt="Partner logo" />
            <img className="w-full h-[50px] md:h-[64px] object-contain" src="/images/5.webp" alt="Partner logo" />
            <img className="w-full h-[50px] md:h-[64px] object-contain" src="/images/Figure.webp" alt="Partner logo" />
            <img className="w-full h-[50px] md:h-[64px] object-contain" src="/images/5.png" alt="Partner logo" />
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="max-screen-wrapper py-[30px] md:py-[48px] my-[30px] md:my-[48px] font-[600] text-[#21222D] text-[24px] md:text-[30px] px-4 md:px-0">
        <div className="max-screen-inner flex flex-col lg:flex-row gap-[20px] md:gap-[30px]">
          <div className="flex-1 bg-[#F8F8F8] px-[15px] py-[20px] md:px-[15px] md:py-[30px]">
            <p className="uppercase text-left text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#0088DD] font-medium">
              our partners
            </p>
            <p className="text-left text-[24px] md:text-[30px] leading-[32px] md:leading-[47px] text-[#21222D] font-semibold max-w-[440px] mt-[12px] md:mt-[16px] mb-[10px]">
              We Are Trusted
            </p>

            <div>
              <p className="text-[14px] md:text-[16px] text-[#777777] font-normal font-poppins">
                At GCL, we understand the importance of cost-effective logistics solutions. That's why we offer{' '}
                <span className="text-[#DC3545] font-medium capitalize underline">
                  the cheap courier service in the UK
                </span>
                , through our strategic alliances with leading courier operators, carriers, and airlines worldwide,
                including{' '}
                <span className="text-[#DC3545] font-medium capitalize underline">
                  British Airways, DHL Express, CMA CGM, Virgin Atlantic, MAERSK
                </span>{' '}
                and <span className="text-[#DC3545] font-medium capitalize underline">Emirates</span>, allowing us to
                offer our customers a diverse range of logistics solutions.
                <br />
                <br />
                Our comprehensive services include Express Service, Customs Clearance, Air Freight, and Sea Freight, all
                designed to provide value without compromising on quality.
                <br />
                <br />
                Backed by our extensive network of trusted partners, we ensure that our cheap courier services in the UK
                meets your needs with efficiency, reliability, and customer satisfaction. Choose Global Corporate
                Logistics Limited for all your logistics needs and experience unmatched service excellence
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-y-[15px] md:gap-y-[20px] bg-white items-center justify-center p-[15px] md:p-0">
            <div className="flex flex-row flex-wrap items-center justify-center gap-[10px] md:gap-[15px]">
              <img
                className="w-[150px] md:w-[210px] h-[75px] md:h-[105px]"
                src="/images/Group-24.png.webp"
                alt="Partner logo"
              />
              <img
                className="w-[150px] md:w-[210px] h-[75px] md:h-[105px]"
                src="/images/Group-21.png.webp"
                alt="Partner logo"
              />
              <img
                className="w-[150px] md:w-[210px] h-[75px] md:h-[105px]"
                src="/images/Group-22.png.webp"
                alt="Partner logo"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-[10px] md:gap-[15px]">
              <img
                className="w-[150px] md:w-[210px] h-[75px] md:h-[105px]"
                src="/images/Group-23.png.webp"
                alt="Partner logo"
              />
              <img
                className="w-[150px] md:w-[210px] h-[75px] md:h-[105px]"
                src="/images/Group-25.png.webp"
                alt="Partner logo"
              />
              <img
                className="w-[150px] md:w-[210px] h-[75px] md:h-[105px]"
                src="/images/Group-26.png.webp"
                alt="Partner logo"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-screen-wrapper bg-[#1B4E64] relative h-[350px] md:h-[455px]">
        <img src="/images/bg-3.webp" alt="frame" className="absolute left-0 top-0 w-full h-full object-cover" />

        <div className="max-screen-inner h-full flex w-full items-center justify-center gap-[20px] md:gap-[30px] relative z-[10] flex-col px-4 md:px-0">
          <p className="text-white text-[28px] md:text-[42px] leading-[36px] md:leading-[50px] font-bold text-center max-w-[720px] mx-auto">
            Reach your destination 100% safe and on time
          </p>

          <p className="text-white text-[16px] md:text-[20px] font-normal text-center max-w-[872px] mx-auto">
            Get safe, on-time delivery with Global Corporate Logistics. Industry-leading expertise
          </p>

          <Button title="Get My Free Quote" height="50px" className="w-full md:w-auto" />
        </div>
      </div>

      {/* FAQS */}
      <div className="max-screen-wrapper py-[30px] md:py-[48px] my-[30px] md:my-[48px] font-[600] text-[#21222D] text-[24px] md:text-[30px] px-4 md:px-0">
        <div className="max-screen-inner">
          <div className="flex-1 mb-[24px] md:mb-[32px]">
            <p className="uppercase text-left text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#0088DD] font-medium">
              Have a question?
            </p>
            <p className="text-left text-[28px] md:text-[42px] leading-[36px] md:leading-[54px] text-[#21222D] font-semibold mt-[12px] md:mt-[16px] mb-[10px]">
              Frequently Asked Questions
            </p>

            <p className="text-[#777777] text-[14px] md:text-[16px] font-normal max-w-[831px]">
              Questions. Frequently asked ones. Plus our answers. That's how FAQs work. If you can't find what you're
              looking for, you can always send us an email with your enquiry.
            </p>
          </div>

          <FaqsPage />
        </div>
      </div>

      {/* CUSTOMERS */}
      <div className="max-screen-wrapper pb-[30px] md:pb-[48px] my-[30px] md:my-[48px] font-[600] text-[#21222D] text-[24px] md:text-[30px] px-4 md:px-0">
        <div className="max-screen-inner">
          <div className="flex-1 mb-[24px] md:mb-[32px]">
            <p className="uppercase text-center text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#0088DD] font-medium">
              testimonials
            </p>
            <p className="text-center text-[28px] md:text-[42px] leading-[36px] md:leading-[54px] capitalize text-[#21222D] font-semibold mt-[12px] md:mt-[16px] mb-[10px]">
              our customer says
            </p>
          </div>

          <div className="flex gap-[15px] md:gap-[22px] overflow-x-auto py-[60px] md:py-[100px] scrollbar-hide testimonials px-4">
            <Customer />
            <Customer />
            <Customer />
            <Customer />
          </div>
        </div>
      </div>
    </>
  );
}

const Customer = () => {
  return (
    <div className="shrink-0 w-[300px] md:w-[482px] h-[220px] md:h-[282px] border-[#CCCCCC] border-[1px] rounded-[8px] md:rounded-[10px] relative">
      <div className="absolute w-full h-[60px] md:h-[80px] top-0 mt-[-30px] md:mt-[-40px] left-0 flex justify-center">
        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] bg-gray-50 rounded-full border-[#CCCCCC] border-[1px]">
          <img src="/images/Ellipse-44.png.png" className="w-full h-full object-cover" alt="Customer" />
        </div>
      </div>

      <div className="text-center text-[#21222D] mt-[50px] md:mt-[60px]">
        <p className="text-[18px] md:text-[22px] font-[700] mx-auto">Daniel Mitchell</p>
        <p className="text-[12px] md:text-[14px] max-w-[280px] md:max-w-[340px] font-normal mx-auto">Chicago U.S</p>
        <p className="text-[12px] md:text-[14px] max-w-[280px] md:max-w-[340px] font-normal mx-auto mt-[8px] md:mt-[10px]">
          Lorem ipsum dolor sit amet consectetur. Ultricies odio tortor sed purus. Congue erat nisi ornare condimentum
          facilisis
        </p>
      </div>
    </div>
  );
};

export default Homepage;

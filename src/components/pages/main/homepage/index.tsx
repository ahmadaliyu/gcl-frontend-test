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

  console.log(countries,1112);
    console.log(cities, 661111);

  

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
        name: city.name,
        code: city.code,
        is_active: city.is_active,
      }));
      dispatch(setCities(transformedCities));
    }
  }, [countries, dispatch]);

  return (
    <>
      {/* HEADER */}
      <div className="max-screen-wrapper bg-[#1B4E64]  relative">
        <img src="/images/homepage-banner-1.webp" alt="frame" className="absolute left-0 top-0 w-full h-full" />

        <img src="/images/homepage-frame.png" alt="frame" className="absolute left-0 bottom-0" />
        <div className="max-screen-inner h-full flex min-h-[674px] w-full items-start  justify-between gap-[30px] relative z-[10] pt-[100px]">
          <div className="flex-1 h-full flex flex-col gap-[16px] ">
            <BlurFade delay={0.25} inView>
              <p className="text-white font-medium text-[18px] leading-[27px] uppercase">
                Simplified Shipping Solutions
              </p>
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <p className="text-white font-bold text-[42px] leading-[52px] mb-[60px] ">
                Global Freight Forwarding And Customs Clearance Services in Manchester, UK
              </p>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <Button title="Begin UK Import Readiness Quiz" variant="white" />
            </BlurFade>
          </div>
          <div className="flex-1 h-full">
            <BlurFade delay={0.25} inView>
              <GetAQuote />
            </BlurFade>
          </div>
        </div>
      </div>

      {/* BEYOND */}
      <div className="max-screen-wrapper bg-[#fff] py-[48px] ">
        <div className="max-screen-inner">
          <BlurFade delay={0.25} inView>
            <p className="text-[#0088DD] font-[700] text-[92px] leading-[122px] max-w-[1035px]">
              Beyond the Package, We Deliver Care
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#777777] text-[24px] leading-[36px] max-w-[968px] my-[16px]">
              We are a UK based freight forwarding and customs clearance company. We are here to help you with your
              logistics needs.
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#21222D] text-[18px] leading-[27px] mb-[15px]">VAT Number : 378986412</p>
            <p className="text-[#21222D] text-[18px] leading-[27px] mb-[15px]">EORI: GB 016120377000</p>
            <p className="text-[#21222D] text-[18px] leading-[27px] mb-[15px]">Registration Number: 07623919</p>
            <p className="text-[#21222D] text-[18px] leading-[27px] mb-[15px] ">BIFA membership: 3738</p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <div className="mt-[40px] mb-[56px]">
              <Button title="Read About Us" className="w-[311px]" />
            </div>
          </BlurFade>

          <div className="flex gap-[20px] justify-between">
            <BlurFade delay={0.1} inView>
              <img
                className="rounded-[24px] overflow-hidden w-[330px] h-[292px] object-cover"
                src="/images/lady_with_sweater.jpg.webp"
              />{' '}
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <img
                className="rounded-[24px] overflow-hidden w-[330px] h-[292px] object-cover"
                src="/images/oldman_with_present.jpg.webp"
              />{' '}
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <img
                className="rounded-[24px] overflow-hidden w-[330px] h-[292px] object-cover"
                src="/images/girl_looking_into_parcel.jpg.webp"
              />{' '}
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <img
                className="rounded-[24px] overflow-hidden w-[330px] h-[292px] object-cover"
                src="/images/girl_new_bicycle.jpg.webp"
              />{' '}
            </BlurFade>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-screen-wrapper bg-[#fff] py-[48px] ">
        <div className="max-screen-inner">
          <BlurFade delay={0.25} inView>
            <p className="uppercase text-center text-[18px] leading-[27px] text-[#0088DD] font-medium">Why Choose Us</p>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className=" text-center text-[30px] leading-[47px] text-[#0088DD] font-semibold max-w-[440px] mx-auto mt-[16px]">
              Safe and Faster Logistics Service Near You
            </p>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-[#777777] max-w-[1319px] mx-auto text-[16px]">
              Experience hassle-free logistics with Global Corporate Logistics (GCL), your trusted partner for {' '}
              <span className="text-[#DC3545] font-medium capitalize">freight forwarding</span>  and {' '}
              <span className="text-[#DC3545] font-medium capitalize">customs clearance solutions</span>! At GCL Parcel,
              we’re more than just a logistics provider; we’re committed to understanding your unique needs and
              delivering tailored solutions that drive success.
            </p>
          </BlurFade>

          <div className="flex gap-[20px] justify-between mt-[48px]">
            <BlurFade delay={0.1} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#02044A] border-[1px] border-[#02044A] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/message.png.webp"
                  className="w-[170px] h-[193px] top-0 right-[-15px] absolute object-contain"
                />
                <p className="text-white text-[24px] leading-[36px] font-[600] mb-[8px]">
                  World Wide <br />
                  Service{' '}
                </p>
                <p className="text-white text-[14px] leading-[25px] h-[125px]">
                  Our trusted network now spans to over 180 countries. Our partners share our dedication to the highest
                  standards of service and communication.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/star.png.webp"
                  className="w-[170px] h-[193px] top-[-20px] right-[-15px] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px] h-[69px] font-[600] mb-[8px]">
                  Fast & Reliable
                </p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[240px]">
                  We ensure that even the tightest of deadlines can be met with total peace of mind.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/Ebay__3_.png.webp"
                  className="w-[150px] h-[150px] top-0 right-0 absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px] h-[69px] font-[600] mb-[8px]">
                  Knowledge In <br />
                  Your Sector
                </p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[240px]">
                  GCL is proud to have extensive knowledge and experience in a wide range of sectors.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/Group_1.png.webp"
                  className="w-[150px] h-[150px] top-[-20px] right-[0] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px] h-[69px] font-[600] mb-[8px]">
                  Tracking Services
                </p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[240px]">
                  We have our own online track-and- trace system for 24/7 visibility of your shipments.
                </p>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={0.25} inView>
            <Button title="Get My Free Quote" variant="outlined-red" className="mx-auto mt-[48px]" />
          </BlurFade>
        </div>
      </div>

      {/* BENEFITS */}

      <div className="flex items-center justify-between mx-auto max-w-[876px] py-[21px] mb-[48px]">
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <img src="/icons/Benefit.png" className="w-[42px] h-[42px] object-contain" />
            <p className="text-[#02044A] text-[14px] font-medium text-center">State All Benefites</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <img src="/icons/Benefit-1.png" className="w-[42px] h-[42px] object-contain" />
            <p className="text-[#02044A] text-[14px] font-medium text-center">State All Benefites</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <img src="/icons/Benefit-2.png" className="w-[42px] h-[42px] object-contain" />
            <p className="text-[#02044A] text-[14px] font-medium text-center">State All Benefites</p>
          </div>
        </BlurFade>

        <div className="bg-[#E51520] rounded-[8px] h-[100px] w-[200px] flex flex-col items-center justify-center">
          <p className="text-white text-center text-[30px] leading-[47px] font-[600]">38+</p>
          <p className="text-white text-center text-[14px] font-[500]">Years Of Experience</p>
        </div>
      </div>

      {/* OUR UK WIDE SERVICES */}
      <div className="max-screen-wrapper bg-[#fff] py-[48px] ">
        <div className="max-screen-inner">
          <BlurFade delay={0.25} inView>
            <p className="uppercase text-center text-[18px] leading-[27px] text-[#0088DD] font-medium">
              our UK-wide services
            </p>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className=" text-center text-[30px] leading-[47px] text-[#21222D] font-semibold max-w-[440px] mx-auto mt-[16px] mb-[45px]">
              What We Provide
            </p>
          </BlurFade>

          <div className="flex max-w-[1118px] flex-wrap mx-auto gap-[25px] justify-center">
            <BlurFade delay={0.1} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px] ">
                <img
                  src="/images/Ebay__3_.png-5.webp"
                  className="w-[150px] h-[150px] top-[-10px] right-[0] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px]  font-[600] mb-[8px]">Air Freight</p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/Ebay__3_.png-1.webp"
                  className="w-[150px] h-[150px] top-[-10px] right-[0] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px]  font-[600] mb-[8px]">Sea Freight</p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/Ebay__3_.png-2.webp"
                  className="w-[150px] h-[150px] top-[-10px] right-[0] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px]  font-[600] mb-[8px]">Road Freight</p>

                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[280px] ">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/Ebay__3_.png-3.webp"
                  className="w-[150px] h-[150px] top-[-10px] right-[0] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px]  font-[600] mb-[8px]">UK Customer Clearance</p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="relative rounded-[16px] overflow-hidden w-[345px] h-[336px] bg-[#ffffff] border-[1px] border-[#CCD6DF] flex flex-col items-start justify-end p-[24px]">
                <img
                  src="/images/Ebay__3_.png-4.webp"
                  className="w-[150px] h-[150px] top-[-10px] right-[0] absolute object-contain"
                />
                <p className="text-[#3788D1] text-[24px] leading-[36px]  font-[600] mb-[8px]">Procurement</p>
                <p className="text-[#3788D1] text-[14px] leading-[25px]  h-[125px] max-w-[280px]">
                  Whatever your requirements, our relationships with all major airlines ensure we can offer a choice of
                  highly flexible solutions to meet your deadlines.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="max-screen-wrapper bg-[#F8F8F8] py-[48px] my-[48px] font-[600] text-[#21222D] text-[30px]">
        <div className="max-screen-inner">
          <p className="text-center mx-auto">
            Global Corporate Logistics <br />
            Prioritizes Seamless Integrations
          </p>
          <div className="mx-auto max-w-[1320px] flex items-center justify-between mt-[48px]">
            <img className="w-[264px] h-[64px] object-contain" src="/images/Figure_1.webp" />
            <img className="w-[264px] h-[64px] object-contain" src="/images/5_1.webp" />
            <img className="w-[264px] h-[64px] object-contain" src="/images/5.webp" />
            <img className="w-[264px] h-[64px] object-contain" src="/images/Figure.webp" />
            <img className="w-[264px] h-[64px] object-contain" src="/images/5.png" />
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="max-screen-wrapper  py-[48px] my-[48px] font-[600] text-[#21222D] text-[30px]">
        <div className="max-screen-inner flex">
          <div className="flex-1 bg-[#F8F8F8] px-[15px] py-[30px]">
            <p className="uppercase text-left text-[18px] leading-[27px] text-[#0088DD] font-medium">our partners</p>
            <p className=" text-left text-[30px] leading-[47px] text-[#21222D] font-semibold max-w-[440px] mt-[16px] mb-[10px]">
              We Are Trusted
            </p>

            <div>
              <p className="text-[16px] text-[#777777] font-normal font-poppins">
                At GCL, we understand the importance of cost-effective logistics solutions. That’s why we offer {' '}
                <span className="text-[#DC3545] font-medium capitalize underline">
                  the cheap courier service in the UK
                </span>
                , through our strategic alliances with leading courier operators, carriers, and airlines worldwide,
                including 
                <span className="text-[#DC3545] font-medium capitalize underline">
                  British Airways, DHL Express, CMA CGM, Virgin Atlantic, MAERSK
                </span>
                 and <span className="text-[#DC3545] font-medium capitalize underline">Emirates</span>, allowing us to
                offer our customers a diverse range of logistics solutions.
                <br />
                <br />
                Our comprehensive services include Express Service, Customs Clearance, Air Freight, and Sea Freight, all
                designed to provide value without compromising on quality.
                <br />
                <br />
                Backed by our extensive network of trusted partners, we ensure that our cheap courier services in the UK
                meets your needs with efficiency, reliability, and customer satisfaction. Choose Global Corporate
                Logistics Limited for all your logistics needs and experience unmatched service excellence
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-y-[20px] bg-white items-center justify-center">
            <div className="flex flex-row flex-wrap items-center justify-center ">
              <img className="w-[210px] h-[105px]" src="/images/Group-24.png.webp" />
              <img className="w-[210px] h-[105px]" src="/images/Group-21.png.webp" />
              <img className="w-[210px] h-[105px]" src="/images/Group-22.png.webp" />
            </div>
            <div className="flex flex-wrap items-center justify-center ">
              <img className="w-[210px] h-[105px]" src="/images/Group-23.png.webp" />
              <img className="w-[210px] h-[105px]" src="/images/Group-25.png.webp" />
              <img className="w-[210px] h-[105px]" src="/images/Group-26.png.webp" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-screen-wrapper bg-[#1B4E64]  relative h-[455px]">
        <img src="/images/bg-3.webp" alt="frame" className="absolute left-0 top-0 w-full h-full" />

        <div className="max-screen-inner h-full flex w-full items-center  justify-center gap-[30px] relative z-[10] flex-col">
          <p className="text-white text-[42px] leading-[50px] font-bold text-center max-w-[720px] mx-auto">
            Reach your destination 100% safe and on time
          </p>

          <p className="text-white text-[20px] font-normal text-center max-w-[872px] mx-auto">
            Get safe, on-time delivery with Global Corporate Logistics. Industry-leading expertise
          </p>

          <Button title="Get My Free Quote" height="62px" />
        </div>
      </div>

      {/* PARTNERS */}
      <div className="max-screen-wrapper  py-[48px] my-[48px] font-[600] text-[#21222D] text-[30px]">
        <div className="max-screen-inner">
          <div className="flex-1 mb-[32px]">
            <p className="uppercase text-left text-[18px] leading-[27px] text-[#0088DD] font-medium">
              Have a question?
            </p>
            <p className=" text-left text-[42px] leading-[54px] text-[#21222D] font-semibold  mt-[16px] mb-[10px]">
              Frequently Asked Questions
            </p>

            <p className="text-[#777777] text-[16px] font-normal max-w-[831px]">
              Questions. Frequently asked ones. Plus our answers. That’s how FAQs work. If you can’t find what you’re
              looking for, you can always send us an email with your enquiry.
            </p>
          </div>

          <FaqsPage />
        </div>
      </div>

      {/* CUSTOMERS */}
      <div className="max-screen-wrapper  pb-[48px] my-[48px] font-[600] text-[#21222D] text-[30px]">
        <div className="max-screen-inner">
          <div className="flex-1 mb-[32px]">
            <p className="uppercase text-center text-[18px] leading-[27px] text-[#0088DD] font-medium">testimonials</p>
            <p className=" text-center text-[42px] leading-[54px] capitalize text-[#21222D] font-semibold  mt-[16px] mb-[10px]">
              our customer says
            </p>
          </div>

          <div className="flex gap-[22px] overflow-x-auto py-[100px] scrollbar-hide testimonials">
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
    <div className="shrink-0 w-[482px] h-[282px] border-[#CCCCCC] border-[1px] rounded-[10px] relative">
      <div className="absolute w-full h-[80px] top-0 mt-[-40px] left-0 flex justify-center ">
        <div className=" w-[80px] h-[80px] bg-gray-50 rounded-full border-[#CCCCCC] border-[1px]">
          <img src="/images/Ellipse-44.png.png" className="w-full h-f" />
        </div>
      </div>

      <div className="text-center text-[#21222D] mt-[60px]">
        <p className="text-[22px font-[700] mx-auto">Daniel Mitchell</p>
        <p className="text-[14px] max-w-[340px] font-normal mx-auto">Chicago U.S</p>
        <p className="text-[14px] max-w-[340px] font-normal mx-auto mt-[10px]">
          Lorem ipsum dolor sit amet consectetur. Ultricies odio tortor sed purus. Congue erat nisi ornare condimentum
          facilisis
        </p>
      </div>
    </div>
  );
};

export default Homepage;

import React from 'react';
import SectionHeader from '@/components/Layout/SectionHeader';

const CompanyTimeline = () => {
  const timelineData = [
    {
      year: "2023 - Foundation",
      description: "COPYm was founded with a vision to democratize access to premium entitlement opportunities.",
      image: "/images/img_image_845.png"
    },
    {
      year: "2024 - Platform Launch",
      description: "Our revolutionary RWA tokenization platform goes live, enabling fractional entitlement.",
      image: "/images/img_image_844.png"
    },
    {
      year: "2025 - Global Expansion",
      description: "Expanding our reach globally, making premium investments accessible worldwide.",
      image: "/images/img_stylized_globe.png"
    }
  ];

  return (
    <section className="w-full relative">
      {/* Background Image */}
      <img
        src="/images/img_ellipse_960.png"
        alt="Timeline Background"
        className="absolute top-0 left-0 w-[8%] h-auto object-cover"
      />
      <div className="w-full bg-background-primary mt-16 sm:mt-20 md:mt-24 lg:mt-[-134px]">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 md:px-10 lg:px-[46px] py-6 sm:py-8 md:py-10 lg:py-[46px]">

          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-[70px] justify-start items-center w-full h-full">

            {/* Section Title */}
            <SectionHeader
              title="Company Timeline"
              alignment="center"
            />

            {/* Timeline Container */}
            <div className="relative flex flex-col justify-center items-center w-full lg:w-[70%] self-end">

              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-6 md:left-8 lg:left-[366px] top-0 w-[6px] h-[364px] sm:h-[485px] md:h-[606px] lg:h-[728px] bg-[linear-gradient(64deg,#000000_0%,#33ca92_50%,_#ffffff_100%)] shadow-[0px_4px_9px_#888888ff]"></div>

              {/* Timeline Items */}
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[28px] w-full">

                {/* 2023 Foundation */}
                <div className="flex flex-col lg:flex-row justify-start items-center w-full lg:w-[1256px] mt-2 lg:mt-[10px] mb-64 sm:mb-80 md:mb-96 lg:mb-[542px]">
                  <div className="flex flex-col lg:flex-row justify-start items-center w-full lg:w-[40%]">
                    <img
                      src={timelineData?.[0]?.image}
                      alt="2023 Foundation"
                      className="w-[87px] sm:w-[116px] md:w-[145px] lg:w-[174px] h-[87px] sm:h-[116px] md:h-[145px] lg:h-[174px] object-cover self-center"
                    />
                    <h3 className="text-[16px] sm:text-[21px] md:text-[26px] lg:text-[32px] font-semibold leading-[29px] sm:leading-[38px] md:leading-[46px] lg:leading-[57px] text-center text-text-accent w-full lg:w-[58%] mt-4 lg:mt-[42px] ml-0 lg:ml-[-8px]">
                      {timelineData?.[0]?.year}
                    </h3>
                  </div>

                  <div className="flex flex-row justify-center items-center w-full lg:w-[60%] self-end mb-0 lg:mb-[34px] mt-4 lg:mt-0">
                    <div className="flex flex-col justify-start items-center w-[94%]">
                      <p className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[22px] sm:leading-[29px] md:leading-[36px] lg:leading-[43px] text-left text-text-white w-auto">
                        {timelineData?.[0]?.description}
                      </p>
                      <p className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[22px] sm:leading-[29px] md:leading-[36px] lg:leading-[43px] text-left text-text-white w-auto -mt-11 sm:-mt-14 md:-mt-18 lg:-mt-[86px]">
                        {timelineData?.[0]?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2024 Platform Launch */}
                <div className="flex flex-col lg:flex-row justify-center items-start w-full">
                  <img
                    src={timelineData?.[1]?.image}
                    alt="2024 Platform Launch"
                    className="w-[80px] sm:w-[107px] md:text-[133px] lg:w-[160px] h-[80px] sm:h-[107px] md:h-[133px] lg:h-[160px] object-cover self-center"
                  />
                  <h3 className="text-[16px] sm:text-[21px] md:text-[26px] lg:text-[32px] font-semibold leading-[29px] sm:leading-[38px] md:leading-[46px] lg:leading-[57px] text-left text-text-accent w-full lg:w-[24%] mt-2 lg:mt-[10px] ml-0 lg:ml-[20px]">
                    {timelineData?.[1]?.year}
                  </h3>
                  <p className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[22px] sm:leading-[29px] md:leading-[36px] lg:leading-[43px] text-left text-text-white w-full lg:w-[58%] mt-4 lg:mt-[20px] ml-0 lg:ml-[54px]">
                    {timelineData?.[1]?.description}
                  </p>
                </div>

                {/* 2025 Global Expansion */}
                <div className="flex flex-col lg:flex-row justify-start items-start w-full mt-4 lg:mt-0">
                  <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-[44%] px-0 lg:px-[30px] self-center">
                    <img
                      src={timelineData?.[2]?.image}
                      alt="2025 Global Expansion"
                      className="w-[77px] sm:w-[103px] md:w-[128px] lg:w-[154px] h-[77px] sm:h-[103px] md:h-[128px] lg:h-[154px] object-cover"
                    />
                    <h3 className="text-[16px] sm:text-[21px] md:text-[26px] lg:text-[32px] font-semibold leading-[29px] sm:leading-[38px] md:leading-[46px] lg:leading-[57px] text-left text-text-accent w-full lg:w-[58%] mt-4 lg:mt-0 ml-0 lg:ml-[18px]">
                      {timelineData?.[2]?.year}
                    </h3>
                  </div>

                  <p className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[22px] sm:leading-[29px] md:leading-[36px] lg:leading-[43px] text-left text-text-white w-full lg:w-[56%] mt-4 lg:mt-[24px]">
                    {timelineData?.[2]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;
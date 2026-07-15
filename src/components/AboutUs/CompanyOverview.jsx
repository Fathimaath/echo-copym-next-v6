import React from 'react';
import SectionHeader from '@/components/Layout/SectionHeader';
import Image from '@/components/Image';

const CompanyOverview = () => {
  return (
    <section className="w-full bg-background-primary">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[56px] py-12 sm:py-16 md:py-20 lg:py-[62px] mr-0 lg:mr-[8px]">
        <div className="flex flex-col items-center justify-start w-full gap-3 lg:gap-[12px]">

          {/* Section Title */}
          <SectionHeader
            title="Company Overview"
            alignment="center"
          />

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row justify-start items-center w-full mr-0 lg:mr-[22px]">

            {/* Left Side - Image */}
            <div className="flex flex-col items-center justify-start w-full lg:w-[42%] h-auto shadow-[0px_4px_89px_#888888ff] bg-background-accent-light rounded-[167px] lg:rounded-[334px] p-6 sm:p-8 md:p-10 lg:p-[38px] mb-8 lg:mb-0">
              <div className="relative w-full max-w-[296px] lg:max-w-[592px] h-[296px] lg:h-[592px] mx-auto">
                <Image
                  src="/images/img_image_843.png"
                  alt="Company Overview Visual"
                  className="absolute inset-0 w-full h-full object-cover rounded-[148px] lg:rounded-[296px]"
                />
                <Image
                  src="/images/img_image_843.png"
                  alt="Company Innovation"
                  className="absolute inset-0 w-full h-full object-cover rounded-[148px] lg:rounded-[296px]"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-start items-end w-full lg:w-[58%] lg:ml-[1px]">

              {/* Main Description */}
              <p className="text-xs sm:text-[13px] md:text-[16px] lg:text-[20px] font-normal leading-[18px] sm:leading-[23px] md:leading-[29px] lg:leading-[36px] text-left capitalize text-text-white w-full lg:w-[86%]">
                COPYm is a cutting-edge Real World Asset (RWA) tokenization platform designed to transform how the world perceives and manages entitlement.
                <br /><br />
                We bridge tangible value and digital innovation, enabling physical assets — from real estate and commodities to collectibles and intellectual property — to be securely digitized, fractionalized, and traded on a global scale.
              </p>

              {/* Why We Exist Section */}
              <h3 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-[29px] sm:leading-[36px] md:leading-[46px] lg:leading-[57px] text-center capitalize text-text-secondary w-auto mt-8 sm:mt-12 md:mt-16 lg:mt-[56px]">
                Why We Exist
              </h3>

              <p className="text-xs sm:text-[13px] md:text-[16px] lg:text-[20px] font-normal leading-[18px] sm:leading-[23px] md:leading-[29px] lg:leading-[36px] text-left capitalize text-text-white w-full lg:w-[86%] mt-2 sm:mt-4 lg:mt-[10px]">
                The traditional asset market is fragmented, slow, and geographically restricted. COPYm is here to change that.
                <br /><br />
                By merging blockchain technology with real-world compliance, we create a unified marketplace where assets can be exchanged instantly, securely, and without borders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
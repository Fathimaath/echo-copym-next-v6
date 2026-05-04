import React from 'react';

const CustomSvgComponent = ({ width = 160, height = 90, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M1 88.2773L74.8267 10.0898C80.3664 4.22283 88.1 0.92921 96.1688 1.00054L158.451 1.55115"
        stroke="url(#paint0_linear_1674_840)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1674_840"
          x1="79.7256"
          y1="1.55127"
          x2="79.7256"
          y2="88.2775"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#0D2F72" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CustomSvgComponent;
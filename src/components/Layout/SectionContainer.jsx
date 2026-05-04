import React from 'react';

const SectionContainer = ({
  children,
  className = '',
  padding = 'py-10',
  bgColor = 'bg-white',
  maxWidth = 'max-w-7xl',
  id = null,
  style = null
}) => {
  return (
    <section
      id={id}
      className={`
        w-full
        ${bgColor}
        ${padding}
      `}
      style={style}
    >
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 md:px-8 lg:px-20`}>
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
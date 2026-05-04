import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { quality } from '@cloudinary/url-gen/actions/delivery';

// Initialize Cloudinary with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name-here'
  }
});

/**
 * Cloudinary Image Component with AVIF support
 * Automatically delivers images in AVIF format when supported
 */
const CloudinaryImage = ({
  publicId,
  alt,
  className = '',
  style,
  transformations = [],
  ...props
}) => {
  // Create image instance
  const image = cld.image(publicId);

  // Apply transformations
  transformations.forEach(transform => {
    image.addTransformation(transform);
  });

  // Deliver in AVIF format with auto quality
  image.delivery(format('auto')).delivery(quality('auto'));

  return (
    <AdvancedImage
      cldImg={image}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default CloudinaryImage;
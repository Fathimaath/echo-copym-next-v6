import React from 'react';

/**
 * AVIF-compatible Image Component with fallback support
 * This component uses the picture element to provide format fallbacks without flickering
 * NOTE: For this to work, you need to have the AVIF/WebP versions of your images in the same location
 */
const Image = ({
  src,
  alt,
  className = '',
  style,
  onLoad,
  onError,
  ...props
}) => {
  // Handle Next.js StaticImageData object (from 'import' statements)
  const normalizedSrc = typeof src === 'object' && src !== null ? src.src : src;

  // If no src, show nothing
  if (!normalizedSrc) {
    return (
      <img
        src=""
        alt={alt}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  // For external URLs (http://, https://, //), don't try AVIF/WebP conversion
  // since those files won't exist on the external server
  const isExternalUrl = /^https?:\/\//i.test(normalizedSrc) || normalizedSrc.startsWith('//');

  if (isExternalUrl) {
    return (
      <img
        src={normalizedSrc}
        alt={alt}
        className={className}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }

  // Generate AVIF version of the image path
  const getAvifSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    // Replace the file extension with .avif
    return originalSrc.replace(/\.(png|jpe?g|gif|webp)$/i, '.avif');
  };

  // Generate WebP version of the image path
  const getWebpSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    // Replace the file extension with .webp
    return originalSrc.replace(/\.(png|jpe?g|gif)$/i, '.webp');
  };

  // Check if the image is a type that has AVIF/WebP alternatives
  const hasAlternativeFormats = /\.(png|jpe?g|gif)$/i.test(normalizedSrc);

  if (hasAlternativeFormats) {
    const avifSrc = getAvifSrc(normalizedSrc);
    const webpSrc = getWebpSrc(normalizedSrc);

    return (
      <picture>
        {/* AVIF format - highest priority */}
        <source
          srcSet={avifSrc}
          type="image/avif"
        />

        {/* WebP format - fallback */}
        <source
          srcSet={webpSrc}
          type="image/webp"
        />

        {/* Original format - final fallback */}
        <img
          src={normalizedSrc}
          alt={alt}
          className={className}
          style={style}
          onLoad={onLoad}
          onError={onError}
          {...props}
        />
      </picture>
    );
  } else {
    // If it's not an image type that typically has AVIF/WebP alternatives, just return the img tag
    return (
      <img
        src={normalizedSrc}
        alt={alt}
        className={className}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }
};

export default Image;
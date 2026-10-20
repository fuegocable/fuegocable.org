import React, { useEffect, useRef, ReactNode, cloneElement, Children } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

interface PhotoSwipeGalleryProps {
  children: ReactNode;
}

export default function PhotoSwipeGallery({ children }: PhotoSwipeGalleryProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: containerRef.current,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
    };
  }, []);

  const wrappedChildren = Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const imgProp = child.props.img;
    let imgSrc: string;
    let imgWidth = 1200;
    let imgHeight = 800;
    let thumbnailSrc: string | undefined;

    if (typeof imgProp === 'string') {
      imgSrc = imgProp;
    } else if (imgProp?.src) {
      // Use images array if available
      if (imgProp.src.images && Array.isArray(imgProp.src.images) && imgProp.src.images.length > 0) {
        const images = imgProp.src.images;
        // Find largest image for modal
        const largestImage = images.reduce((max, img) => (img.width > max.width ? img : max), images[0]);
        imgSrc = largestImage.path;
        imgWidth = largestImage.width;
        imgHeight = largestImage.height;

        // Find smallest image > 600px for thumbnail
        const thumbnailImage = images
          .filter(img => img.width > 600)
          .reduce((min, img) => (img.width < min.width ? img : min), images[images.length - 1]);
        
        if (thumbnailImage) {
          thumbnailSrc = thumbnailImage.path;
        }
      } else {
        // Fallback to src.src
        imgSrc = imgProp.src.src;
        imgWidth = imgProp.src.width || 1200;
        imgHeight = imgProp.src.height || 800;
      }
    } else if (imgProp?.default) {
      imgSrc = imgProp.default;
    } else {
      imgSrc = '';
    }

    // Clone child with thumbnail for display, use large image for modal
    const childWithThumbnail = thumbnailSrc
      ? cloneElement(child, { img: thumbnailSrc })
      : child;

    return (
      <a
        href={imgSrc}
        data-pswp-width={imgWidth}
        data-pswp-height={imgHeight}
        style={{ display: 'block' }}
      >
        <div
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {childWithThumbnail}
        </div>
      </a>
    );
  });

  return (
    <div ref={containerRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
      {wrappedChildren}
    </div>
  );
}

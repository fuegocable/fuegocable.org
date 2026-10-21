import React, { useEffect, useRef, ReactNode, cloneElement, Children } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { PhotoSwipeOptions } from 'photoswipe';

interface PhotoSwipeGalleryProps {
  children: ReactNode;
  containerClassName?: string;
  photoSwipeOptions?: PhotoSwipeOptions;
}

export default function PhotoSwipeGallery({ children, photoSwipeOptions, containerClassName }: PhotoSwipeGalleryProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: containerRef.current,
      children: 'a',
      showHideAnimationType: 'none',
      zoomAnimationDuration: false,
      pswpModule: () => import('photoswipe'),
      ...photoSwipeOptions
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
    let imgSrc = "";
    let imgWidth = 1200;
    let imgHeight = 800;

    if (typeof imgProp === 'string') {
      imgSrc = imgProp;
    } else if (imgProp?.default?.formats && imgProp?.default?.formats[0] && Array.isArray(imgProp.default.formats[0].srcSet) && imgProp.default.formats[0].srcSet.length > 0) {
      const images = imgProp.default.formats[0].srcSet;
      const largestImage = images.reduce((max, img) => (img.width > max.width ? img : max), images[0]);
      imgSrc = largestImage.path;
      imgWidth = largestImage.width;
      imgHeight = largestImage.height;
    }

    return (
      <a
        href={imgSrc}
        data-pswp-width={imgWidth}
        data-pswp-height={imgHeight}
        style={{ display: 'block' }}
        className={"photo-swipe-gallery-item"}
      >
        <div
          style={{
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {child}
        </div>
      </a>
    );
  });

  return (
    <div ref={containerRef} className={containerClassName}>
      {wrappedChildren}
    </div>
  );
}

import React from 'react';

import { Image as Img } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
const ImageLoad = React.memo(({ src, placeholder, alt = '', ...props }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(placeholder);
  const imgRef = useRef(null);

  useEffect(() => {
    imgRef.current = true;
    if (imgRef.current) {
      // start loading original image
      const imageToLoad = new Image();
      imageToLoad.src = src;
      imageToLoad.onload = () => {
        // When image is loaded replace the src and set loading to false
        setLoading(false);
        updateSrc(src);
      };
    }
  }, [src]);

  return (
    <Img
      src={currentSrc}
      style={{
        opacity: loading ? 0.5 : 1,
        transition: 'opacity .15s linear'
      }}
      alt={alt}
      {...props}
    />
  );
});

export default ImageLoad;

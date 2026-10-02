/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, ...rest } = props;
  // Track which source failed instead of mirroring `src` into state, so the
  // rendered source is always derived during render (no setState in effects).
  const [erroredSrc, setErroredSrc] = useState(null);
  const imgSrc = erroredSrc === src ? fallback : src;

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setErroredSrc(src);
      }}
    />
  );
};

export default ImageFallback;

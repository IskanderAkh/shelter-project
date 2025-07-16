import React, { useRef, useEffect, useState } from 'react';
import './Magnifier.scss'; // Ensure you have the styles in this file

const Magnifier = ({ src, zoom }) => {
  const imgRef = useRef(null);
  const glassRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const img = imgRef.current;
    const glass = glassRef.current;

    if (!img || !glass) return;

    const bw = 3;
    const w = glass.offsetWidth / 2;
    const h = glass.offsetHeight / 2;

    const moveMagnifier = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x;
      let y = pos.y;

      if (x > img.width - w / zoom) x = img.width - w / zoom;
      if (x < w / zoom) x = w / zoom;
      if (y > img.height - h / zoom) y = img.height - h / zoom;
      if (y < h / zoom) y = h / zoom;

      glass.style.left = `${x - w}px`;
      glass.style.top = `${y - h}px`;
      glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${y * zoom - h + bw}px`;
    };

    const getCursorPos = (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.pageX - rect.left - window.pageXOffset;
      const y = e.pageY - rect.top - window.pageYOffset;
      return { x, y };
    };

    img.addEventListener('mousemove', moveMagnifier);
    glass.addEventListener('mousemove', moveMagnifier);
    img.addEventListener('touchmove', moveMagnifier);
    glass.addEventListener('touchmove', moveMagnifier);

    return () => {
      img.removeEventListener('mousemove', moveMagnifier);
      glass.removeEventListener('mousemove', moveMagnifier);
      img.removeEventListener('touchmove', moveMagnifier);
      glass.removeEventListener('touchmove', moveMagnifier);
    };
  }, [zoom, loaded]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="overflow-hidden relative w-full h-auto object-cover">
      <img ref={imgRef} src={src} alt="Magnifiable" onLoad={handleImageLoad} className="w-full object-cover" />
      <div
        ref={glassRef}
        className="img-magnifier-glass absolute pointer-events-none border border-black rounded-full"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: loaded ? `${imgRef.current.width * zoom}px ${imgRef.current.height * zoom}px` : '0 0',
        }}
      ></div>
    </div>
  );
};

export default Magnifier;

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function VideoBackground({ src, poster, className = '', style }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay blocked, handle gracefully
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          // Autoplay blocked
        });
      });
    }

    return () => {
      // Cleanup is handled by hls.js automatically
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}

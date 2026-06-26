'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Loader.module.css';

export default function Loader() {
    const [loading, setLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const pathname = usePathname();

    // Reset and play on pathname changes (page transitions)
    useEffect(() => {
        setLoading(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(err => console.log("Video play interrupted:", err));
        }

        // Auto-dismiss after 2.5 seconds (trimming execution window)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className={`${styles.loaderWrapper} ${!loading ? styles.hidden : ''}`}>
            <video
                ref={videoRef}
                src="/yoraloader2.mp4"
                autoPlay
                muted
                playsInline
                className={styles.videoLoader}
            />
        </div>
    );
}

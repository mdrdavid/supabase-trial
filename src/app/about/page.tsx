'use client';
import { useEffect, useState } from 'react';

import ImageComponent from '@/components/ImageComponent/ImageComponent';
import OurHistory from '@/components/OurHistory/OurHistory';
import WhoWeAre from '@/components/Who-we-are/WhoWeAre';
import ngo1 from '../../../public/ngo1.jpg';
import ngo2 from '../../../public/ngo2.jpg';
import ngo3 from '../../../public/ngo3.jpg';
import ngo4 from '../../../public/ngo4.jpg';
import ngo5 from '../../../public/ngo5.jpg';
import Image from 'next/image';

export default function About() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        { src: ngo1, alt: 'Image 15', width: 841, height: 50 },
        { src: ngo2, alt: 'Image 15', width: 841, height: 50 },
        { src: ngo3, alt: 'Image 27', width: 841, height: 50 },
        { src: ngo4, alt: 'Image 29', width: 841, height: 50 },
        { src: ngo5, alt: 'Image 23', width: 841, height: 50 },
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentImage, images.length]);
    return (
        <div className="flex flex-col justify-between container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-[10px] sm:gap-[100px]">
                <OurHistory />
                <div className="flex-1">
                    <Image
                        src={images[currentImage]?.src}
                        alt={images[currentImage]?.alt}
                        width={images[currentImage]?.width}
                        height={images[currentImage]?.height}
                        className="w-[100%] h-[550px] object-cover"
                    />
                    {/* <ImageComponent
                        src={images[currentImage]?.src}
                        alt={images[currentImage]?.alt}
                        width={images[currentImage]?.width}
                        height={images[currentImage]?.height}
                        className="w-[100%] h-[550px] object-cover"
                    /> */}
                </div>
            </div>
            <WhoWeAre />
        </div>
    );
}

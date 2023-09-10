'use client';
import { useEffect, useState } from 'react';

import ImageText from '@/components/ImageText/ImageText';
import Image from 'next/image';
import ngo3 from '../../../public/ngo3.jpg';
import p2 from '../../../public/p2.jpg';
import p3 from '../../../public/p3.jpg';
import p4 from '../../../public/p4.jpg';
import ngo5 from '../../../public/ngo5.jpg';
import Programmes from '@/components/SocialProgrammes/SocialProgrammes';

function OurProgrammes() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        { src: ngo3, alt: 'Image 15', width: 841, height: 50 },
        { src: p2, alt: 'Image 15', width: 841, height: 50 },
        { src: p3, alt: 'Image 27', width: 841, height: 50 },
        { src: p4, alt: 'Image 29', width: 841, height: 50 },
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
            <div className="relative">
                <Image
                    src={images[currentImage]?.src}
                    alt={images[currentImage]?.alt}
                    width={images[currentImage]?.width}
                    height={images[currentImage]?.height}
                    className="w-[100%] h-[460px] object-cover relative "
                />
                <ImageText title="Our Programmes" />
            </div>
            <Programmes />
        </div>
    );
}

export default OurProgrammes;

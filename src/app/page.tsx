'use client';
import { useEffect, useState } from 'react';

import ImageText from '@/components/ImageText/ImageText';
import MissionVision from '@/components/Mission-vision/MisionVision';
import Programs from '@/components/Programs/Programs';
import WhoWeAre from '@/components/Who-we-are/WhoWeAre';
import Image from 'next/image';
import ngo1 from '../../public/ngo1.jpg';
import ngo2 from '../../public/ngo2.jpg';
import ngo3 from '../../public/ngo3.jpg';
import ngo4 from '../../public/ngo4.jpg';
import ngo5 from '../../public/ngo5.jpg';

function Home() {
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
            <div className="relative">
                <Image
                    src={images[currentImage]?.src}
                    alt={images[currentImage]?.alt}
                    width={images[currentImage]?.width}
                    height={images[currentImage]?.height}
                    // className="w-[100%] h-[460px] object-cover relative filter grayscale-[100%]"
                    className="w-[100%] h-[460px] object-cover relative"
                />
                <ImageText
                    title="Image Text"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate, nulla ac ultricies mattis"
                />
            </div>
            <MissionVision />
            <WhoWeAre />
            <Programs />
        </div>
    );
}

export default Home;

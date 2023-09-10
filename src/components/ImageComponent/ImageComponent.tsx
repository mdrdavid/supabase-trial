import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageComponentProps {
    src: StaticImageData;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
    src,
    alt,
    width,
    height,
    className,
}) => {
    return (
        <div className={className}>
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    );
};

export default ImageComponent;

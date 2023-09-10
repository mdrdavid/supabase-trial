'use client';
import Image from 'next/image';

import { socialMedia } from '../../constants/links';

type Props = {};

function SocialContacts({}: Props) {
    return (
        <div>
            <div className="flex flex-row justify-center md:mt-0 mt-3">
                {socialMedia.map((social: any, index: any) => (
                    <Image
                        key={social.id}
                        src={social.icon}
                        alt={social.id}
                        className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                            index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
                        }`}
                        onClick={() => window.open(social.link)}
                    />
                ))}
            </div>
        </div>
    );
}
export default SocialContacts;

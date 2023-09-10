import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ngo1 from '../../../public/ngo1.jpg';
import ngo2 from '../../../public/ngo2.jpg';
import ngo3 from '../../../public/ngo3.jpg';
import ngo4 from '../../../public/ngo4.jpg';
import ngo5 from '../../../public/ngo5.jpg';

const Programmes: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 rounded-lg">
            <div className="col-span-1 relative overflow-hidden max-w-[400px]">
                <Link href="/services/education">
                    <Image
                        src={ngo1}
                        alt="Programme 1"
                        width={400}
                        height={300}
                        className="w-[400px] h-[300px] object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                </Link>

                <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] text-white">
                    <h2 className="px-4 py-2 text-[#fff] font-semibold">
                        Education
                    </h2>
                </div>
            </div>

            <div className="col-span-1 relative overflow-hidden max-w-[400px]">
                <Image
                    src={ngo2}
                    alt="Programme 2"
                    width={400}
                    height={300}
                    className="w-[400px] h-[300px] object-cover transition-transform duration-300 transform hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] text-white">
                    <h2 className="px-4 py-2 text-[#fff] font-semibold">
                        Health
                    </h2>
                </div>
            </div>
            <div className="col-span-1 relative overflow-hidden max-w-[400px]">
                <Image
                    src={ngo3}
                    alt="Programme 3"
                    width={400}
                    height={300}
                    className="w-[400px] h-[300px] object-cover transition-transform duration-300 transform hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] text-white ">
                    <h2 className="px-4 py-2 text-[#fff] font-semibold">
                        Sanitation and Hygiene
                    </h2>
                </div>
            </div>
            <div className="col-span-1 relative overflow-hidden max-w-[400px]">
                <Image
                    src={ngo4}
                    alt="Programme 4"
                    width={400}
                    height={300}
                    className="w-[400px] h-[300px] object-cover transition-transform duration-300 transform hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] text-white">
                    <h2 className="px-4 py-2 text-[#fff] font-semibold">
                        Youth Skilling
                    </h2>
                </div>
            </div>
            <div className="col-span-1 relative overflow-hidden max-w-[400px]">
                <Image
                    src={ngo4}
                    alt="Programme 5"
                    width={400}
                    height={300}
                    className="w-[400px] h-[300px] object-cover transition-transform duration-300 transform hover:scale-110 "
                />

                <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] text-white">
                    <h2 className="px-4 py-2 text-[#fff] font-semibold">
                        Family Empowerment
                    </h2>
                </div>
            </div>
            <div className="col-span-1 relative overflow-hidden max-w-[400px]">
                <Image
                    src={ngo5}
                    alt="Programme 6"
                    width={400}
                    height={300}
                    className="w-[400px] h-[300px] object-cover transition-transform duration-300 transform hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.5)] ">
                    <h2 className="px-4 py-2 text-[#fff] font-semibold">
                        Economic Empowerment
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Programmes;

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ngo1 from '../../../public/ngo1.jpg';
import ngo2 from '../../../public/ngo2.jpg';
import ngo3 from '../../../public/ngo3.jpg';

const ProjectCategory: React.FC = () => {
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

                <div className=" w-full bg-[#fff] text-white">
                    <h2 className="px-4 py-2 text-[#000] text-[20px] font-semibold">
                        School Infrastructure
                    </h2>
                    <p className="text-[18px] font-light text-justify p-4 text-[#000]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed vulputate, nulla ac ultricies mattis, odio urna
                        consectetur est, vitae lacinia risus risus ac neque.
                        <br />
                        Praesent volutpat, turpis sed pulvinar suscipit, lectus
                        ligula commodo nisl, et cursus massa nulla eu felis.
                        Morbi auctor, sem nec dignissim rutrum, justo urna
                        venenatis urna, nec gravida
                    </p>
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

                <div className="w-full bg-[#fff] text-white">
                    <h2 className="px-4 py-2 text-[#000] text-[20px] font-semibold">
                        Scholarships
                    </h2>
                    <p className="text-[18px] font-light text-justify p-4 text-[#000]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed vulputate, nulla ac ultricies mattis, odio urna
                        consectetur est, vitae lacinia risus risus ac neque.
                        <br />
                        Praesent volutpat, turpis sed pulvinar suscipit, lectus
                        ligula commodo nisl, et cursus massa nulla eu felis.
                        Morbi auctor, sem nec dignissim rutrum, justo urna
                        venenatis urna, nec gravida
                    </p>
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

                <div className=" w-full bg-[#fff] text-white ">
                    <h2 className="px-4 py-2 text-[#000] text-[20px] font-semibold">
                        Sanitation and Hygiene
                    </h2>
                    <p className="text-[18px] font-light text-justify p-4 text-[#000]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed vulputate, nulla ac ultricies mattis, odio urna
                        consectetur est, vitae lacinia risus risus ac neque.
                        <br />
                        Praesent volutpat, turpis sed pulvinar suscipit, lectus
                        ligula commodo nisl, et cursus massa nulla eu felis.
                        Morbi auctor, sem nec dignissim rutrum, justo urna
                        venenatis urna, nec gravida
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCategory;

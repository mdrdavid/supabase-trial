'use client';
import ContactComponent from '../ContactSection/ContactSection';
import SocialContacts from '../SocialMedia/SocilaMedia';

function Footer() {
    return (
        <div className="flex flex-col justify-between  h-[100px] mt-10 py-10 bg-[rgb(187,187,187)] border-t border-white ">
            <ContactComponent />
            <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between  h-[100px] pb-10 bg-[rgb(187,187,187)]  border-white ">
                <p className="px-2">
                    © 2023{' '}
                    <a href="#" className="hover:underline ">
                        GreenValley™
                    </a>
                    <span className="block sm:inline">
                        . All Rights Reserved.
                    </span>
                </p>
                <SocialContacts />
            </div>
        </div>
    );
}

export default Footer;

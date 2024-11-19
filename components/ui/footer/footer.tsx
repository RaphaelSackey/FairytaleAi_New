'use client'

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

	if (!mounted) return null;

    return (
        <div className="border-t flex flex-col items-center mt-16 gap-3">
            <Image src='/sitelogos/logo.png' alt="site logo" width={65} height={65} />
            <div className="font-suseLight text-[.9rem]">Professional storyboards generated with AI saving you hours of unnecessary hard work</div>
            <div className="socials flex gap-3">
                <a href="mailto:victoriaraphael@gmail.com" >
                    <Image src={theme === 'dark' ? '/socials/mail_d.png' : '/socials/mail.png'} alt="gmail" width={35} height={35} />
                </a>
                <a href="https://github.com/RaphaelSackey">
                    <Image src={theme === 'dark' ? '/socials/github_d.svg' : '/socials/github.svg'} alt="github" width={35} height={35} />
                </a>
                <a href="www.linkedin.com/in/raphael-sackey-1120381b1">
                    <Image src={theme === 'dark' ? '/socials/linkedin_d.svg' : '/socials/linkedin.svg'} alt="linkedin" width={35} height={35} />
                </a>
            </div>
            <div className="font-suseLight text-[.8rem]">© 2024 PearAI - All rights reserved.</div>
        </div>
    );
}

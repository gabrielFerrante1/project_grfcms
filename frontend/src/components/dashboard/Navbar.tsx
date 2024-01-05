"use client";

import Image from "next/image";
import Link from "next/link";
import ShortBrand from '../../../public/assets/images/short-brand.png';
import { MdOutlineNotifications } from "react-icons/md";

export const NavbarDashboard = () => {
    return (
        <header className="bg-indigo-600 border border-transparent border-b-gray-300 h-16 px-8 pr-6">
            <div className="flex items-center h-full">
                <div className="flex-1">
                    <Link href='/dashboard'>
                        <Image
                            className="w-9 "
                            src={ShortBrand}
                            alt="GRF Cms"
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <MdOutlineNotifications className='w-8 h-8 p-1 duration-200 rounded-lg text-gray-100 cursor-pointer hover:bg-indigo-500' />

                </div>
            </div>
        </header>
    )
}
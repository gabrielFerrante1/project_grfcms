"use client";

import { useAuth } from '@/utils/auth';
import { CgWebsite } from "react-icons/cg";
import { LuFiles, LuHistory } from "react-icons/lu";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/utils/redux/hooks';
import { Avatar } from '@chakra-ui/react';

export const SidebarDashboard = () => {
    const user = useAppSelector(state => state.auth)

    const { signOut } = useAuth()

    const pathname = usePathname()

    return (
        <div className="h-full p-3 space-y-2 w-60   dark:bg-gray-900 dark:text-gray-100 ">
            <div className="flex items-center p-2 space-x-4">
                <Avatar name={user.user?.name} className="w-12 h-12 rounded-full dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-semibold  text-ellipsis whitespace-nowrap overflow-hidden w-11/12">{user.user?.name}s</h2>
                    <span className="flex items-center space-x-1">
                        <span className="text-xs   dark:text-gray-400">Online 🟢</span>
                    </span>
                </div>
            </div>

            <div className="divide-y dark:divide-gray-700 flex flex-col   h-[calc(100vh-90px)] justify-between">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className={`${pathname == '/dashboard' && "rounded-md  dark:bg-gray-800 dark:text-gray-50"} `}>
                        <Link href='/dashboard' className='flex items-center p-2 space-x-3'>

                            <HiOutlineHome className="size-5 dark:text-gray-400" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={`${pathname == '/dashboard/websites' && "rounded-md  dark:bg-gray-800 dark:text-gray-50"} `}>
                        <Link href='/dashboard/websites' className='flex items-center p-2 space-x-3'>
                            <CgWebsite className="size-5 dark:text-gray-400" />
                            <span>Meus sites</span>
                        </Link>
                    </li>
                    <li className={`${pathname == '/dashboard/pages' && "rounded-md  dark:bg-gray-800 dark:text-gray-50"} `}>
                        <Link href='/dashboard/pages' className='flex items-center p-2 space-x-3'>
                            <LuFiles className="size-5 dark:text-gray-400" />
                            <span>Minhas páginas</span>
                        </Link>
                    </li>
                    <li className={`${pathname == '/dashboard/historys' && "rounded-md  dark:bg-gray-800 dark:text-gray-50"} `}>
                        <Link href='/dashboard/historys' className='flex items-center p-2 space-x-3'>
                            <LuHistory className="size-5 dark:text-gray-400" />
                            <span>Históricos</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li onClick={signOut} className='cursor-pointer flex items-center p-2 space-x-3 rounded-md'>
                        <HiOutlineLogout className="size-5 dark:text-gray-400" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}
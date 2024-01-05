"use client";

import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { LuFiles, LuHistory } from "react-icons/lu";

type Props = {
    title: string;
    description: string;
    buttonLabel?: string;
    buttonOnClick?: () => void;
    breadCrumbs: string[]
}

const BreadCrumbItem = ({ codeName, isActive = false }: { codeName: string, isActive?: boolean }) => {
    let Icon: JSX.Element | string = ''
    let label: string = ''
    let href: string = ''

    if (codeName == 'dashboard-websites') {
        Icon = <CgWebsite className="size-[22px] mx-2 " />
        label = 'Websites'
        href = '/dashboard/websites'
    }
 
    if (codeName == 'dashboard-pages') {
        Icon = <LuFiles className="size-[22px] mx-2 " />
        label = 'Páginas'
        href = '/dashboard/pages'
    }

    if (codeName == 'dashboard-historys') {
        Icon = <LuHistory className="size-[22px] mx-2 " />
        label = 'Históricos'
        href = '/dashboard/historys'
    }

    return (
        <>
            <span className="mx-5 text-gray-500  rtl:-scale-x-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </span>

            <Link
                href={href}
                className={`flex items-center ${isActive ? 'text-indigo-600' : 'text-gray-600'} hover:underline`}
            >
                {Icon}

                <span className="mx-2">{label}</span>
            </Link>
        </>
    )
}

const PageHeading = ({ title, description, breadCrumbs, buttonLabel, buttonOnClick }: Props) => {
    return (
        <header className="bg-gray-100 border border-t-0">
            <div className="bg-gray-50 border border-t-0 ">
                <div className="max-w-screen-xl flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
                    <Link href="/dashboard" className="text-gray-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>

                    {breadCrumbs.map((value, key) => (
                        <BreadCrumbItem
                            key={key}
                            codeName={value}
                            isActive={breadCrumbs.length == key + 1}
                        />
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-9 lg:px-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">{title}</h1>
                        <p className="mt-1.5 text-sm text-gray-500">{description}</p>
                    </div>

                    <div className="mt-4 sm:mt-0">
                        {buttonLabel &&
                            <button
                                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                                onClick={buttonOnClick}
                            >
                                {buttonLabel}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PageHeading;
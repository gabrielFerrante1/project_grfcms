import { ApiGetWebsiteData } from "@/@types/Website";
import { UserBlocked } from "@/components/UserBlocked";
import { useApi } from "@/utils/api"
import Link from "next/link";
import { notFound } from 'next/navigation';

export default async ({ params }: { params: { website_slug: string } }) => {
    const { error_detail, data } = await useApi<ApiGetWebsiteData>({
        endpoint: `websites/${params.website_slug}`,
        withAuth: false
    })

    // If website slug not exists
    if (error_detail) notFound()

    // If user is blocked
    if (!data.website.authorized) return <UserBlocked />

    return (
        <div>
            <header className="p-4 dark:bg-indigo-600 dark:text-gray-100">
                <div className="container flex justify-between h-12 mx-auto">
                    <Link href={`/${data.website.slug}`} className="flex items-center p-2">
                        <img src="/assets/images/short-brand.png" className="w-10" />
                    </Link>
                    <ul className="items-stretch hidden space-x-3 md:flex">
                        {data.website.menu.map((item, key) => (
                            <li
                                className="flex"
                                key={key}
                            >
                                <Link href={`${data.website.slug}/${item.slug}`} className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button className="flex justify-end p-4 md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>

            {data.website.index_page &&
                <section
                    className={`h-[calc(100vh-80px)]`}
                    style={{ background: data.website.bgcolor }}
                >
                    <div
                        className="pt-10 mx-auto max-w-screen-xl"
                        style={{ color: data.website.txtcolor }}
                        dangerouslySetInnerHTML={{ __html: data.website.index_page.body }}
                    >

                    </div>
                </section>
            }
        </div>
    )
}
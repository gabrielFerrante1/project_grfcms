"use client";

import { ApiGetWebsites, Website } from "@/@types/Website";
import { ModalWebsite } from "@/components/ModalWebsite";
import PageHeading from "@/components/PageHeading";
import { useApi } from "@/utils/api";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from "react-icons/ri";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const WebsitesPage = () => {
    const [websites, setWebsites] = useState<Website[]>([])
    const [websiteModal, setWebsiteModal] = useState(false)
    const [websiteEdit, setWebsiteEdit] = useState<Website | null>(null)
    const [websitesCount, setWebsitesCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const per_page = 10;

    const toast = useToast()

    const handleModalOpen = (website: Website | null) => {
        setWebsiteEdit(website)
        setWebsiteModal(true)
    }

    const handleModalClose = () => {
        setWebsiteModal(false)
        setWebsiteEdit(null)
    }

    const handleGetWebsites = async () => {
        const response = await useApi<ApiGetWebsites>({ endpoint: 'websites', data: { page: currentPage } })

        if (!response.error_detail) {
            setWebsites(response.data.results);
            setWebsitesCount(response.data.count);
        }
    }

    const handleChangeCurrentPage = (page: number) => setCurrentPage(page)

    const handleNextPage = () => {
        const page = currentPage + 1

        if (Math.ceil(websitesCount / per_page) >= page) {
            setCurrentPage(page)
        }
    }

    const handlePrevPage = () => {
        const page = currentPage - 1

        if (page > 0) setCurrentPage(page)
    }

    const handleDeleteWebsite = async (slug: string) => {
        await useApi({ endpoint: `websites/${slug}`, method: 'DELETE' })

        handleGetWebsites();

        toast({
            title: 'Sucesso!',
            description: "O Website foi deletado com sucesso",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top-right'
        })
    }

    useEffect(() => {
        handleGetWebsites()
    }, [currentPage])

    return (
        <div>
            <PageHeading
                title="Veja todos os seus websites!"
                description="Os seus sites publicados estão aqui, crie novos sites e edite-os! 🎉"
                buttonLabel="Novo website"
                buttonOnClick={() => handleModalOpen(null)}
                breadCrumbs={['dashboard-websites']}
            />

            <ModalWebsite
                mode={websiteEdit ? 'edit' : 'new'}
                open={websiteModal}
                website={websiteEdit}
                onClose={handleModalClose}
                refreshWebsites={() => handleGetWebsites()}
            />

            <div className="max-w-screen-xl mx-auto px-4">
                <div className="mt-10 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">ID</th>
                                <th className="py-3 px-6">Título</th>
                                <th className="py-3 px-6">Slug</th>
                                <th className="py-3 px-6">Cor de fundo</th>
                                <th className="py-3 px-6">Cor dos textos</th>
                                <th className="py-3 px-6">Quantidade de visualizações</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {websites.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">#{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">/{item.slug}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.bgcolor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.txtcolor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap ">{item.count_views}</td>
                                    <td className="">
                                        <div className="flex items-center gap-4">
                                            <Link target="_blank" href={`/${item.slug}`} className="font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <RiEyeLine className="size-5" />
                                            </Link>

                                            <button onClick={() => handleModalOpen(item)} className="font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <RiEdit2Line className="size-5" />
                                            </button>

                                            <button onClick={() => handleDeleteWebsite(item.slug)} className="font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <RiDeleteBin6Line className="size-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 ">
                    <ol className="flex  gap-1 text-xs font-medium">
                        <li>
                            <button
                                onClick={handlePrevPage}
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                            >
                                <MdKeyboardArrowLeft className="size-4" />
                            </button>
                        </li>

                        {Array.from({ length: Math.ceil(websitesCount / per_page) }).map((_value, key) => (
                            <li key={key}>
                                <button
                                    onClick={() => handleChangeCurrentPage(key + 1)}
                                    className={`h-8 w-8 rounded border ${key + 1 == currentPage ? "border-blue-600 bg-blue-600 text-white" : "border-gray-100 bg-white text-gray-900"} text-center leading-8 `}
                                >
                                    {key + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={handleNextPage}
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                            >
                                <MdKeyboardArrowRight className="size-4" />
                            </button>
                        </li>
                    </ol>
                </div>
            </div>

        </div>
    )
}

export default WebsitesPage;
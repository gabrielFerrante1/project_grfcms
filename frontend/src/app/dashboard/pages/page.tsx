"use client";

import { ApiGetPages, PageDetail } from "@/@types/Page";
import { ModalPage } from "@/components/ModalPage";
import PageHeading from "@/components/PageHeading";
import { useApi } from "@/utils/api";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from "react-icons/ri";

const PagesPage = () => {
    const [pages, setPages] = useState<PageDetail[]>([])
    const [pageModal, setPageModal] = useState(false)
    const [pageEdit, setPageEdit] = useState<PageDetail | null>(null)

    const toast = useToast()

    const handleGetPages = async () => {
        const response = await useApi<ApiGetPages>({ endpoint: 'pages' })

        if (!response.error_detail) {
            setPages(response.data.pages)
        }
    }

    const handleModalOpen = (page: PageDetail | null) => {
        setPageEdit(page)
        setPageModal(true)
    }

    const handleModalClose = () => {
        setPageModal(false)
        setPageEdit(null)
    }

    const handleDeletePage = async (id: number) => {
        await useApi({ endpoint: `pages/${id}`, method: 'DELETE' })

        handleGetPages();

        toast({
            title: 'Sucesso!',
            description: "A página foi deletada com sucesso",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top-right'
        })
    }


    useEffect(() => {
        handleGetPages()
    }, [])

    return (
        <div>
            <PageHeading
                title="Veja todos as suas páginas!"
                description="Todas as páginas de cada website estão aqui, crie novas páginas e edite-as! 🎉"
                buttonLabel="Nova página"
                buttonOnClick={() => handleModalOpen(null)}
                breadCrumbs={['dashboard-pages']}
            />

            <ModalPage
                mode={pageEdit ? 'edit' : 'new'}
                open={pageModal}
                page={pageEdit}
                onClose={handleModalClose}
                refreshPages={() => handleGetPages()}
            />

            <div className="max-w-screen-xl mx-auto px-4">
                <div className="mt-10 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">ID</th>
                                <th className="py-3 px-6">Título</th>
                                <th className="py-3 px-6">Slug</th>
                                <th className="py-3 px-6">Website</th>
                                <th className="py-3 px-6">È a página inicial</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {pages.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">#{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">/{item.slug}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.website_title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.is_index ? 'Sim' : 'Não'}</td>
                                    <td className="">
                                        <div className="flex items-center gap-4">
                                            <Link target="_blank" href={`/${item.website_slug}/${item.slug}`} className="font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <RiEyeLine className="size-5" />
                                            </Link>

                                            <button onClick={() => handleModalOpen(item)} className="font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <RiEdit2Line className="size-5" />
                                            </button>

                                            <button onClick={() => handleDeletePage(item.id)} className="font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <RiDeleteBin6Line className="size-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PagesPage;
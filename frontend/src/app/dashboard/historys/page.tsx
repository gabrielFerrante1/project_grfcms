"use client";

import { ApiGetHistorys, History } from "@/@types/History";
import PageHeading from "@/components/PageHeading";
import { useApi } from "@/utils/api";
import { FormControl, FormHelperText, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";

const HistorysPage = () => {
    const [websiteIdInput, setWebsiteIdInput] = useState('')
    const [historys, setHistorys] = useState<History[] | null>(null)

    const toast = useToast();

    const handleGetHistorys = async () => {
        if (!websiteIdInput) {
            toast({
                title: 'Erro ao consultar!',
                description: "Informe o #ID do website que deseja consultar",
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }

        const response = await useApi<ApiGetHistorys>({ endpoint: `historys`, data: { website: websiteIdInput } })

        if (!response.error_detail) {
            setHistorys(response.data.historys)
        } else {
            toast({
                title: 'Erro ao consultar!',
                description: response.error_detail,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            });
        }
    }

    const handleToggleBan = async (history_id: number) => {
        await useApi({ endpoint: `historys/ban/${history_id}`, method: 'PUT' })

        handleGetHistorys()
    }

    return (
        <div>
            <PageHeading
                title="Veja o histórico de acessos aos seus sites!"
                description="Todos os registros de acesso estão disponíveis aqui. Você pode visualizar o endereço IP, se necessário, bloquear os IPs indesejados! 🎉"
                breadCrumbs={['dashboard-historys']}
            />

            <div className="max-w-screen-xl mx-auto px-4">
                <div className="mt-4 pl-3 flex gap-4 items-center">
                    <FormControl>
                        <FormLabel>Qual website deseja consultar o histórico?</FormLabel>
                        <Input
                            type='number'
                            value={websiteIdInput}
                            onChange={e => setWebsiteIdInput(e.target.value)}
                        />
                        <FormHelperText>Informe o ID do website (apenas números)</FormHelperText>
                    </FormControl>

                    <button
                        className="rounded-lg bg-indigo-600 px-5 py-[0.75em] mt-1 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                        onClick={handleGetHistorys}
                    >
                        Consultar
                    </button>
                </div>


                {historys &&
                    <div className="mt-10 shadow-sm border rounded-lg overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-3 px-6">ID</th>
                                    <th className="py-3 px-6">IP</th>
                                    <th className=""></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {historys.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">#{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.ip}</td>
                                        <td className="w-0 px-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className={`rounded-md ${item.banned ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}  px-4 py-1 mt-1 text-sm font-medium text-white transition  focus:outline-none focus:ring`}
                                                    onClick={() => handleToggleBan(item.id)}
                                                >
                                                    {item.banned ? 'Desbloquear' : 'Bloquear'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default HistorysPage;
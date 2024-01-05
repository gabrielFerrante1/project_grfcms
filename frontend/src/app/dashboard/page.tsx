import PageHeading from "@/components/PageHeading";
import { CgWebsite } from "react-icons/cg";
import { LuFile, LuHistory } from "react-icons/lu";

const DashboardPage = () => {
    return (
        <div>
            <PageHeading
                title="Seja bem-vindo(a) ao GRF Cms!"
                description="Crie websites e páginas de forma rápida e descomplicada! 🎉"
                breadCrumbs={[]}
            />

            <section className="text-gray-600 body-font max-w-screen-xl mx-auto">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Conheça um pouco mais sobre o GRF Cms!</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Aqui você pode criar websites e páginas de forma rápida e descomplicada, além de ter relatórios personalizados!</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <CgWebsite className="size-6" />
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Criar Websites</h2>
                                <p className="leading-relaxed text-base text-justify">Crie sites de forma intuitiva e eficiente, além de personalizá-los de acordo com suas preferências. Desde a escolha de layouts até a customização detalhada de elementos, o processo é simplificado, permitindo que você dê vida à sua visão digital de maneira única e impactante.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <LuFile className="size-6" />
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Criar Páginas</h2>
                                <p className="leading-relaxed text-base text-justify">Crie páginas, adaptadas às suas necessidades, através de uma interface amigável. Desde a adição de textos e imagens até a incorporação de elementos interativos, o processo de criação de páginas é simplificado, permitindo que você desenvolva conteúdo envolvente e dinâmico para o seu site com facilidade.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <LuHistory className="size-6" />
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Histórico de acessos</h2>
                                <p className="leading-relaxed text-base text-justify">Tenha um relatório e analise os endereços IP de quem acessa suas páginas, fornecendo dados cruciais para entender o tráfego e a interação dos usuários. Essa ferramenta é essencial para aprimorar a segurança, personalizar a experiência do usuário e obter informações úteis sobre o público que visita seus sites.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage;
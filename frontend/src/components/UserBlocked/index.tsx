import Link from "next/link"

export const UserBlocked = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
            <div className="max-w-lg mx-auto space-y-3 text-center">
                <h3 className="text-indigo-600 font-semibold">
                    401 Error
                </h3>
                <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                    Você foi bloqueado
                </p>
                <p className="text-gray-600">
                    O administrador do site bloqueou o seu endereço IP, impedindo o acesso a esta página
                </p>
                <div className="flex justify-center gap-3">
                    <Link href='/' className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg">
                        Ir para página inicial
                    </Link>
                </div>
            </div>
        </div>
    )
}
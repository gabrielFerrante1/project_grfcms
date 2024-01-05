"use client";

import Image from "next/image";
import BrandLogo from '../../../../public/assets/images/brand.png';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { useAppSelector } from "@/utils/redux/hooks";

const SignUpPage = () => {
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const toast = useToast()
    const router = useRouter()

    const { user } = useAppSelector(state => state.auth)

    const { signUp, verifyAuth } = useAuth()

    const handleOnSubmit = async () => {
        const [name, email, password] = [nameInput, emailInput, passwordInput]

        if (!name || !email || !password) {
            toast({
                title: 'Atenção',
                description: "Preencha todos os campos",
                status: 'warning',
                position: 'top-right',
                duration: 4000,
                isClosable: true
            })
            return;
        }

        const response = await signUp({ name, email, password })

        if (response.error_detail) {
            toast({
                title: 'Erro na autenticação',
                description: response.error_detail,
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true
            })
            return;
        }

        toast({
            title: 'Conta criada com sucesso!',
            description: "Faça login na sua conta",
            status: 'success',
            position: 'top-right',
            duration: 6000,
            isClosable: true
        });

        router.push(`/signin?email=${email}`)
    }   

    useEffect(() => {
        // Check auth user
        verifyAuth();
    }, [])

    useEffect(() => {
        if (user) router.push('/dashboard')
    }, [user])


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto"
                    width={180}
                    src={BrandLogo}
                    alt="Grf Cms"
                />
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Criar uma nova conta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Seu nome
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={nameInput}
                                onChange={e => setNameInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Endereço de email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={emailInput}
                                onChange={e => setEmailInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Sua senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleOnSubmit}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Registrar
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Já tem conta?{' '}
                    <Link href='/signin' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage;
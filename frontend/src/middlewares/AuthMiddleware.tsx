"use client";

import { useAuth } from "@/utils/auth";
import { useAppSelector } from "@/utils/redux/hooks"
import { CircularProgress, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react"

type Props = {
    children: ReactNode
}

export const AuthMiddleware = ({ children }: Props) => {
    const [loadingRequest, setLoadingRequest] = useState(true)

    const user = useAppSelector(state => state.auth.user)

    const toast = useToast()
    const router = useRouter()

    const { verifyAuth } = useAuth()

    const handleVerifyAuth = async () => {
        await verifyAuth()
        setLoadingRequest(false)
    }

    useEffect(() => {
        if (!user) handleVerifyAuth()
    }, [])

    useEffect(() => {
        if (!loadingRequest && !user) {
            toast({
                title: 'Faça login',
                description: 'Para acessar está página você deve estar autenticado',
                status: 'error',
                duration: 6000,
                position: 'top-right',
                isClosable: true
            })
            router.push('/signin')
        }
    }, [user, loadingRequest])

    if (user) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center" >
            <CircularProgress isIndeterminate color='blue.500' />
        </div>
    )
}
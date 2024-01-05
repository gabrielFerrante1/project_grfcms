"use client";

import { Provider } from "react-redux"
import { ReactNode } from "react"
import { store } from "@/utils/redux/store";
import { ChakraProvider } from "@chakra-ui/react"; 

type Props = {
    children: ReactNode
}

export const Providers = ({ children }: Props) => {
 
    return (
        <ChakraProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </ChakraProvider>
    )
}
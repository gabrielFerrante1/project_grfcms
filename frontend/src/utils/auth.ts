import { ApiGetUser, ApiSignIn } from "@/@types/Auth"
import { useApi } from "./api"
import { setUser } from "./redux/reducers/authReducer"
import { useDispatch } from "react-redux"
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

export const getAccessToken = () => getCookie(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY as string)

export const useAuth = () => {
    const dispatch = useDispatch()

    const signIn = async (data: { email: string, password: string }) => {
        const response = await useApi<ApiSignIn>({ endpoint: 'accounts/login', method: 'POST', data, withAuth: false })

        if (!response.error_detail) {
            const user = { ...response.data.user, refresh: response.data.refresh, access: response.data.access }
            setCookie(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY as string, response.data.access, { maxAge: 100000 * 24 })
            dispatch(setUser(user))
        }

        return response;
    }

    const signUp = async (data: { name: string, email: string, password: string }) => {
        const response = await useApi({ endpoint: 'accounts/create', method: 'POST', data, withAuth: false })

        return response;
    }

    const verifyAuth = async () => {
        const access = getAccessToken()
        const response = await useApi<ApiGetUser>({ endpoint: 'accounts/user' })

        if (access && !response.error_detail) {
            const user = { ...response.data.user, refresh: '', access: access }
            dispatch(setUser(user))
        }
    }

    const signOut = () => {
        deleteCookie(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY as string)
        dispatch(setUser(undefined))
    }

    return {
        signIn,
        signUp,
        signOut,
        verifyAuth
    }
}
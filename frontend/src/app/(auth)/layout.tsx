import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="h-screen bg-gray-100">
            {children}
        </div>
    )
}

export default AuthLayout;
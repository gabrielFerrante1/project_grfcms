import { AuthMiddleware } from "@/middlewares/AuthMiddleware"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const DashboardLayout = ({ children }: Props) => {
    return (
        <AuthMiddleware>
            {children}
        </AuthMiddleware>
    )
}

export default DashboardLayout;
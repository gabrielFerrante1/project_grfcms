import { NavbarDashboard } from "@/components/dashboard/Navbar";
import { SidebarDashboard } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const DashboardTemplate = ({ children }: Props) => {
    return (
        <div className="h-screen w-screen overflow-hidden flex">
            <div>
                <SidebarDashboard />
            </div>

            <div className="flex flex-col flex-1">
                <div>
                    <NavbarDashboard />
                </div>

                <main className="bg-gray-50 flex-1 overflow-auto">
                    {children}
                </main>
            </div>

        </div>
    )
}

export default DashboardTemplate;
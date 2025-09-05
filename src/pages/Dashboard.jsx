import { Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "components/Sidebar";
import {
    LifeBuoy,
    Receipt,
    UserCircle,
    BarChart3,
    LayoutDashboard,
} from 'lucide-react';

import routes from "routes";

export default function Dashboard() {
    return (
        <section className="flex">
            <Sidebar>
                {routes[0].pages.map((page, index) => {
                    const icons = {
                        Painel: <LayoutDashboard size={20} />,
                        Gastos: <Receipt size={20} />,
                        Investimentos: <BarChart3 size={20} />,
                        Usuário: <UserCircle size={20} />,
                        Ajuda: <LifeBuoy size={20} />,
                    };
                    return (
                        <SidebarItem
                            key={page.path}
                            icon={icons[page.name]}
                            text={page.name}
                            to={`/dashboard${page.path}`}
                        />
                    );
                })}
            </Sidebar>
            <Routes>
                {routes[0].pages.map((page) => (
                    <Route key={page.path} path={page.path} element={page.element} />
                ))}
            </Routes>
        </section>
    )
};

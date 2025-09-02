import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import {
    LifeBuoy,
    Receipt,
    UserCircle,
    BarChart3,
    LayoutDashboard,
} from 'lucide-react';

export default function Dashboard() {
    return (
        <section className="flex">
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text='Painel' />
                <SidebarItem icon={<Receipt size={20} />} text='Gastos' alert />
                <SidebarItem icon={<BarChart3 size={20} />} text='Investimentos' />
                <SidebarItem icon={<UserCircle size={20} />} text='Usuário' />
                <SidebarItem icon={<LifeBuoy size={20} />} text='Ajuda' />
            </Sidebar>
            <Card className="p-10">
                <CardHeader shadow={false} floated={false}>
                    <Typography
                        variant="h3"
                        color="blue-gray"
                        className="mb-4 !text-xl lg:text-2xl"
                    >
                        Home
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                        Informações...
                    </Typography>
                </CardBody>
            </Card>
        </section>
    )
};

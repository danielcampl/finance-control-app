import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { Footer } from "components/card/Footer";
import Header from "components/card/Header";

export default function Gastos() {
    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={'Gastos'} />
            <CardBody className="w-full h-full">
                <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                    Informações de pagamentos
                </Typography>
            </CardBody>
            <Footer />
        </Card>
    )
};
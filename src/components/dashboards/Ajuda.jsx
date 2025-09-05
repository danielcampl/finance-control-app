import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import Header from "components/card/Header";

export default function Ajuda() {
    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={'Ajuda'} />
            <CardBody>
                <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                    Em desenvolvimento...
                </Typography>
            </CardBody>
        </Card>
    )
};
import Sidebar from "../components/Sidebar";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function Home() {
    return (
        <section>
            <Sidebar />
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

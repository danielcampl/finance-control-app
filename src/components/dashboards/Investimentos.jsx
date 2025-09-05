import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function Investimentos() {
    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <CardHeader shadow={false} floated={false} className="flex items-center gap-2 bg-gradient-to-r from-slate-300 to-gray-50">
                <Typography
                    variant="h3"
                    className="mb-4 !text-xl lg:text-2xl font-sans text-[#495057] italic"
                >
                    Dashboard
                </Typography>
                <Typography
                    className="mb-4 text-lg font-medium text-[#6c757d] italic"
                >
                    /
                </Typography>
                <Typography
                    className=" mb-3 font-medium text-[#6c757d] text-sm italic"
                >
                    Investimentos
                </Typography>
            </CardHeader>
            <CardBody>
                <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                    Em desenvolvimento...
                </Typography>
            </CardBody>
        </Card>
    )
};
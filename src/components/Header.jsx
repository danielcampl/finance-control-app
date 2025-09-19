import {
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function Header({ title }) {
    return (
        <CardHeader shadow={false} floated={false} className="flex items-center gap-2 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-24">
            <Typography
                variant="h3"
                className="mb-4 !text-lg lg:text-2xl font-sans text-[#495057] italic"
            >
                Dashboard
            </Typography>
            <Typography
                className="mb-4 text-lg font-medium text-[#6c757d] italic"
            >
                /
            </Typography>
            <Typography
                className="mb-3 text-xs font-medium text-[#6c757d] md:text-sm italic"
            >
                {title}
            </Typography>
        </CardHeader>
    )
};
import {
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function Header({ title }) {
    return (
        <CardHeader shadow={false} floated={false} className="flex items-center gap-2 bg-gradient-to-r from-slate-600 to-gray-300 w-full h-24">
            <Typography
                variant="h3"
                className="mb-4 !text-lg lg:text-2xl font-sans text-[#cad4de] italic"
            >
                Dashboard
            </Typography>
            <Typography
                className="mb-4 text-lg font-medium text-[#d9dce0] italic"
            >
                /
            </Typography>
            <Typography
                className="mb-3 text-xs font-medium text-[#d9dce0] md:text-sm italic"
            >
                {title}
            </Typography>
        </CardHeader>
    )
};
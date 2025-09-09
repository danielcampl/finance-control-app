import { Outlet, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";

import { Footer } from "components/card/Footer";
import Header from "components/card/Header";
import GastosCards from "components/card/GastosCards";

export default function Gastos() {
  const location = useLocation();

  // lista dos bancos dnv
  const banks = [
    { name: "Nubank", path: "/dashboard/gastos/nubank", id: "nubank" },
    { name: "Inter", path: "/dashboard/gastos/inter", id: "inter" },
    { name: "Amazon Bradescard", path: "/dashboard/gastos/amazon", id: "amazon" },
    { name: "Itau", path: "/dashboard/gastos/itau", id: "itau" },
    { name: "Xp Visa Infinite", path: "/dashboard/gastos/xpvisa", id: "xpvisa" },
  ];

  // encontra o banco atual pelo path
  const currentBank = banks.find((b) => location.pathname.includes(b.id));

  return (
    <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
      <Header title={`Gastos${currentBank ? " " + currentBank.name : ""}`} />
      <CardBody className="w-full h-full">
        <GastosCards />
        <Outlet />
      </CardBody>
      <Footer />
    </Card>
  );
}

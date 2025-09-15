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
    <Card className="min-h-screen w-full bg-gradient-to-r from-slate-300 to-gray-50 p-6 md:p-10 flex flex-col">
      <Header title={`Gastos${currentBank ? " " + currentBank.name : ""}`} />

      <CardBody
        className="w-full flex-1 flex flex-col gap-4 overflow-y-auto"
      >
        {!currentBank ? <GastosCards /> : <Outlet />}
      </CardBody>

      <Footer />
    </Card>
  );
}

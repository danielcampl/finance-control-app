import {
  Inter,
  Nubank,
  Amazon,
  Itau,
  XPVisa,
  Pix,
  MercadoPago,
  Santander,
} from "components/card/expenses/banks";
import { Ajuda, Gastos, Investimentos, Painel, Usuario } from "components/dashboards";

const routes = [
  {
    name: "Painel",
    path: "painel", // relativo a /dashboard
    element: <Painel />,
  },
  {
    name: "Gastos",
    path: "gastos/*", // Gastos tem subrotas
    element: <Gastos />,
    children: [
      {
        name: "Nubank",
        path: "nubank",
        element: <Nubank />,
      },
      {
        name: "Inter",
        path: "inter",
        element: <Inter />,
      },
      {
        name: "Amazon",
        path: "amazon",
        element: <Amazon />,
      },
      {
        name: "Itau",
        path: "itau",
        element: <Itau />,
      },
      {
        name: "Xp Visa Infinite",
        path: "xpvisa",
        element: <XPVisa />,
      },
      {
        name: "Mercado Pago",
        path: "mercadopago",
        element: <MercadoPago />,
      },
      {
        name: "Santander",
        path: "santander",
        element: <Santander />,
      },
      {
        name: "Pix",
        path: "pix",
        element: <Pix />,
      },
    ],
  },
  {
    name: "Investimentos",
    path: "investimentos",
    element: <Investimentos />,
  },
  {
    name: "Usuário",
    path: "usuario",
    element: <Usuario />,
  },
  {
    name: "Ajuda",
    path: "ajuda",
    element: <Ajuda />,
  },
];

export default routes;

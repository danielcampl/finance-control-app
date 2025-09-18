import {
  Inter,
  Nubank,
  Amazon,
  Itau,
  XPVisa,
  Pix,
  Bradesco,
  BSB,
  BTG,
  C6,
  Caixa,
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
        name: "Bradesco",
        path: "bradesco",
        element: <Bradesco />,
      },
      {
        name: "BSB",
        path: "bsb",
        element: <BSB />,
      },
      {
        name: "BTG",
        path: "btg",
        element: <BTG />,
      },
      {
        name: "C6",
        path: "c6",
        element: <C6 />,
      },
      {
        name: "Caixa",
        path: "caixa",
        element: <Caixa />,
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

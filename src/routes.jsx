import { Inter, Nubank, Amazon, Itau, XPVisa, Received, Total } from "components/card/expenses/banks";
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
      // {
      //   name: "Received",
      //   path: "received",
      //   element: <Received />,
      // },
      // {
      //   name: "Total",
      //   path: "total",
      //   element: <Total />,
      // },
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

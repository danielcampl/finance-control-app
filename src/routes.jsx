import { Ajuda, Gastos, Investimentos, Painel, Usuario } from "components/dashboards";

const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "Painel",
        path: "/painel",
        element: <Painel />,
      },
      {
        name: "Gastos",
        path: "/gastos",
        element: <Gastos />,
      },
      {
        name: "Investimentos",
        path: "/investimentos",
        element: <Investimentos />,
      },
      {
        name: "Usuário",
        path: "/usuario",
        element: <Usuario />,
      },
      {
        name: "Ajuda",
        path: "/ajuda",
        element: <Ajuda />,
      },
    ],
  },
];

export default routes;

import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { auth, db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Footer } from "components/Footer";
import Header from "components/Header";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Painel() {
    const [transactions, setTransactions] = useState([]);
    const [summaryByBank, setSummaryByBank] = useState({});

    // Buscar transações do usuário
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const unsubscribe = onSnapshot(
            collection(db, "users", user.uid, "transactions"),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTransactions(data);
            }
        );

        return () => unsubscribe();
    }, []);

    // Agrupar por banco
    useEffect(() => {
        const grouped = transactions.reduce((acc, t) => {
            const bankId = t.bankId || "desconhecido";
            if (!acc[bankId]) {
                acc[bankId] = { income: 0, expense: 0, total: 0 };
            }
            if (t.type === "entrada") {
                acc[bankId].income += Number(t.amount);
            } else if (t.type === "saida") {
                acc[bankId].expense += Number(t.amount);
            }
            acc[bankId].total = acc[bankId].income - acc[bankId].expense;
            return acc;
        }, {});
        setSummaryByBank(grouped);
    }, [transactions]);

    // Preparar dados do gráfico
    const barData = {
        labels: Object.keys(summaryByBank),
        datasets: [
            {
                label: "Entradas",
                data: Object.values(summaryByBank).map((s) => s.income),
                backgroundColor: "rgba(34, 197, 94, 0.7)",
            },
            {
                label: "Saídas",
                data: Object.values(summaryByBank).map((s) => s.expense),
                backgroundColor: "rgba(239, 68, 68, 0.7)",
            },
        ],
    };

    // const pieData = {
    //     labels: Object.keys(summaryByBank),
    //     datasets: [
    //         {
    //             data: Object.values(summaryByBank).map((s) => s.total),
    //             backgroundColor: [
    //                 "#3b82f6",
    //                 "#f97316",
    //                 "#10b981",
    //                 "#ef4444",
    //                 "#8b5cf6",
    //                 "#facc15",
    //             ],
    //         },
    //     ],
    // };

    const totalCredito = transactions
        .filter((t) => t.payment === "Crédito")
        .reduce((acc, cur) => acc + Number(cur.amount), 0);

    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={"Painel"} />
            <CardBody className="w-full h-full overflow-y-auto flex flex-col gap-10">
                <Typography className="!text-gray-600 text-[18px] font-normal">
                    Resumo de gastos por banco:
                </Typography>

                {/* Gráfico de barras */}
                <div className="w-full max-w-4xl mx-auto">
                    <Bar data={barData} />
                </div>

                {/* Gráfico de pizza */}
                {/* <div className="w-full max-w-md mx-auto">
                    <Pie data={pieData} />
                </div> */}

                {/* Cards individuais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {Object.entries(summaryByBank).map(([bankId, values]) => (
                        <Card key={bankId} className="p-6 shadow-md bg-white">
                            <Typography variant="h6" className="mb-2">
                                {bankId.toUpperCase()}
                            </Typography>
                            <Typography className="text-green-600">
                                Entradas: R$ {values.income.toFixed(2)}
                            </Typography>
                            <Typography className="text-red-600">
                                Saídas: R$ {values.expense.toFixed(2)}
                            </Typography>
                            <Typography className="font-bold">
                                Total: R$ {values.total.toFixed(2)}
                            </Typography>
                        </Card>
                    ))}
                </div>
                {/* Card fixo: Total de Crédito */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <Card className="p-6 shadow-md bg-white">
                        <Typography variant="h6" className="mb-2">
                            Crédito Utilizado
                        </Typography>
                        <Typography className="text-red-600 text-xl font-bold">
                            R$ {totalCredito.toFixed(2)}
                        </Typography>
                    </Card>
                </div>
            </CardBody>
            <Footer />
        </Card>
    );
}

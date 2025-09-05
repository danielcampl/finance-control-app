import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import { Footer } from "components/card/Footer";
import Header from "components/card/Header";

export default function Usuário() {
    const [getUserData, setGetUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Observa mudanças no login
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setGetUserData(userSnap.data());
                    } else {
                        console.log("Usuário não encontrado no Firestore!");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                }
            } else {
                console.log("Nenhum usuário logado!");
                setGetUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // limpa listener
    }, []);

    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={'Usuário'} />
            <CardBody className="w-full h-full">
                <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                    Informações do usuário
                </Typography>
                <div>
                    {loading ? "Carregando..."
                        : getUserData
                            ? <pre>{JSON.stringify(getUserData, null, 2)}</pre>
                            : "Nenhum dado encontrado"}
                </div>
            </CardBody>
            <Footer />
        </Card>
    );
}

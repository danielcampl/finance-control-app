import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import Header from "components/card/Header";

export default function Usuário() {
    const [getUserData, setGetUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser; // pega o usuário logado

            if (user) {
                try {
                    // uid do usuário logado
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
            }
        };

        fetchUserData();
    }, []);

    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={'Usuário'} />
            <CardBody>
                <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                    Informações de pagamentos
                </Typography>
                <div>
                    {getUserData ? <pre>{JSON.stringify(getUserData, null, 2)}</pre> : "Carregando..."}
                </div>
            </CardBody>
        </Card>
    );
}

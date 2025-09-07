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
                        // console.log(getUserData.photo);

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
                <div className='py-10 w-full h-full'>
                    {loading ? "Carregando..."
                        : getUserData
                            ? <pre className='flex flex-col gap-4'>
                                {/* {JSON.stringify(getUserData, null, 2)} */}
                                <div className='w-full h-full'>
                                    <Typography className="!text-gray-500 text-[16px] font-normal md:max-w-sm">
                                        Sua foto
                                    </Typography>
                                    <img src={getUserData.photo} alt="photo" className='w-20 h-20' />
                                </div>
                                <div>
                                    <Typography className="!text-gray-500 text-[16px] font-normal md:max-w-sm">
                                        Seu nome
                                    </Typography>
                                    <span className='font-sans text-[18px]'>{getUserData.name}</span>
                                </div>
                                <div>
                                    <Typography className="!text-gray-500 text-[16px] font-normal md:max-w-sm">
                                        Seu email
                                    </Typography>
                                    <span className='font-sans text-[18px]'>{getUserData.email}</span>
                                </div>
                            </pre>
                            : "Nenhum dado encontrado"}
                </div>
            </CardBody>
            <Footer />
        </Card>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import {
    Card,
    Input,
    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function Auth() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Escuta mudanças de login
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log("Usuário logado:", currentUser);
                setUser(currentUser);
                navigate("/dashboard/painel"); // mantém logado após refresh
            } else {
                console.log("Nenhum usuário logado");
                setUser(null);
                setPersistence(auth, browserLocalPersistence);
            }
        });

        return () => unsubscribe(); // limpa listener ao desmontar
    }, [navigate]);

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Salva ou atualiza no Firestore
            await setDoc(
                doc(db, "users", user.uid),
                {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    lastLogin: new Date(),
                },
                { merge: true }
            );

            console.log("Usuário salvo/atualizado no Firestore:", user.uid);
        } catch (error) {
            console.log("Erro ao logar:", error);
        }
    };

    return (
        <section className="px-8">
            <div className="container mx-auto h-screen grid place-items-center">
                <Card
                    shadow={false}
                    className="md:px-24 md:py-14 py-8 border border-gray-300"
                >
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:text-4xl">
                            Acessar a conta
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Aplicativo de controle financeiro em desenvolvimento, salve suas despesas e investimentos.
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form className="flex flex-col gap-4 md:mt-12">
                            <Button
                                variant="outlined"
                                size="lg"
                                className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                                fullWidth
                                onClick={loginGoogle}
                            >
                                <img
                                    src="https://www.material-tailwind.com/logos/logo-google.png"
                                    alt="google"
                                    className="h-6 w-6"
                                />
                                Entrar com Google
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

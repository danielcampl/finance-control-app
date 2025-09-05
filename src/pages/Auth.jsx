import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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

    const loginAccept = () => {
        navigate('/dashboard/painel');
    };

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Salva ou atualiza o usuário no Firestore
            await setDoc(
                doc(db, "users", user.uid),
                {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    lastLogin: new Date(),
                },
                { merge: true } // merge = atualiza sem sobrescrever tudo
            );

            console.log("Usuário salvo/atualizado no Firestore:", user.uid);

            loginAccept();
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
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="mb-4 !text-3xl lg:text-4xl"
                        >
                            Acessar a conta
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Aplicativo de controle financeiro em desenvolvimento, salve suas despesas e investimentos.
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form action="#" className="flex flex-col gap-4 md:mt-12">
                            <div>
                                <div className="flex gap-2 flex-col">
                                    <div>
                                        <label htmlFor="email">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="block font-medium mb-2"
                                            >
                                                Seu Email
                                            </Typography>
                                        </label>
                                        <Input
                                            disabled
                                            id="email"
                                            color="gray"
                                            size="lg"
                                            type="email"
                                            placeholder="name@mail.com"
                                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-2"
                                            labelProps={{ className: "hidden" }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="block font-medium mb-2"
                                            >
                                                Senha
                                            </Typography>
                                        </label>
                                        <Input
                                            disabled
                                            id="password"
                                            color="gray"
                                            size="lg"
                                            type="text"
                                            placeholder="***********"
                                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 p-2"
                                            labelProps={{ className: "hidden" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button disabled className="w-full h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]">
                                continuar
                            </Button>

                            <Button
                                variant="outlined"
                                size="lg"
                                className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                                fullWidth
                                onClick={loginGoogle}
                            >
                                <img
                                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                    alt="google"
                                    className="h-6 w-6"
                                />{" "}
                                Entrar com Google
                            </Button>

                            <Typography
                                variant="small"
                                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                            >
                                Após uma vez logado, você concorda com os{" "}
                                <a href="#" className="text-gray-900">
                                    Termos de Serviço
                                </a>{" "}
                                &{" "}
                                <a href="#" className="text-gray-900">
                                    Política de Privacidade.
                                </a>
                            </Typography>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

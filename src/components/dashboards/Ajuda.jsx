import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

import { Footer } from "components/card/Footer";
import Header from "components/card/Header";

const Result = () => {
    return (
        <span className="succes-msg text-green-700 font-semibold">
            Sua mensagem foi enviada com sucesso 🚀
        </span>
    );
};

export default function Ajuda() {
    const [result, showResult] = useState(false);
    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log("Form enviado");

        try {
            await emailjs.sendForm(
                "service_1luzg18", // trocar quando possivel
                "template_2dbflqg", // Atualizar API de email
                form.current,
                "bSdbJUtA_u6ASV4ym" // Nao identifica o email desejado
            );

            showResult(true);
            form.current.reset();

            // some a mensagem depois de enviada
            setTimeout(() => {
                showResult(false);
            }, 5000);
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
        }
    };

    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={"Ajuda"} />
            <CardBody className="w-full h-full">
                <section className="flex flex-col justify-center items-center w-full h-full">
                    <div className="container mx-auto text-center">
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-4 !text-base lg:!text-2xl"
                        >
                            Ajuda
                        </Typography>
                        <Typography className="mb-10 text-sm font-normal md:!text-lg lg:mb-20 mx-auto max-w-4xl !text-gray-500">
                            Iremos responder e arrumar quaisquer erros da página, estamos
                            implementando coisas novas e sempre atualizando o código para
                            facilitar a navegação do usuário. Basta preencher o formulário com
                            sua dúvida que iremos sanar o mais rápido possível.
                        </Typography>
                        <div className="flex items-center justify-center">
                            <form
                                ref={form}
                                onSubmit={sendEmail}
                                className="flex flex-col gap-3 bg-[#adb5bd] p-4 md:p-8 rounded-md"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="mb-2 text-left font-medium !text-gray-900"
                                        >
                                            Nome
                                        </Typography>
                                        <Input
                                            color="gray"
                                            size="lg"
                                            placeholder="Nome"
                                            name="first-name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="mb-2 text-left font-medium !text-gray-900"
                                        >
                                            Sobrenome
                                        </Typography>
                                        <Input
                                            color="gray"
                                            size="lg"
                                            placeholder="Sobrenome"
                                            name="last-name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        className="mb-2 text-left font-medium !text-gray-900"
                                    >
                                        Email
                                    </Typography>
                                    <Input
                                        type="email"
                                        color="gray"
                                        size="lg"
                                        placeholder="nome@email.com"
                                        name="email"
                                        required
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        className="mb-2 text-left font-medium !text-gray-900"
                                    >
                                        Mensagem
                                    </Typography>
                                    <Textarea
                                        rows={5}
                                        color="gray"
                                        placeholder="Mensagem"
                                        name="message"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]"
                                    color="gray"
                                >
                                    Enviar mensagem
                                </Button>
                                <div className="msg-container">{result ? <Result /> : null}</div>
                            </form>
                        </div>
                    </div>
                </section>
            </CardBody>
            <Footer />
        </Card>
    );
}

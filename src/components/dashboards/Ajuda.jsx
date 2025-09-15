import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";

import { Footer } from "components/card/Footer";
import Header from "components/card/Header";

export default function Ajuda() {
    return (
        <Card className="p-10 bg-gradient-to-r from-slate-300 to-gray-50 w-full h-screen">
            <Header title={'Ajuda'} />
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
                            Iremos responder e arrumar quaisquer erros da página, estamos implementando coisas novas
                            e sempre atualizando o código para facilitar a navegação do usuário. Basta preencher o
                            formulário com sua dúvida que iremos sanar o mais rápido possível.
                        </Typography>
                        <div className="flex items-center justify-center">
                            <form
                                action="#"
                                className="flex flex-col gap-3 bg-[#adb5bd] p-4 md:p-8 rounded-md"
                            >
                                <Typography
                                    variant="small"
                                    className="text-left !font-semibold !text-gray-600"
                                >
                                    Selecione uma das opções
                                </Typography>
                                <div className="flex gap-4">
                                    <Button variant="outlined" className="w-24 h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]">
                                        Dúvida
                                    </Button>
                                    <Button variant="outlined" className="w-28 h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]">
                                        Erros da página
                                    </Button>
                                </div>
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
                                            className="focus:border-t-gray-900"
                                            containerProps={{
                                                className: "min-w-full",
                                            }}
                                            labelProps={{
                                                className: "hidden",
                                            }}
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
                                            className="focus:border-t-gray-900"
                                            containerProps={{
                                                className: "!min-w-full",
                                            }}
                                            labelProps={{
                                                className: "hidden",
                                            }}
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
                                        color="gray"
                                        size="lg"
                                        placeholder="nome@email.com"
                                        name="email"
                                        className="focus:border-t-gray-900"
                                        containerProps={{
                                            className: "!min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }}
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
                                        rows={4}
                                        color="gray"
                                        placeholder="Mensagem"
                                        name="message"
                                        className="focus:border-t-gray-900"
                                        containerProps={{
                                            className: "!min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }}
                                    />
                                </div>
                                <Button className="w-full h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]" color="gray">
                                    Enviar mensagem
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </CardBody>
            <Footer />
        </Card>
    )
};
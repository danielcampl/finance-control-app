import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function Login() {
    const navigate = useNavigate();

    const loginWithGoogle = () => {
        navigate('/auth');
    }

    return (
        <section>
            <Button
                className="w-44 h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]"
                onClick={() => loginWithGoogle()}
            >
                Entrar
            </Button>
        </section>
    )
}

import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login() {
    const navigate = useNavigate();

    const loginAccept = () => {
        navigate('/home');
    }

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            loginAccept();
            console.log('Usuário logado:', result.user);
        } catch (error) {
            console.log('Erro ao logar:', error);
        }
    };

    return (
        <section>
            <h1>Login</h1>
            <button
                onClick={loginGoogle}
            >
                Entrar com Google
            </button>
        </section>
    )
}
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Logout({ user }) {
    return (
        <section>
            <h1>Olá, {user.displayName}</h1>
            <button
                onClick={() => signOut(auth)}
                className=''
            >
                Sair
            </button>
        </section>
    )
}
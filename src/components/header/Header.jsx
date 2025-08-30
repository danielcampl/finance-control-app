import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';

import Logout from "../logout/Logout";

export default function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logoutDone = () => {
        navigate('/');
    }

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <section>
            <div>
                <h1>Seu Controle financeiro</h1>
            </div>
            <div>
                {user ? <Logout user={user} /> : logoutDone()}
            </div>
        </section>
    );
}

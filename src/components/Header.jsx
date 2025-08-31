import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig';

import Logout from "./Logout";

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
        <section className="flex justify-between items-center w-full h-24 p-8">
            <div>
                <h1 className="text-xl">Seu Controle financeiro</h1>
            </div>
            <div className="flex gap-20">
                <span className="text-xl font-semibold hover:font-light cursor-pointer">Gastos mensais</span>
                <span className="text-xl font-semibold hover:font-light cursor-pointer">Meus investimentos</span>
            </div>
            <div>
                {user ? <Logout user={user} /> : logoutDone()}
            </div>
        </section>
    );
}

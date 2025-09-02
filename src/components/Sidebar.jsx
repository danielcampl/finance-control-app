import { useState, useEffect } from "react";
import { auth } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";

import Logout from "./Logout";
import Login from "./Login";

export default function Sidebar({ children }) {
    const [user, setUser] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    }, []);

    const itemsWithProps = children.map((child, index) =>
        child.type === SidebarItem
            ? { ...child, props: { ...child.props, active: activeIndex === index, onClick: () => setActiveIndex(index) } }
            : child
    );

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm w-52">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="/images/logoBank.png" className="w-44 overflow-hidden transition-all" />
                </div>
                <ul className="flex-1 px-3">{itemsWithProps}</ul>
                <div className="border-t flex p-3">
                    <div className="leading-4">
                        {user ? <Logout user={user} /> : <Login />}
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert, onClick, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick(); // chama o onClick que altera o active
        if (to) navigate(to);   // navega para a rota
    };

    return (
        <li
            onClick={handleClick}
            className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors
            ${active
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
                    : 'hover:bg-indigo-50 text-gray-600'
                }
        `}>
            {icon}
            <span className="w-52 ml-3">{text}</span>
            {alert && (
                <div className={`absolute right-3 top-4 w-2 h-2 rounded bg-indigo-400`} />
            )}
        </li>
    )
}

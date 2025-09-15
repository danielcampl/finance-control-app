import { useState, useEffect } from "react";
import { auth } from '../firebaseConfig';
import { useNavigate, useLocation } from "react-router-dom";

import Logout from "./Logout";
import Login from "./Login";

export default function Sidebar({ children }) {
    // const [expanded, setExpanded] = useState(() => {
    //     const saved = localStorage.getItem("sidebar-expanded");
    //     return saved ? JSON.parse(saved) : false;
    // });
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
        // localStorage.setItem("sidebar-expanded", expanded);
    }, []);

    const itemsWithProps = children.map((child) =>
        child.type === SidebarItem
            ? { ...child, props: { ...child.props, active: location.pathname === child.props.to } }
            : child
    );

    return (
        <aside
            className="h-20 md:h-screen md:w-54"
        >
            <nav className="justify-around md:h-full flex md:flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="/images/logoBank.png"
                        className='w-32 md:w-44'
                        alt=""
                    />
                </div>

                <ul className="md:flex-1 px-3 flex md:block">{itemsWithProps}</ul>
                
                <div
                    className={`
              flex justify-between items-center
              overflow-hidden transition-all
          `}
                >
                    <div className="leading-4 p-6 md:p-4">
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
        if (to) navigate(to); // navega para a rota
    };

    return (
        <li
            onClick={handleClick}
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors gap-2
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all hidden md:block`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400`}
                />
            )}
        </li>
    )
}

import { useNavigate } from "react-router-dom";

export default function BankCards({ children }) {
    const itemsWithProps = children.map((child) =>
        child.type === BankCardsItem
            ? { ...child, props: { ...child.props } }
            : child
    );

    return (
        <div>
            <ul className="flex-1 px-3">{itemsWithProps}</ul>
        </div>
    )
};

export function BankCardsItem({ text, onClick, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();
        if (to) navigate(to, { replace: false });
    };

    return (
        <li
            onClick={handleClick}
            className="cursor-pointer"
        >
            <span className="w-52 ml-3">{text}</span>
        </li>
    )
}

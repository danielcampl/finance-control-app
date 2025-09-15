import {
  IoTrashBinSharp,
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

export default function GridItem({ item, onDelete, onEdit }) {
  return (
    <tr className="border-b">
      {/* Pagamento */}
      <td className="py-3 break-all hidden md:block">{item.payment}</td>

      {/* Descrição */}
      <td className="py-3 break-all text-xs md:text-base">{item.desc}</td>

      {/* Valor */}
      <td className="py-3 break-all text-xs md:text-base">{item.amount}</td>

      {/* Parcelas */}
      <td className="py-3 text-start text-xs md:text-base">{item.installments}</td>

      {/* Parcelas Pagas */}
      <td className="py-3 text-start hidden md:block">{item.paid}</td>

      {/* Data */}
      <td className="py-3 text-start text-xs md:text-base">
        {new Date(item.date).toLocaleDateString("pt-BR")}
      </td>

      <td>
        {item.type === "saida" ? (
          <IoArrowDownCircleOutline className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <IoArrowUpCircleOutline className="text-green-500 w-4 h-4 md:w-5 md:h-5" />
        )}
      </td>

      {/* Ações */}
      <td>
        <div className="flex justify-center gap-3">
          <IoTrashBinSharp
            onClick={() => onDelete(item.id)}
            className="w-4 h-4 md:w-5 md:h-5 text-red-600 cursor-pointer hover:text-red-800 transition"
          />
          <FaEdit
            onClick={() =>
              onEdit(item.id, {
                desc: item.desc,
                amount: item.amount,
                payment: item.payment,
                installments: item.installments,
                paid: item.paid,
                type: item.type,
                date: item.date,
              })
            }
            className="w-4 h-4 md:w-5 md:h-5 text-blue-600 cursor-pointer hover:text-blue-800 transition"
          />
        </div>
      </td>
    </tr>
  );
}

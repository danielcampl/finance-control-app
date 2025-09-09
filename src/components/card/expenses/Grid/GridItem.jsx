import { IoTrashBinSharp, IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import * as C from './GridStyles.js';
import { FaEdit } from "react-icons/fa";

export default function GridItem({ item, onDelete, onEdit }) {
  return (
    <C.Tr>
      {/* Pagamento (vem do select do Description) */}
      <C.Td>{item.payment}</C.Td>

      {/* Descrição */}
      <C.Td>{item.desc}</C.Td>

      {/* Valor */}
      <C.Td>{item.amount}</C.Td>

      {/* Parcelas */}
      <C.Td>{item.installments}</C.Td>

      {/* Data */}
      <C.Td>{item.date ? new Date(item.date).toLocaleDateString("pt-BR") : ""}</C.Td>

      {/* Tipo (Entrada/Saída com ícone) */}
      <C.Td>
        {item.type === "saida" ? (
          <IoArrowDownCircleOutline color="red" />
        ) : (
          <IoArrowUpCircleOutline color="green" />
        )}
      </C.Td>

      {/* Ações */}
      <C.Td className="flex gap-2">
        <IoTrashBinSharp
          onClick={() => onDelete(item.id)}
          style={{ cursor: "pointer" }}
        />
        <FaEdit
          onClick={() =>
            onEdit(item.id, {
              desc: item.desc,
              amount: item.amount,
              payment: item.payment,
              installments: item.installments,
              type: item.type,
              date: item.date,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </C.Td>
    </C.Tr>
  );
}

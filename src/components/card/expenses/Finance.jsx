import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function Finance({ income, expense, total }) {
  // Formata os valores em reais
  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
      {/* Entrada */}
      <div className="bg-green-100 p-4 rounded-xl shadow-md flex flex-col justify-center items-center md:items-baseline md:justify-normal">
        <div className="flex items-center gap-2 text-green-700">
          <IoArrowUpCircleOutline size={24} />
          <h4 className="font-semibold">Entrada</h4>
        </div>
        <p className="text-sm md:text-xl font-bold mt-2">{formatCurrency(income)}</p>
      </div>

      {/* Saída */}
      <div className="bg-red-100 p-4 rounded-xl shadow-md flex flex-col justify-center items-center md:items-baseline md:justify-normal">
        <div className="flex items-center gap-2 text-red-700">
          <IoArrowDownCircleOutline size={24} />
          <h4 className="font-semibold">Saída</h4>
        </div>
        <p className="text-sm md:text-xl font-bold mt-2">{formatCurrency(expense)}</p>
      </div>

      {/* Total */}
      <div className="bg-blue-100 p-4 rounded-xl shadow-md flex flex-col justify-center items-center md:items-baseline md:justify-normal">
        <div className="flex items-center gap-2 text-blue-700">
          <MdOutlineAttachMoney size={24} />
          <h4 className="font-semibold">Total</h4>
        </div>
        <p className="text-sm md:text-xl font-bold mt-2">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function GastosCards() {
  const navigate = useNavigate();

  const [selectedBank, setSelectedBank] = useState(null);

  const banks = [
    { name: "Nubank", path: "/dashboard/gastos/nubank", src: "/images/nubankcard.png" },
    { name: "Inter", path: "/dashboard/gastos/inter", src: "/images/intercard.png" },
    { name: "Amazon Bradescard", path: "/dashboard/gastos/amazon", src: "/images/amazoncard.png" },
    { name: "Itau", path: "/dashboard/gastos/itau", src: "/images/itaucard.png" },
    { name: "Xp Visa Infinite", path: "/dashboard/gastos/xpvisa", src: "/images/visainfinitecard.png" },
  ];

  const handleBankClick = (bank) => {
    setSelectedBank(bank.name);
    navigate(bank.path);
  };

  const handleBack = () => {
    setSelectedBank(null);
    navigate("/dashboard/gastos");
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {!selectedBank ? (
        banks.map((bank) => (
          <div
            key={bank.name}
            className="relative border rounded-sm cursor-pointer w-[220px] h-[140px] md:w-[340px] md:h-[200px] flex items-center justify-center text-white font-semibold shadow-lg hover:scale-105 transition"
            style={{
              backgroundImage: `url(${bank.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            onClick={() => handleBankClick(bank)}
          >
            <div className="absolute inset-0 bg-black/40 rounded" />
            <span className="relative z-10">{bank.name}</span>
          </div>
        ))
      ) : (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
          Voltar
        </button>
      )}
    </div>
  );
}

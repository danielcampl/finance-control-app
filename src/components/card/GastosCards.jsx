import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { auth, db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import BankCreator from "./expenses/banks/BankCreator";

export default function GastosCards() {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);

  // Carregar bancos do usuário
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const banksCol = collection(db, "users", user.uid, "banks");
    const unsubscribe = onSnapshot(banksCol, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Garante que o Pix sempre existe
      if (!data.find((b) => b.id === "pix")) {
        data.unshift({
          id: "pix",
          name: "Pix",
          src: "/images/cards/pixcard.png",
          path: "/dashboard/gastos/pix",
        });
      }

      setBanks(data);
    });

    return () => unsubscribe();
  }, []);

  const handleBankClick = (bank) => {
    setSelectedBank(bank.name);
    navigate(bank.path);
  };

  const handleBack = () => {
    setSelectedBank(null);
    navigate("/dashboard/gastos");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Gerenciar bancos */}
      <BankCreator banks={banks} />

      {/* Cards */}
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {!selectedBank ? (
          banks.map((bank) => (
            <>
              <div
                key={bank.id}
                className="relative border rounded-sm cursor-pointer w-[220px] h-[140px] md:w-[340px] md:h-[200px] flex items-center justify-center text-white font-semibold shadow-lg hover:scale-105 transition"
                style={{
                  backgroundImage: `url(${bank.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => handleBankClick(bank)}
              >
                <div className="absolute inset-0 bg-black/40 rounded" />
                <span className="relative z-10">{bank.name}</span>
              </div>
            </>
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
    </div>
  );
}

import { auth, db } from "../../../../firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { CardBody } from "@material-tailwind/react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Description from "../Description";

export default function Inter() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // busca apenas transações do usuário logado e com bankId = inter
    const col = collection(db, "users", user.uid, "transactions");
    const q = query(col, where("bankId", "==", "inter"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, []);

  // função para adicionar transação do bankid especifico
  const handleAddTransaction = async (transaction) => {
    const user = auth.currentUser;
    if (!user) return;

    const col = collection(db, "users", user.uid, "transactions");
    await addDoc(col, {
      ...transaction,
      bankId: "inter", // já definido pelo componente
      userId: user.uid,
    });
  };

  const handleBack = () => {
    navigate("/dashboard/gastos"); // volta para a lista de bancos
  };

  return (
    <CardBody>
      <button
        onClick={handleBack}
        className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100"
      >
        <FiArrowLeft size={20} />
        Voltar
      </button>
      <Description onAdd={handleAddTransaction} bankId='inter' />
    </CardBody>
  );
}

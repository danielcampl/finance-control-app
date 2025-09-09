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

import Description from "../Description";

export default function Amazon() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // busca apenas transações do usuário logado e com bankId = amazon
    const col = collection(db, "users", user.uid, "transactions");
    const q = query(col, where("bankId", "==", "amazon"));

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
      bankId: "amazon", // já definido pelo componente
      userId: user.uid,
    });
  };

  return (
    <CardBody>
      <Description onAdd={handleAddTransaction} bankId='amazon' />
    </CardBody>
  );
}

// Grid.jsx
import { useEffect } from "react";
import GridItem from "./GridItem";

import { auth, db } from "../../../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

export default function Grid({ items, setItems, bankId }) {
  // Carrega transações do Firestore
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.log("Nenhum usuário logado!");
        return;
      }

      try {
        const q = query(
          collection(db, "users", user.uid, "transactions"),
          where("bankId", "==", bankId),
          orderBy("date", "asc") // 👈 ordena pela data crescente (antigo → recente)
        );

        const querySnapshot = await getDocs(q);
        const transactions = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setItems(transactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchData();
  }, [bankId, setItems]);

  // Excluir transação
  const onDelete = async (ID) => {
    try {
      const newArr = items.filter((transaction) => transaction.id !== ID);
      setItems(newArr);

      const user = auth.currentUser;
      await deleteDoc(doc(db, "users", user.uid, "transactions", ID));
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  // Editar transação
  const onEdit = async (ID, updatedData) => {
    alert('Função ainda não implementada');
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid, "transactions", ID);

      await updateDoc(docRef, updatedData);

      // Atualiza localmente
      setItems((prev) =>
        prev.map((item) => (item.id === ID ? { ...item, ...updatedData } : item))
      );
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

  return (
    <div className="w-full max-w-[1120px] max-h-[390px] mx-auto my-2 p-4 bg-[#f1f2f6] text-[#27187e] shadow-md rounded-lg">
      <div className="max-h-[290px] overflow-y-auto overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-[#f1f2f6] shadow">
            <tr>
              <th className="w-[10%] pb-2 border-b hidden md:block">Pagamento</th>
              <th className="w-[30%] pb-2 border-b text-xs md:text-base">Descrição</th>
              <th className="w-[10%] pb-2 border-b text-xs md:text-base">Valor</th>
              <th className="w-[10%] pb-2 border-b text-xs md:text-base">Parcelas</th>
              <th className="w-[10%] pb-2 border-b hidden md:block">Pagas</th>
              <th className="w-[10%] pb-2 border-b text-xs md:text-base">Data</th>
              <th className="w-[10%] pb-2 border-b text-xs md:text-base">Tipo</th>
              <th className="w-[5%] pb-2 border-b text-xs md:text-base"></th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

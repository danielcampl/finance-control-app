// Grid.jsx
import { useEffect } from "react";
import * as C from "./GridStyles";
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
          where("bankId", "==", bankId) // filtra pelo banco atual
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
    <C.Table>
        <C.Thead>
          <C.Tr>
            <C.Th width={10}>Pagamento</C.Th>
            <C.Th width={40}>Descrição</C.Th>
            <C.Th width={10}>Valor</C.Th>
            <C.Th width={10}>Parcelas</C.Th>
            <C.Th width={10}>Data</C.Th>
            <C.Th width={10}>Tipo</C.Th>
            <C.Th width={10}></C.Th>
          </C.Tr>
        </C.Thead>
        <C.Tbody>
          {items?.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </C.Tbody>
    </C.Table>
  );
}

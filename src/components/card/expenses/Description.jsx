import { useState, useEffect } from "react";
import Select from "react-select";
import { auth, db } from "../../../firebaseConfig";
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Grid from "./Grid/Grid";
import Finance from "./Finance";

export default function Description({ transaction, bankId }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [payment, setPayment] = useState(null);
  const [installments, setInstallments] = useState(null);
  const [paid, setPaid] = useState(null);
  const [type, setType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "users", user.uid, "transactions"),
          where("bankId", "==", bankId) // filtra pelo banco atual
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTransactionsList(data);
        });

        return () => unsubscribeSnapshot();
      } else {
        setTransactionsList([]);
      }
    });

    return () => unsubscribe();
  }, [bankId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Salvar nova transação no Firestore
  const handleSaveForm = async (e) => {
    e.preventDefault();
    if (!type) {
      alert("Selecione um tipo!");
      return;
    }
    if (!payment) {
      alert("Selecione uma forma de pagamento!");
      return;
    }
    if (!desc || !amount) {
      alert("Informe uma descrição e um valor");
      return;
    }
    if (amount < 1) {
      alert("O valor deve ser positivo");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Usuário não logado!");
      return;
    }

    const newTransaction = {
      uid: user.uid,
      bankId, // adiciona o banco recebido por prop
      desc,
      amount: parseFloat(amount),
      expense: isExpense,
      payment: payment?.value || "",
      installments: installments?.value || 'À Vista',
      paid: paid?.value || 1,
      type: type?.value || "",
      date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "users", user.uid, "transactions"), newTransaction);

      // limpa inputs
      setDesc("");
      setAmount("");
      setPayment(null);
      setInstallments(null);
      setPaid(null);
      setType(null);
      setExpense(false);
      setSelectedDate(null);
    } catch (err) {
      console.error("Erro ao salvar transação:", err);
    }
  };

  const optionsPayment = [
    { value: "Crédito", label: "Crédito" },
    { value: "Débito", label: "Débito" },
    { value: "Pix", label: "Pix" },
    { value: "Dinheiro", label: "Dinheiro" },
  ];

  const optionsInstallment = Array.from({ length: 12 }, (_, i) => ({
    value: i === 0 ? "À Vista" : `${i + 1}x`,
    label: i === 0 ? "À Vista" : `${i + 1}x`,
  }));

  const paidInstallments = Array.from({ length: 12 }, (_, i) => ({
    value: i === 0 ? "1" : `${i + 1}`,
    label: i === 0 ? "1" : `${i + 1}`,
  }));

  const optionsType = [
    { value: "entrada", label: "Entrada" },
    { value: "saida", label: "Saída" },
  ];

  // calcula resumo
  const income = transactionsList
    .filter((t) => t.type === "entrada")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const expense = transactionsList
    .filter((t) => t.type === "saida")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);

  const total = income - expense;

  return (
    <section className="flex flex-col gap-2 items-center">
      <div className="p-2 w-full max-w-[1120px] flex flex-col gap-4">
        <Finance income={income} expense={expense} total={total} />
        <div className="flex flex-col md:flex-row w-full gap-6 items-center">
          <div className="md:flex gap-4">
            <div className="flex flex-col">
              <span>Forma de Pagamento</span>
              <Select
                id="payment"
                options={optionsPayment}
                value={payment}
                onChange={setPayment}
                isClearable
                placeholder='Selecione'
              />
              <input
                type="hidden"
                name="payment"
                value={payment ? payment.value : ""}
                required
              />
            </div>
            <div className="flex flex-col">
              <span>Valor</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-1 w-40"
                placeholder='Valor'
                required
              />
            </div>
          </div>
          <div className="md:flex gap-4">
            <div className="flex flex-col">
              <span>Parcelas</span>
              <Select
                options={optionsInstallment}
                value={installments}
                onChange={setInstallments}
                placeholder='À vista'
              />
            </div>
            <div className="flex flex-col">
              <span>Parcelas Pagas</span>
              <Select
                options={paidInstallments}
                value={paid}
                onChange={setPaid}
                placeholder='Padrão 1'
              />
            </div>
            <div className="flex flex-col">
              <span>Tipo</span>
              <Select
                options={optionsType}
                value={type}
                onChange={setType}
                placeholder='Tipo'
                isClearable
              />
              <input
                type="hidden"
                value={type ? type.value : ""}
                required
              />
            </div>
          </div>

        </div>
        <div className="flex flex-col md:flex-row w-full justify-start gap-8 items-start md:items-end">
          <div className="flex flex-col w-full max-w-[420px]">
            <span>Descrição</span>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-8 p-2"
              placeholder='Escreva uma descrição'
              required
            />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex flex-col">
              <span>Data</span>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText={new Date().toLocaleDateString("pt-BR", { year: 'numeric', month: 'short', day: 'numeric' })}
                className="w-full h-8 p-2"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveForm}
              className="w-44 h-10 font-sans font-semibold text-white bg-[#212529] hover:bg-[#343a40]"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
      <Grid
        items={transactionsList}
        setItems={setTransactionsList}
        transaction={transaction}
      />
    </section>
  );
}

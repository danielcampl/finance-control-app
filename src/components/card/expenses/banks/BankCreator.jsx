import { useState } from "react";
import Select from "react-select";
import { auth, db } from "../../../../firebaseConfig";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";

export default function BankCreator({ banks }) {
    const [name, setName] = useState(null);

    const handleCreateBank = async () => {
        const user = auth.currentUser;
        if (!user) return;

        if (!name) {
            alert("Digite o nome do banco!");
            return;
        }

        // Gera o id baseado no nome
        const id = name.toLowerCase().replace(/\s+/g, "");

        const bankDoc = doc(db, "users", user.uid, "banks", id);

        await setDoc(bankDoc, {
            id,
            name,
            src: `/images/cards/${id}card.png`,
            path: `/dashboard/gastos/${id}`,
        });

        setName(null);
    };

    const options = [
        { name: "Nubank", label: "Nubank" },
        { name: "Inter", label: "Inter" },
        { name: "Itau", label: "Itau" },
        { name: "Amazon", label: "Amazon" },
        { name: "XP Visa", label: "XP Visa" },
        { name: "Bradesco", label: "Bradesco" },
        { name: "BSB", label: "BSB" },
        { name: "BTG", label: "BTG" },
        { name: "C6", label: "C6" },
        { name: "Caixa", label: "Caixa" },
        { name: "Santander", label: "Santander" },
    ];

    const handleDeleteBank = async (id) => {
        const user = auth.currentUser;
        if (!user) return;

        if (id === "pix") {
            alert("O banco Pix não pode ser apagado.");
            return;
        }

        await deleteDoc(doc(db, "users", user.uid, "banks", id));
    };

    return (
        <div className="p-4 border rounded-md shadow-md bg-white flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Gerenciar Bancos</h2>

            {/* Select para criar um banco ja existente na base de dados */}
            <div className="flex gap-2">
                <Select
                    placeholder="Nome do banco"
                    options={options}
                    value={options.find(option => option.name === name) || null}
                    onChange={(selectedOption) => setName(selectedOption.name)}
                />
                <button
                    onClick={handleCreateBank}
                    className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                >
                    Adicionar
                </button>
            </div>

            {/* Lista de bancos com botão deletar */}
            <div className="flex flex-col gap-2">
                {banks.map((bank) => (
                    <div
                        key={bank.id}
                        className="flex items-center justify-between border p-2 rounded"
                    >
                        <span>{bank.name}</span>
                        {bank.id !== "pix" && (
                            <button
                                onClick={() => handleDeleteBank(bank.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Remover
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

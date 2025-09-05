import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

export default function Usuário() {
    const [getUserData, setGetUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser; // pega o usuário logado

            if (user) {
                try {
                    // uid do usuário logado
                    const userRef = doc(db, "users", user.uid);

                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setGetUserData(userSnap.data());
                    } else {
                        console.log("Usuário não encontrado no Firestore!");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                }
            } else {
                console.log("Nenhum usuário logado!");
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Descrição:</h1>
            {getUserData ? <pre>{JSON.stringify(getUserData, null, 2)}</pre> : "Carregando..."}
        </div>
    );
}

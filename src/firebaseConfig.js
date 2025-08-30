import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGKkFy20wOLtIp3p0K8gCurW3sf5AwtHI",
  authDomain: "finance-control-e3058.firebaseapp.com",
  databaseURL: "https://finance-control-e3058-default-rtdb.firebaseio.com",
  projectId: "finance-control-e3058",
  storageBucket: "finance-control-e3058.firebasestorage.app",
  messagingSenderId: "952148110026",
  appId: "1:952148110026:web:cb974e24833c315a4aa233"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Criar conta
function register(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

// Fazer login
function login(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// Salvar dados no banco
async function saveUserData(userId, dados) {
  await setDoc(doc(db, "usuarios", userId), dados);
}

// Buscar dados
async function loadUserData(userId) {
  const docSnap = await getDoc(doc(db, "usuarios", userId));
  return docSnap.exists() ? docSnap.data() : null;
}

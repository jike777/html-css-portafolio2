// ✅ Importar Firebase y sus servicios
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js';

// ✅ Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAxFIewjm7NgaBXancuoA6BzyonLCF1dUE',
  authDomain: 'online-juan-salvador-s-shop.firebaseapp.com',
  projectId: 'online-juan-salvador-s-shop',
  storageBucket: 'online-juan-salvador-s-shop.appspot.com',
  messagingSenderId: '647880929473',
  appId: '1:647880929473:web:93996081d68d36324b2440',
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Exportar la instancia de autenticación y el proveedor de Google
export { auth, provider };

// ✅ Importar Firebase desde firebase-config.js
import { auth, provider } from '../firebase-config.js';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-btn');
  const userInfo = document.getElementById('user-menu');
  const userName = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout-btn');

  // 🟢 Escuchar cambios en la autenticación
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('🔒 Usuario autenticado:', user.displayName);

      // ✅ Mostrar nombre del usuario
      if (userName) userName.textContent = user.displayName;

      // ✅ Mostrar info del usuario en el nav
      if (userInfo) userInfo.style.display = 'inline-block';

      // ✅ Ocultar el botón de login si existe
      if (loginButton) loginButton.style.display = 'none';
    } else {
      console.log('🚪 No hay usuario autenticado');
      if (userInfo) userInfo.style.display = 'none'; // Ocultar info del usuario
    }
  });

  // 🟢 Inicio de sesión con Google
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log('✅ Usuario autenticado:', result.user);
          window.location.href = 'index.html'; // Redirigir al home
        })
        .catch((error) => {
          console.error('❌ Error en autenticación:', error);
          alert('Error al iniciar sesión. Intenta de nuevo.');
        });
    });
  }

  // 🟢 Cerrar sesión
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault(); // ❗ Evita que el enlace recargue la página
      signOut(auth)
        .then(() => {
          console.log('🚪 Usuario cerró sesión');
          window.location.href = 'auth.html'; // Volver a la página de login
        })
        .catch((error) => {
          console.error('❌ Error al cerrar sesión:', error);
        });
    });
  }
});

//📌 Navegación - Menú Hamburguesa
// Maneja la apertura y cierre del menú en dispositivos móviles de forma dinámica.

var menu = document.getElementById('navbar');
var bar = document.getElementById('bar');
var close = document.getElementById('close');
bar.addEventListener('click', function () {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  } else {
    menu.classList.add('active');
  }
});
close.addEventListener('click', function () {
  menu.classList.remove('active');
});

//📌 Productos - Carga de productos
// Carga los productos desde el archivo JSON y los muestra en la página principal.
document.addEventListener('DOMContentLoaded', () => {
  fetch('productos.json')
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.querySelector('.pro-container');
      productContainer.innerHTML = ''; // Limpiar productos existentes

      data.forEach((product) => {
        const productHTML = `
          <div class="pro" onclick="window.location.href='product.html?id=${
            product.id
          }'">
            <img src="${product.imagen}" alt="${product.nombre}" />
            <div class="des">
              <span>${product.marca}</span>
              <h5>${product.descripcion}</h5>
              <div class="star">
                ${'<i class="fas fa-star"></i>'.repeat(product.estrellas)}
                ${'<i class="far fa-star"></i>'.repeat(5 - product.estrellas)}
              </div>
              <h4>$${product.precio.toLocaleString()} Pesos</h4>
            </div>
            <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
          </div>
        `;
        productContainer.innerHTML += productHTML;
      });
    })
    .catch((error) => console.error('Error al cargar los productos:', error));
});

//📌 Página de Detalles del Producto
// Captura el ID del producto desde la URL y carga sus detalles dinámicamente en la página de descripción.

document.addEventListener('DOMContentLoaded', () => {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Verificar si estamos en la página de detalles del producto antes de ejecutar el código
  if (!productId || !document.querySelector('#MainImg')) return;

  // Cargar los productos desde el archivo JSON
  fetch('productos.json')
    .then((response) => response.json())
    .then((data) => {
      // Buscar el producto con el ID correspondiente
      const product = data.find((p) => p.id == productId);
      if (!product) {
        console.error('Producto no encontrado');
        return;
      }

      // Actualizar la imagen principal
      document.querySelector('#MainImg').src = product.imagen;

      // Actualizar la descripción y precio del producto
      document.querySelector('.simgle-pro-details h4').textContent =
        product.descripcion;
      document.querySelector(
        '.simgle-pro-details h2'
      ).textContent = `$${product.precio.toLocaleString()} Pesos`;
    })
    .catch((error) => console.error('Error al cargar el producto:', error));
});

//📌 Página de Detalles del Producto
// Captura el ID del producto desde la URL y carga sus detalles dinámicamente en la página de descripción.

document.addEventListener('DOMContentLoaded', () => {
  //📌 Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  //📌 Verificar si estamos en la página de detalles del producto antes de ejecutar el código
  if (!productId || !document.querySelector('#MainImg')) return;

  //📌 Cargar los productos desde el archivo JSON
  fetch('productos.json')
    .then((response) => response.json())
    .then((data) => {
      //📌 Buscar el producto con el ID correspondiente
      const product = data.find((p) => p.id == productId);
      if (!product) {
        console.error('❌ Producto no encontrado');
        return;
      }

      //📌 Actualizar la imagen principal del producto
      document.querySelector('#MainImg').src = product.imagen;

      //📌 Actualizar la categoría del producto (Ejemplo: "Mountains / Trekking Bags")
      document.querySelector('.simgle-pro-details h6').textContent =
        product.categoria;

      //📌 Actualizar la descripción del producto
      document.querySelector('.simgle-pro-details h4').textContent =
        product.descripcion;

      //📌 Actualizar el precio del producto con formato de moneda
      document.querySelector(
        '.simgle-pro-details h2'
      ).textContent = `$${product.precio.toLocaleString()} Pesos`;

      //📌 Actualizar la información técnica del producto
      document.querySelector('.simgle-pro-details span').textContent =
        product.info_tecnica;

      //📌 Actualizar las imágenes pequeñas del producto
      const smallImgGroup = document.querySelector('.small-img-group');
      smallImgGroup.innerHTML = ''; //📌 Limpiar imágenes anteriores antes de agregar nuevas

      //📌 Insertar dinámicamente las imágenes en miniatura
      product.imagenes.forEach((imgSrc) => {
        const div = document.createElement('div');
        div.classList.add('small-img-col');
        div.innerHTML = `<img src="${imgSrc}" width="100%" class="small-img" alt="Imagen del producto">`;
        smallImgGroup.appendChild(div);
      });

      //📌 Agregar funcionalidad para cambiar la imagen principal al hacer clic en una imagen pequeña
      document.querySelectorAll('.small-img').forEach((img) => {
        img.addEventListener('click', function () {
          document.querySelector('#MainImg').src = this.src;
        });
      });

      //📌 Insertar colores en el `<select>`
      const colorSelect = document.querySelector('.simgle-pro-details select');
      colorSelect.innerHTML = '<option>Selecciona un color</option>';

      if (product.colores && product.colores.length > 0) {
        // Verificar si el producto tiene colores
        product.colores.forEach((color) => {
          const option = document.createElement('option');
          option.textContent = color;
          colorSelect.appendChild(option);
        });
      } else {
        colorSelect.innerHTML += '<option>No hay colores disponibles</option>';
      }

      console.log(`✅ Producto cargado: ${product.nombre}`);
    })
    .catch((error) => console.error('❌ Error al cargar el producto:', error));
});

//Autenticacion para Google
// Importar las funciones necesarias desde Firebase

/* // ✅ Importar Firebase correctamente
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
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

// ✅ Función para iniciar sesión con Google
function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('✅ Usuario autenticado:', result.user);
      alert(`Bienvenido, ${result.user.displayName}!`);
    })
    .catch((error) => {
      console.error('❌ Error en autenticación:', error);
    });
}

// ✅ Escuchar cambios en la autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('🔒 Usuario sigue autenticado:', user);

    // Ocultar el botón de login
    document.getElementById('auth-section').style.display = 'none';

    // Mostrar contenido del home
    document.getElementById('shop-section').style.display = 'block';

    // Mostrar nombre del usuario
    document.getElementById(
      'user-info'
    ).innerHTML = `<h2>Bienvenido, ${user.displayName}</h2>`;
  } else {
    console.log('🚪 No hay usuario autenticado');

    // Mostrar el login y ocultar el contenido del home
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('shop-section').style.display = 'none';
  }
});

// ✅ Asegurarse de que el botón de login exista antes de asignarle el evento
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-btn');
  if (loginButton) {
    loginButton.addEventListener('click', signInWithGoogle);
  } else {
    console.error('❌ Error: No se encontró el botón de inicio de sesión.');
  }
});
*/

import { auth } from './firebase-config.js';
import {
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const userMenu = document.getElementById('user-menu'); // ✅ Aquí debe ser userMenu
  const userNameElement = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout-btn');
  const shopSection = document.getElementById('shop-section');

  // 🟢 Escuchar cambios en la autenticación
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('🔓 Usuario autenticado:', user.displayName || user.email);

      // ✅ Mostrar la tienda
      if (shopSection) shopSection.style.display = 'block';

      // ✅ Mostrar nombre del usuario en el navbar
      if (userMenu && userNameElement) {
        // ✅ Ahora userMenu está bien definido
        userNameElement.textContent = user.displayName
          ? user.displayName
          : user.email;
        userMenu.style.display = 'block'; // ✅ Mostrar menú de usuario
      }
    } else {
      console.warn('🚪 Usuario no autenticado, redirigiendo a auth.html...');

      // ❌ Ocultar el menú de usuario si no hay sesión activa
      if (userMenu) userMenu.style.display = 'none';

      window.location.href = 'auth.html'; // 🔄 Redirigir si no está autenticado
    }
  });

  // 🟢 Cerrar sesión
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          console.log('🚪 Usuario cerró sesión');
          window.location.href = 'auth.html'; // Volver a login
        })
        .catch((error) => {
          console.error('❌ Error al cerrar sesión:', error);
        });
    });
  }
});

// 📌 Cargar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// 📌 Función para mostrar los productos en el carrito
function mostrarCarrito() {
  const tbody = document.querySelector('#cart tbody');
  tbody.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    let subtotal = producto.precio * producto.cantidad;
    total += subtotal; // 🔥 Sumar el subtotal al total

    const fila = document.createElement('tr');
    fila.innerHTML = `
            <td><a href="#" onclick="eliminarDelCarrito(${index})"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)"></td>
            <td class="subtotal">$${subtotal}</td>
        `;
    tbody.appendChild(fila);
  });

  // 📌 Actualizar el subtotal y total en la tabla
  document.querySelector('#subtotal-carrito').innerText = `$${total}`;
  document.querySelector('#total-carrito').innerText = `$${total}`;
}

// 📌 Función para actualizar la cantidad de un producto
function actualizarCantidad(index, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad);
  if (nuevaCantidad < 1) nuevaCantidad = 1; // Evitar cantidades negativas o 0

  carrito[index].cantidad = nuevaCantidad;
  localStorage.setItem('carrito', JSON.stringify(carrito));

  mostrarCarrito(); // 🔥 Recalcular todo después del cambio
}

// 📌 Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// 📌 Cargar el carrito cuando la página esté lista
document.addEventListener('DOMContentLoaded', mostrarCarrito);

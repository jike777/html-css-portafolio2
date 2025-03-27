// Función para agregar el producto desde la página de detalles (producto.html)
function agregarAlCarritoDesdeProducto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id == productId);
            if (!producto) return;

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            let productoExistente = carrito.find(p => p.id == producto.id);

            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                producto.cantidad = 1;
                carrito.push(producto);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert(`${producto.nombre} se ha agregado al carrito.`);
        })
        .catch(error => console.error("Error al agregar producto:", error));
}

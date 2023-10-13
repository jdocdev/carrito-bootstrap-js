// variables
const carrito = document.querySelector("#carrito-menu");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const limpiarCarritoBtn = document.querySelector("#limpiar-carrito");
const listaProductos = document.querySelector("#listado-productos");
let productosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // cuando se agrega un curso desde el boton añadir al carrito
  listaProductos.addEventListener("click", agregarCurso);
  // Eliminar productos del carrito
  carrito.addEventListener("click", eliminarProducto);
  // limpiar el carrito
  limpiarCarritoBtn.addEventListener("click", (e) => {
    // Resetear el carrito
    productosCarrito = [];
    // Limpiar el html
    limpiarHTML();   
    // Evita que el evento se propague a los elementos secundarios
    e.stopImmediatePropagation(); 
  });
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado =
      e.target.parentElement.parentElement.parentElement;
    leerDatosProducto(productoSeleccionado);
  }
}

// Elimina productos del carrito
function eliminarProducto(e) {
  const img = e.target.closest(".eliminar-producto");
  if (img) {
    const productoId = img.getAttribute("data-id");

    //   elimina el producto del carrito por el data-id
    productosCarrito = productosCarrito.filter(
      (producto) => producto.id !== productoId
    );
    console.log(productosCarrito);

    //iterar sobre el carrito y mostrarlo actualizado
    carritoHTML();

    // Evita que el evento se propague a los elementos secundarios
    e.stopPropagation();
  }
}

function leerDatosProducto(producto) {
  // console.log(producto);

  // Crear un objeto con el contenido del producto actual
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h5").textContent,
    precio: producto.querySelector("h4").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //   Comprobar si existe un elemento y actualizar la cantidad
  const existe = productosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );
  if (existe) {
    // actualizamos la cantidad
    const productos = productosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; //retorna objeto con cantidad actualizada
      } else {
        return producto; //retorna el objeto con la cantidad de 1
      }
    });
    productosCarrito = [...productos];
  } else {
    // Agrega productos al arreglo del carrito
    productosCarrito = [...productosCarrito, infoProducto];
  }

  //   console.log(productosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras en el html
function carritoHTML() {
  // Limpiar el html
  limpiarHTML();

  // recorre el carrito y genera el html
  productosCarrito.forEach((producto) => {
    const { imagen, titulo, precio, cantidad, id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
               <img src='${imagen}' width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class='eliminar-producto' data-id="${id}"> <img src="img/x-circle.svg" alt="" width="30" height="24"> </a>
            </td>
        `;

    // Agrega el html del carrito en tbody
    contenedorCarrito.appendChild(row);
  });
}

// elimina los cursos del tbody
function limpiarHTML() {
  // forma lenta
  contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

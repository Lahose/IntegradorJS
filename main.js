import { renderCategories } from './src/services/categories';
import { handleGetProductLocalStorage, setInLocalStorage } from './src/services/persistence/localStorage';
import { handleSearchProductByName } from './src/services/searchBar';
import { handleGetProductsToStore, handleRenderList } from './src/views/store';
import Swal from "sweetalert2"
import "./style.css";

export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};

// Filtrado de categorías

export const handleFilterProductByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todos":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Bebidas":
            const result = products.filter((el) => el.categoria === categoryIn);
            handleRenderList(result);
            break;
        case "mayorPrecio":
            const resultMayorPrecio = products.sort((a, b) => b.precio - a.precio);
            handleRenderList(resultMayorPrecio);
            break;
        case "menorPrecio":
            const resultMenorPrecio = products.sort((a, b) => a.precio - b.precio);
            handleRenderList(resultMenorPrecio);
            break;
        default:
            break;
    }
};

export let productoActivo = null;

export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn;
};

// Funciones del modal

export const abrirModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    if (productoActivo) {
        deleteButton.style.display = "block"
    } else {
        deleteButton.style.display = "none"
    }
    
    if (productoActivo) {
        const nombre = document.getElementById("nombre");
        const imagen = document.getElementById("imagen");
        const precio = document.getElementById("precio");
        const categoria = document.getElementById("selecCat");

        nombre.value = productoActivo.nombre;
        imagen.value = productoActivo.imagen;
        precio.value = productoActivo.precio;
        categoria.value = productoActivo.categoria;
    }
};

const resetModal = () => {
    const nombre = document.getElementById("nombre");
    const imagen = document.getElementById("imagen");
    const precio = document.getElementById("precio");
    const categoria = document.getElementById("selecCat");

    nombre.value = "";
    imagen.value = "";
    precio.value = 0;
    categoria.value = "";
};

export const cerrarModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    setProductoActivo(null)
    resetModal();
};

const aceptar = document.getElementById("aceptar");
aceptar.addEventListener("click", (event) => {
    event.preventDefault();
    handleSaveorModifyElements();
});

const openModal = document.getElementById("openModal");
openModal.addEventListener("click", () => {
    abrirModal();
});

const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
    cerrarModal();
});

const cancelar = document.getElementById("cancelar");
cancelar.addEventListener("click", () => {
    cerrarModal();
});

const deleteButton = document.getElementById("eliminar")
deleteButton.addEventListener("click", (event)=>{
    event.preventDefault()
    handleDeleteProduct()
})

const buttonSearch = document.getElementById("botonBuscar")
buttonSearch.addEventListener("click", ()=>{
    handleSearchProductByName()
})

// Creación o modificación de productos

const handleSaveorModifyElements = () => {
    const nombre = document.getElementById("nombre").value;
    const imagen = document.getElementById("imagen").value;
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("selecCat").value;

    let object = null;

    if (productoActivo) {
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categoria,
        };
    } else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categoria,
        };
    }
    Swal.fire({
        title: "¡Correcto!",
        text: "¡Producto cargado con éxito!",
        icon: "success"
      });

    setInLocalStorage(object);
    handleGetProductsToStore();
    cerrarModal();
};

// Render de productos

window.addEventListener("DOMContentLoaded", () => {
    handleGetProductsToStore();
    renderCategories();
});

// Eliminación de productos

export const handleDeleteProduct = () => {
    if (!productoActivo) {
        Swal.fire({
            title: "Error",
            text: "No hay producto seleccionado para eliminar",
            icon: "error",
        });
        return;
    }

    Swal.fire({
        title: "¿Seguro que queres eliminar el producto?",
        text: "No vas a poder revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, borralo!"
    }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id); // Aquí es donde se usa productoActivo.id
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            cerrarModal();
        } else {
            cerrarModal();
        }
    });
}

// Funciones para realizar ciertas acciones al presionar ciertas teclas.

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
        if (isNotCombinedKey) {
            cerrarModal()
        }
    }
});

const inputSearch = document.getElementById("inputSearch")
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
        const isInputFocused = document.activeElement === inputSearch
        if (isNotCombinedKey && isInputFocused) {
            handleSearchProductByName()
        }
    }
});
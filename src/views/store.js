import { abrirModal, setProductoActivo } from "../../main"
import { handleGetProductLocalStorage } from "../services/persistence/localStorage"

export const handleGetProductsToStore = ()=> {
    const products = handleGetProductLocalStorage()
    handleRenderList(products)
}

export const handleRenderList = (productosIn)=>{
    const todos = productosIn.filter((el)=> el.categoria === "Todos")
    const hamburguesas = productosIn.filter((el)=> el.categoria === "Hamburguesas")
    const papas = productosIn.filter((el)=> el.categoria === "Papas")
    const bebidas = productosIn.filter((el)=> el.categoria === "Bebidas")
    const mayorPrecio = productosIn.filter((el)=> el.categoria === "mayorPrecio")
    const menorPrecio = productosIn.filter((el)=> el.categoria === "menorPrecio")

    const renderProductGroup = (productos, title) => {

        if(productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `
                <div class="productCard" id="product-${producto.categoria}-${index}">
                    <img src='${producto.imagen}'/>
                    <span class="productCategory">${producto.categoria}</span>
                    <p class="productName">${producto.nombre}</p>
                    <span class="productPrice"><b>Precio:</b> $${producto.precio}</span>
                </div>
                `
            })
            return `
            <section class="categoriesContainer">
                <h3 class="categoryTitle">${title}</h3>
                <div class="categoriasProductos">${productosHTML.join("")}</div>
            </section>
            `
        } else {
            return ""
        }
    }

    const appContainer = document.getElementById("store")

    appContainer.innerHTML = `
    ${renderProductGroup(hamburguesas, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(bebidas, "Bebidas")}
    `

    const addEvents = (productsIn)=> {
        if(productsIn) {
            productsIn.forEach((element, index) => {
                const productContainer = document.getElementById(`product-${element.categoria}-${index}`)

                productContainer.addEventListener("click", () => {
                    setProductoActivo(element)
                    abrirModal()
                })
            })
        }
        }
        addEvents(hamburguesas)
        addEvents(papas)
        addEvents(bebidas)
    }
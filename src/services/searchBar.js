import { handleRenderList } from "../views/store"
import { handleGetProductLocalStorage } from "./persistence/localStorage"

export const handleSearchProductByName = () => {
    const inputSearch = document.getElementById("inputSearch")
    const products = handleGetProductLocalStorage()

    const result = products.filter((el)=>el.nombre.toLowerCase().includes(inputSearch.value))

    handleRenderList(result)
}
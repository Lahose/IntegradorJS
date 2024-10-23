import { handleFilterProductByCategory } from "../../main";

export const renderCategories = ()=> {
    const ulList = document.getElementById("listFilter");
    ulList.innerHTML =`
    <li id="Todos">Todos los Productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Bebidas">Bebidas</li>
    <li id="mayorPrecio">Mayor precio</li>
    <li id="menorPrecio">Menor precio</li>
    `;
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement)=>{
        liElement.addEventListener('click',()=>{
            handleClick(liElement);
        });
    });
    const handleClick = (elemento)=>{
        handleFilterProductByCategory(elemento.id)
        liElements.forEach((el)=>{
            if(el.classList.contains('liActive')){
                el.classList.remove("liActive");
            }else{
                if(elemento === el){
                    el.classList.add("liActive");
                }
            }
        })

    }
};

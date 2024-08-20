/*[13:02, 1/8/2024] Alex Boza: alexboza.asd@gmail.com
[13:02, 1/8/2024] Alex Boza: contraseña es
[13:02, 1/8/2024] Alex Boza: Nalaychucho1
import axios from "axios"


//OBTENER LISTA DE REGALOS 
export const get_gifts = async(setGift,navigate) =>{
    //setGift es una funcion que modifica el estado del componente 
    try {
        const {data} = await axios("https://sheet.best/api/sheets/528ef662-8551-4ab5-8f04-f0f4e964b1b0?raw=1");

        //solo enviaremos aquellos elementos cuyo status sea igual a "no" es decir que aun falta elegir.
        const  gift_list = data.filter((g)=> g.selected === "no" && g)
        setGift(gift_list)

    } catch (error) {
        //validar y arrojar error
        console.log("Error en la peticion de lista de regalos", {error:error.message})
        navigate("/Error");
        throw Error("Ocurrio un error")
    }
}
    https://docs.google.com/spreadsheets/d/10YXUiHzG0wEo4fy4P4Hw3AsKdMWQlkXPeNVmzm-x0DA

*/

/*obtner la imagen aca para enviar con cada objeto  */

import axios from 'axios'
import tv from '../assets/items_img/tv.svg'
import cestobasura from '../assets/items_img/cestobasura.svg'
import cestoropa from '../assets/items_img/cestoropa.svg'
import contenedorhermetico from '../assets/items_img/contenedorhermetico.svg'
import cubiertos from '../assets/items_img/cubiertos.svg'
import frascos from '../assets/items_img/frascos.svg'
import licuadora from '../assets/items_img/licuadora.svg'
import mesaysillas from '../assets/items_img/mesaysillas.svg'
import ollas from '../assets/items_img/ollas.svg'
import pava from '../assets/items_img/pava.svg'
import plancha from '../assets/items_img/plancha.svg'
import tablaplancha from '../assets/items_img/tablaplancha.svg'
import toallas from '../assets/items_img/toallas.svg'

const icons = {
    tv,
    cestobasura,
    cestoropa,
    contenedorhermetico,
    cubiertos,
    frascos,
    licuadora,
    mesaysillas,
    ollas,
    pava,
    plancha,
    tablaplancha,
    toallas
} 


export const GET_LIST = async(setList, navigate) =>{
    try {
        const {data} = await axios('https://sheet.best/api/sheets/be35202d-7b9b-4682-a82c-a30f9a9ee3b7?_raw=1')
        //añado las imagenes a los items 
        data.forEach((item)=>{
            if (item.icon) {
                item.img = icons[item.icon]                
            } 
        });
  
        setList(data)
    } catch (error) {
        
    }
}


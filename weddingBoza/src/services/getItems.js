
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


export const GET_LIST = async( navigate) =>{
    try {
        const result = await axios('https://sheet.best/api/sheets/be35202d-7b9b-4682-a82c-a30f9a9ee3b7?_raw=1')
        result.data = result.data.filter(e => e.status !== 'completed')
        result.data.forEach((item)=>{
            if (item.icon) {
                item.img = icons[item.icon]                
            } 
        });
        return  result
    } catch (error) {
        console.log("Error en la peticion de lista de regalos", {error:error.message})
        navigate("/Error");
        throw Error("Error en la peticion de lista de regalos")
    }
}

export const GET_ITEM = async( id,navigate) =>{
    try {
        const result = await axios(`https://sheet.best/api/sheets/be35202d-7b9b-4682-a82c-a30f9a9ee3b7/id/${id}`)

        if (result.data[0].status !== "" ) {
            result.data[0].msg= "Este regalo ya fue selecionado"  
            return result
        }
        if (result.data[0].icon) {
            result.data[0].img = icons[result.data[0].icon]                
        } 
        return  result
    } catch (error) {
        console.log("Error al obtener un item por id", {error:error.message})
        navigate("/error");
        throw Error("Error en la peticion de lista de regalos")
    }
}


export const UPDATE_ITEM = async(item, guest) =>{
    let UpdateItem = {}
    /*CASOS DE SELECION 
        CANTIDAD     DIVIDE
        1           1    EJ SET BAÑO  *
        1           N    EJ MESA      *
        N           1    EJ ALMOHADAS
    
    */
    try {   
        if(parseInt(item.amount) > 1 && parseInt(item.divide ) === 1){
            UpdateItem.amount = item.amount - 1
            UpdateItem.Guests = item.Guests + ' ' + guest;
            

            if (UpdateItem.amount  === 0) {
                UpdateItem.status = 'completed'
            }
        }
        else if (parseInt(item.amount) === 1 && parseInt(item.divide )> 1) {
            UpdateItem.Committed = parseInt(item.Committed) + 1;
            UpdateItem.Guests = item.Guests + ' ' + guest;
            if (parseInt(UpdateItem.Committed ) === parseInt(item.divide)) {
                UpdateItem.status = 'completed'
            } 
            
        } 
        else if (parseInt(item.divide) === 1 && parseInt(item.amount) === 1) {
            /*un elemento que puede ser solicitado por un invitado */
            UpdateItem.Guests = item.Guests + ' ' + guest;
            UpdateItem.amount = item.amount - 1

            if (parseInt(item.amount) === 1 ) {

                UpdateItem.status = 'completed'
            } 
        } 
        const data = await axios.patch(`https://sheet.best/api/sheets/be35202d-7b9b-4682-a82c-a30f9a9ee3b7/${item.id}`,UpdateItem)
        return data
    } catch (error) {
        console.log("Error en la modificacion de lista de regalos ", {error:error.message})
      
    }
}



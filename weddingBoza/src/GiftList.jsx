import React, { useEffect, useState } from 'react'
import Loader from './components/Loader'
import style from './GiftList.module.css'
import { GET_ITEM, GET_LIST } from './services/getItems'
import regalo from './assets/items_img/regalo.svg'
import {Link} from 'react-router-dom'
//modal gift
import Gift from './components/Gift/Gift'
import { useNavigate } from "react-router-dom";

const Item = ({orentation,element,handlerOpenModal}) =>{
    const bg_img = {
        backgroundPosition: 'center center', // Añadí 'center' dos veces para asegurar un centrado completo
        backgroundRepeat: 'no-repeat',
        backgroundImage:   `url(${element.icon ? element.img : regalo})`  
    }   
    
  

    return  <div  className={style.item}> 
        {
            orentation === 'right' 
            ? <div className={style.gift}>
                    <div className={style.nameRight}>
                        <p className={style.textBox}>{element.name}</p>

                    </div>
                    <div  onClick={()=>handlerOpenModal(element.id)}  className={style.imgRight} style={bg_img}  ></div>
                </div> 
            :  <div className={style.gift}>
                    <div onClick={()=>handlerOpenModal(element.id)} className={style.imgLeft}  style={bg_img} ></div>
                    <div className={style.nameLeft}>
                        <p   className={style.textBox}>{element.name}</p>
                    </div>
                </div>
        }
 
    </div> 
}

 
export default function GiftList() {
    let navigate = useNavigate();

    const [state, setState ] = useState(false)
    const [list, setList] = useState([])
    /*modal */
    const [isOpen,setOpen] = useState(false)
    const [itemSelected,setItemSelected] = useState({})
    /*obtener datos para le modal */
    /*abrir y cerrar el modal */
    /* */
    const getGiftLis = async() => {
        const result = await GET_LIST(navigate)
        console.log(result);
        
        if (result.status === 200) {
            setList(result.data)
            console.log("se cargo la lista ");
            setState(true)
            return
        }
        navigate('/error')
        
    }
    useEffect(()=>{
        // GET_LIST(setList)
        console.log("ejecuto la funcion para cargar la lista ");
        
        getGiftLis()
    },[])

        
    const handlerOpenModal = async(id) =>{
        // setItemSelected(item)
        /*obtengo ese registro para mantenerme siempre actualizado los estados */
        const result = await GET_ITEM(id,navigate)
        
        setItemSelected(result.data[0])
        
        setOpen(true)
    }

    console.log("items selecionado", itemSelected);
    


    const handlerCloseModal = () =>{
        setState(false)
        setItemSelected({})
        getGiftLis()
        setOpen(false)
    }
    
    
    if (!state) { 
        return <Loader /> 
    }

  return (
    <div className={style.pageGift}>
        
        <Gift isOpen={isOpen} item={itemSelected} handlerCloseModal={handlerCloseModal}/>
        <div className={style.containerBack}>
            <Link  to={'/'}  ><div className={style.back}></div></Link>

        </div>
        <p className={style.msg}>"Si deseas hacernos un regalo, por favor <br />selecciona uno de la lista."</p>
        <div className={style.listGift}>
            {
                list.length 
                    ? list.map((element,index)=>{
                        
                    return <Item key={index} handlerOpenModal={handlerOpenModal} orentation={index % 2 === 0 ? 'right' : 'left' } element={element}/>
                }) : "cargando"
            }
        </div>
        <p className={style.alias}>En caso de no haber selecionado ningun regalo te dejamos nuestro alias: </p> 
        <p className={style.alias_}>"Casamiento.vya"</p>

    </div>
  )
}

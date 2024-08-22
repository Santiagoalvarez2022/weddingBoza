import React, { useState } from 'react'
import Navegation from '../Navegation/Navegation'
import style from './Gift.module.css'
import regalo from '../../assets/items_img/regalo.svg'
import { UPDATE_ITEM } from '../../services/getItems'
import { useNavigate } from "react-router-dom";

//modale para cuando se elige un regalo

  
  export default function Gift({isOpen,item,handlerCloseModal}) {
    let navigate = useNavigate();
  
  const bg_img = {
        backgroundPosition: 'center center', // Añadí 'center' dos veces para asegurar un centrado completo
        backgroundRepeat: 'no-repeat',
        backgroundImage:   `url(${item.icon ? item.img : regalo})`  
  }
  
  const [input,setInput] = useState("")

  const handlerInput = ({target}) =>{
    let {value} = target;
    value = value.split(' ').map(palabra => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    }).join(' ');
    
    setInput(value)

  }

  const sendData = async() =>{
    if (input.trim()==="") return 
    console.log(input);
    
    try {
      const result = await UPDATE_ITEM(item,input)

      console.log("result", result);
      
      if (result.status === 200){
        /*MOSTRAR MENSAJE DE EXITO */
      }
      handlerCloseModal()

    } catch (error) {

      console.log("ocurrio un error", error);
      navigate("/Error");

    } finally {
      // setLoading(false)
      console.log("finalizacion");
      setInput('')
    }
    
  }  
  

  if (!isOpen) return null;
  return (
    <div className={style.modalOverlay}  >
      <div className={style.modalContent}>
          <div className={style.containerBtn}>
          <div className={style.btnClose} onClick={()=>handlerCloseModal()} ></div>
          </div>
        <div>
          <div className={style.containerTitle}>
            <div style={bg_img} className={style.iconGift}></div>
            <h2 className={style.nameItem}>{item.name}</h2>
          </div>
          <p>{item.description}</p>
          <br />
        </div>

        <div>
           <p className={style.thanks}>¡Gracias por tu eleccion!</p> 
           <br />

          <p className={style.text}>Si te gustaría darnos este regalo, <br /> por favor ingresa tu nombre para nosotros registralo</p>
          <br />
          <hr />
          <br /> 
       
          <div className={style.containerReference}>

            { item.link &&  <a  href={item.link}><p className={style.reference}>Referencia</p></a>}
            </div>



          <p className={style.text}>Cantidad : {item.amount}</p>
          {parseInt(item.divide ) > 1 && <>
            <p className={style.text} >Gasto compartido entre : {item.Committed}/{item.divide}</p> 
            <br />
            <p>Envianos tu nombre si te gustaría compartir este regalo con otros invitados </p>  
          </>
           }
        </div>
          <br />
        <form className={style.formInput} onSubmit={(e)=>e.preventDefault()}>
          <input onChange={handlerInput}  value={input} className={style.inputName} type="text" placeholder='Nombre y Apellido' />
          <div  className={style.sendBtn} onClick={()=>sendData()}>Enviar</div>
        </form>
            
      </div>
    </div>

  ) 
}
 /*const sendData = async(data) =>{
    //evaluo que se halla seleccionado un invitado para enviar la info

    if (selectedGuests) {
      setLoading(true)

    try {
      const result = await confirm_guest(data.id)

      if (result.status === 200){
        setOpen(true)
      }

    } catch (error) {

      console.log("ocurrio un error", error);
      navigate("/Error");
    } finally {
      setLoading(false)
    }

    setSelectedGuests(null)
    setData("") 
    } else{

    }
    
  }  */
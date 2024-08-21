import React, { useState } from 'react'
import Navegation from '../Navegation/Navegation'
import style from './Gift.module.css'
import regalo from '../../assets/items_img/regalo.svg'

//modale para cuando se elige un regalo

export default function Gift({isOpen,item,handlerCloseModal}) {
  
  const bg_img = {
        backgroundPosition: 'center center', // Añadí 'center' dos veces para asegurar un centrado completo
        backgroundRepeat: 'no-repeat',
        backgroundImage:   `url(${item.icon ? item.img : regalo})`  
  }
  
  const [input,setInput] = useState({})

  if (!isOpen) return null;
  return (
    <div className={style.modalOverlay}  >
      <div className={style.modalContent}>
        <div>

          <button onClick={()=>handlerCloseModal()}>cerrar</button>
          <div className={style.containerTitle}>
            <div style={bg_img} className={style.iconGift}></div>
            <h2 className={style.nameItem}>{item.name}</h2>
          </div>
          <p>{item.description}</p>

        </div>

        <div>
          <p className={style.text}>¡Gracias por tu eleccion!</p>
          <p className={style.text}>Si te gustaría darnos este regalo, <br /> por favor ingresa tu nombre para nosotros registralo</p>
        </div>
        <form className={style.formInput} onSubmit={(e)=>e.preventDefault()}>
          <input className={style.inputName} type="text" placeholder='Nombre y Apellido' />
          <div  className={style.sendBtn} onClick={()=>{}}>Enviar</div>
        </form>
            
      </div>
    </div>

  ) 
}
 
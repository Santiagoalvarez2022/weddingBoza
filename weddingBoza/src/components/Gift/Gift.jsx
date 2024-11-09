import React, { useState } from 'react'
import style from './Gift.module.css'
import regalo from '../../assets/items_img/regalo.svg'
import { UPDATE_ITEM } from '../../services/getItems'
import { useNavigate } from "react-router-dom";


const Response = () =>{
  return <div>
  </div>
}


  
export default function Gift({isOpen,item,handlerCloseModal}) {

  const [loaderResponse,setResponseLoader] = useState(true)

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
    
    console.log("entre a enviar la invitacion");
    
    try {
      const result = await UPDATE_ITEM(item,input)
      
      if (result.status === 200){

        setResponseLoader(false)
        /*MOSTRAR MENSAJE DE EXITO */

      }

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
  //componente para  esperar la respuesta si salio bien el update del item

  return (
    <div className={style.modalOverlay}  >
      <div className={style.modalContent}>
         <div className={style.containerBtn}>
          <div className={style.btnClose} onClick={()=>handlerCloseModal()} ></div>
          </div>
        {item.msg && <p>Este regalo ya fue elegido</p>}
        {
          !item.msg && loaderResponse && <> 
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
            <p> “En caso de querer hacer el regalo completo envíanos un mensaje!”</p>  
          </>
           }
        </div>
          <br />
        <form className={style.formInput} onSubmit={(e)=>e.preventDefault()}>
          <input onChange={handlerInput}  value={input} className={style.inputName} type="text" placeholder='Nombre y Apellido' />
          <div  className={style.sendBtn} onClick={()=>sendData()}>Enviar</div>
        </form>
        
      
          </> 

        }
          {
          !loaderResponse &&<>
           <div className={style.responseLoader}>

          </div>
            <p className={style.loaderText}>¡Gracias por tu regalo! <br />
            El camino es mas divertido al recorrerlo juntos ♡</p>
          </>
          }
      </div>

    </div>

  ) 
}

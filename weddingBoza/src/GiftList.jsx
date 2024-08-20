import React, { useEffect, useState } from 'react'
import Loader from './components/Loader'
import style from './GiftList.module.css'
import { GET_LIST } from './services/getItems'
import tv from './assets/items_img/tv.svg'
import regalo from './assets/items_img/regalo.svg'
import {Link} from 'react-router-dom'

const Item = ({orentation,element}) =>{
    const bg_img = {
        backgroundPosition: 'center center', // Añadí 'center' dos veces para asegurar un centrado completo
        backgroundRepeat: 'no-repeat',
        backgroundImage:   `url(${element.icon ? element.img : regalo})`  
    }   
    
  

    return    <div  className={style.item}> 
        {
            orentation === 'right' 
            ? <div className={style.gift}>
                    <div className={style.nameRight}>
                        <p className={style.textBox}>{element.name}</p>

                    </div>
                    <Link  to={`/${element.name}`} className={style.imgRight} style={bg_img}  ></Link>
                </div> 
            :  <div className={style.gift}>
                    <Link  to={`/${element.name}`} className={style.imgLeft}  style={bg_img} ></Link>
                    <div className={style.nameLeft}>
                        <p className={style.textBox}>{element.name}</p>
                    </div>
                </div>
        }
 
    </div> 
}

 
export default function GiftList() {
    const [state, setState ] = useState(true)
    const [list, setList] = useState([])

    useEffect(()=>{
        GET_LIST(setList)
    },[])
    
    if (!state) {
        return <Loader />
    }
  return (
    <div className={style.pageGift}>
        <p className={style.msg}>"Si deseas hacernos un regalo, por favor <br />selecciona uno de la lista."</p>
        <div className={style.listGift}>
            {
                list.length 
                    ? list.map((element,index)=>{
                        
                    return <Item key={index} orentation={index % 2 === 0 ? 'right' : 'left' } element={element}/>
                }) : "cargando"
            }
        </div>
        <p className={style.alias}>alias: <br /> "Casamiento.vya"</p>
    </div>
  )
}

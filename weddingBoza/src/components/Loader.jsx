import React from 'react'
import style from './Loader.module.css'
export default function Loader() {
    const styles = {
        height:"100vh",
        width : '100%',
        background : "#15324c",
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        fontSize : '1.7em',
        color : "#fff",
        textAlign : 'center',
        flexDirection:'column'
    }

  return (
    
    <div style={styles}> 
      <div className={style.erizo}></div>
      <p className={style.loader}>Cargando...</p>
    </div>
  )
}

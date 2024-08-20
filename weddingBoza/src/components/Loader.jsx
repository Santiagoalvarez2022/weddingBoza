import React from 'react'

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
    }  

  return (
    <div style={styles}>“El camino es mas divertido <br />si lo recorremos juntos”</div>
  )
}

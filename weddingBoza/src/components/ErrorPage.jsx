import React from 'react'

export default function ErrorPage() {
  const styles = {
    height:"100vh",
    width : '100%',
    background : "rgba(0, 0, 0, 0.719)",
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    fontSize : '1.2em',
    color : "#fff",
    textAlign : 'center',
}
  return (
    <div style={styles} >Error, por favor envia un mensaje <br /> a Sofía y Nahuel</div>
  )
}

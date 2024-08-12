import { useState } from 'react'
import style from './App.module.css'
import Chronometer from './components/Chronometer/Chronometer'

function App() {


  return (
    <div className={style.containerPage}>
     
      <div className={style.pageOne}>
        <div className={style.title}>
          <h1 className={style.names}>Valen y Alex</h1>
        </div>
        <Chronometer />
      </div>
    </div>
  )
}

export default App

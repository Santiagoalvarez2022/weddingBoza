import style from './App.module.css'
import Chronometer from  './components/Chronometer/Chronometer'
import { useEffect, useState } from 'react';
import imageUrl from './assets/couple.svg'
import Loader from './components/Loader'

function App() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl; 
    img.onload = () => setImageLoaded(true);
  }, []);
 

  return (
    <div className={style.containerPage}>
      {!imageLoaded && <Loader />}
      {imageLoaded && <div className={style.pageOne}
       style={{
        backgroundImage: `url(${imageUrl})`, 
      }}
      >
        <div className={style.title}>
          <h1 className={style.names}>Sofía y Nahuel</h1>
        </div>
        <Chronometer />
        
      </div>}
     
    </div>
  )
}

export default App

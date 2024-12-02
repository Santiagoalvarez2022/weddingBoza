import {useState,useEffect} from 'react'
import style from './Chronometer.module.css'
import { Link } from 'react-router-dom';

export default function Chronometer() {

    const targetDate = new Date('March 22, 2025 09:00:00').getTime();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => { 
        // Función para calcular el tiempo restante
        const calculateTimeLeft = () => {
          const now = new Date().getTime();
          const distance = targetDate - now;
    
          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
            setTimeLeft({ days, hours, minutes });
          } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0 });
          }
        };
    
        // Calcular inicialmente el tiempo restante
        calculateTimeLeft();
    
        // Actualizar el tiempo restante cada minuto
        const intervalId = setInterval(calculateTimeLeft, 1000);
    
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
      }, [targetDate]);
    
 
  return (
    <div className={style.container}>
        <div className={style.date}> 

            <div className={style.boxDate}>
                <p className={style.num}>{timeLeft.days}</p>
                <p className={style.text}>Días</p>
            </div>
            <div className={style.boxDate}>
                <p className={style.num}>{timeLeft.hours}</p>  
                <p className={style.text}>Horas</p>
            </div>
            <div className={style.boxDate}>
                <p className={style.num}>{timeLeft.minutes}</p>
                <p className={style.text}>Minutos</p>
            </div>
        </div>
        <div className={style.giftList}>
            <Link to={'/list'}>
              <div className={style.btn}> Lista de deseos</div> 
            </Link>
        </div>

    </div>
  )
}

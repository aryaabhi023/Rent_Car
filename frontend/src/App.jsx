import {useEffect,useState} from 'react'
import Header from './component/Header'
import LoadingScreen from './component/LoadingScreen';
import { Outlet,useLocation } from 'react-router-dom'
import './App.css'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  let time=location.pathname==='/Cars'?2000:1000;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, time);

    return () => clearTimeout(timer);
  }, [location]);


  return (
    <div className='w-full h-screen' id='app'>
      <Header />
      {isLoading ? <LoadingScreen /> : <Outlet />}
    </div>
  )
}

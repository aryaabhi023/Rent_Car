import { useEffect,useState } from 'react';
import { deleteCar,getCars } from '../connection/Car';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CarList = () => {

  const [carLists,setCarLists]=useState([]);

  useEffect(()=>{
    getCars().then((res)=>{
      setCarLists(res.data);
    })
  },[])


  return (
    <div className="h-screen space-y-6 bg-white pt-16">
        <h2 className="text-3xl font-bold text-center mb-4">All Car Lists</h2>
      { carLists?.length>0 && carLists?.map((car) => (
        <div
          key={car?._id}
          className="relative max-w-4xl mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-md"
        >
          <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-destructive/20"
            onClick={() => {
              deleteCar(car?._id).then((res)=>{
                setCarLists(carLists.filter((car) => car._id !== res?.data?._id));
              })
            }}
          >
            <FontAwesomeIcon icon={faTrash} aria-hidden="true" className='text-red-400 text-xs' />
          </button>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Model:</label>
              <p className="text-foreground">{car?.model}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Car Name:</label>
              <p className="text-foreground">{car?.carName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;

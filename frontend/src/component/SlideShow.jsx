import {useEffect,useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate} from "react-router-dom";
import { getCars } from "../connection/Car";

import '../Style/slide.css'; // Import your custom styles

const SlideShow = () => {

    const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    getCars()
    .then((res) => {
      let data=[];
      res.data.find((car) => {
        if(Number(car.rating) > 3){
          data.push(car);
        }
    })
    return data;
  })
    .then((car) => {
      setCars([...car,...car]);
    })
  },[])

  return (
    <div className="container mx-auto my-4 bg-neutral-100 py-2">
      <h1 className="text-3xl font-bold text-center mb-2">Best Selling Models</h1>
      {
        cars.length > 0 ?
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
            770: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="w-full py-10 mx-auto justify-center items-center"
      >
        {cars.map((model, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-4 rounded-lg shadow-md m-4 md:m-2 block text-center transform transition-transform duration-500 ease-in-out hover:-translate-y-2">
              <img src={model.imgUrl} alt='Car-Image' className="w-full rounded-md" />
              <h3 className="mt-2 font-medium">{model.carName}</h3>
              <div className="text-sm" onClick={()=>navigate(`/CarDetails/${model._id}`)}>View Details→</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      :
      <h1 className="text-3xl font-bold text-center mb-2 cursor">No Cars Available</h1>
      }
    </div>
  );
};

export default SlideShow;

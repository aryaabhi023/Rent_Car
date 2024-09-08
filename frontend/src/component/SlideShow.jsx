import {useEffect,useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { getCars } from "../connection/Car";

import '../Style/slide.css'; // Import your custom styles

const SlideShow = () => {

    const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    getCars().then((res)=>{
      setCars(res.data);
    })
  },[])

  const models = [
    {
      name: 'Creta',
      img: 'https://placehold.co/300x180.png',
      alt: 'Hyundai Creta',
    },
    {
      name: 'Toyota Innova Crysta',
      img: 'https://placehold.co/300x180.png',
      alt: 'Toyota Innova Crysta',
    },
    {
      name: 'Ciaz',
      img: 'https://placehold.co/300x180.png',
      alt: 'Maruti Ciaz',
    },
    {
      name: 'Mahindra Scorpio',
      img: 'https://placehold.co/300x180.png',
      alt: 'Mahindra Scorpio',
    },
    {
      name: 'Mahindra TUV',
      img: 'https://placehold.co/300x180.png',
      alt: 'Mahindra TUV',
    },
  ];

  return (
    <div className="container mx-auto my-4 bg-neutral-100 py-2">
      <h1 className="text-3xl font-bold text-center mb-2">Best Selling Models</h1>
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
        {models.map((model, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-4 rounded-lg shadow-md m-4 md:m-2 block text-center transform transition-transform duration-500 ease-in-out hover:-translate-y-2">
              <img src={model.img} alt={model.alt} className="w-full rounded-md" />
              <h3 className="mt-2 font-medium">{model.name}</h3>
              <a href="#" className="text-secondary text-sm">View Details→</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideShow;

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faGasPump,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getCars } from "../connection/Car";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCars().then((res) => {
      setCars(res.data);
    });
  }, []);

  function CountStar(num) {
    let stars = "";
    num = Math.floor(+num);
    for (let i = 0; i < num; i++) {
      stars += "⭐";
    }
    return stars;
  }

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="overflow-y-scroll h-full max-h-[88vh] scrollbar-hide">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-16 w-full md:w-11/12 mx-auto">
          {cars.length > 0 &&
            cars.map((car, index) => (
              <div
                key={index}
                className="w-13/14 bg-gradient-to-r from-neutral-200/80 to-gray-200/80 text-neutral-800 p-2 shadow-md rounded-lg border border-gray-300 transform transition-transform duration-500 ease-in-out hover:-translate-y-2 hover:bg-neutral-300 "
              >
                <h3 className="text-lg block text-center font-semibold">
                  {car.model}
                </h3>
                <img
                  src={car.imgUrl}
                  alt={car.alt}
                  className="w-full rounded-lg mb-4"
                />
                <div className="flex justify-around items-center bg-gray-100 p-1 rounded-lg shadow-md">
                  <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      className="text-gray-600 text-2xl mb-1"
                    />
                    <span className="text-gray-700 text-sm">
                      {car.speed} km/h
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faGasPump}
                      className="text-gray-600 text-2xl mb-1"
                    />
                    <span className="text-gray-700 text-sm">{car.type}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FontAwesomeIcon
                      icon={faCogs}
                      className="text-gray-600 text-2xl mb-1"
                    />
                    <span className="text-gray-700 text-sm">Automatic</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-primary-foreground">
                    <h3 className="inline font-bold">Rating: </h3>
                    {CountStar(car.rating)}
                  </span>
                  <span>
                    <h3 className="inline font-bold">Rent: </h3>₹{car.price}/Day
                  </span>
                </div>
                <button
                  className="flex w-full justify-around items-center bg-gradient-to-r from-red-600/50 via-red-600/80 to-red-700/50 p-4 lg:p-1 mt-1 font-bold rounded-lg shadow-md"
                  onClick={() => {
                    navigate(`/CarDetails/${car._id}`);
                  }}
                >
                  Rent It Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

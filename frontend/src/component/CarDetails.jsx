import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faGasPump, faCogs, faSnowflake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { newCustomer } from '../connection/Customer';
import { getCar } from '../connection/Car';

export default function CarDetails() {

  const {id}=useParams();
 
  const [car,setCar]=useState({});

  
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    contact: "",
    pickupDate: "",
    dropoffDate: "",
    pickupAddress: "",
    dropoffAddress: "",
    carName:""
  });
  
  useEffect(()=>{
    getCar(id).then((res)=>{
      const carData = res.data;
      setCar(carData);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        carName: carData?.carName,
      }));
    }).then(()=>{
      console.log(bookingDetails);
    })
  },[id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newCustomer(bookingDetails).then((res) => {
      setBookingDetails({
        ...bookingDetails,
        name: "",
        contact: "",
        pickupDate: "",
        dropoffDate: "",
        pickupAddress: "",
        dropoffAddress: "",
      });
    });
    console.log(bookingDetails);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-center my-8">
        <img src={car?.imgUrl} alt="Car Main" className=" rounded-lg" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{car?.carName}-{car?.model}</h1>
          <div className="text-sm text-gray-500 mb-4 flex gap-4">
            <span>{car?.model}</span>
            <span className="text-green-500">Free cancellation</span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faTachometerAlt} />{car?.speed} km/h
            </span>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCogs} /> {car?.seats} seats
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSnowflake} /> Air conditioning
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGasPump} /> {car?.type}
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> GPS nav system
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              {car?.description} 
            </p>
          </div>
        </div>

        <form className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Book Information</h2>
          <div className='flex justify-between gap-4'>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Name"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Contact No.</label>
            <input
              type="text"
              name="contact"
              value={bookingDetails.contact}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Contact No."
            />
          </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Car Name</label>
            <input
              type="text"
              value={bookingDetails?.carName}
              name="carName"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              readOnly
            />
          </div>
          <div className='flex justify-between gap-4'>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
            <input
              type="datetime-local"
              name="pickupDate"
              value={bookingDetails.pickupDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Pickup Date"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Drop Off Date</label>
            <input
              type="datetime-local"
              name="dropoffDate"
              value={bookingDetails.dropoffDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Drop Off Date"
            />
          </div>
          </div>
          <div className='flex justify-between gap-4'>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
            <input
              type="text"
              name="pickupAddress"
              value={bookingDetails.pickupAddress}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Pickup Address"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Drop Off Address</label>
            <input
              type="text"
              name='dropoffAddress'
              value={bookingDetails.dropoffAddress}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Drop Off Address"
            />
          </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span>Rent fee</span>
            <span className="font-semibold">₹{car?.price}/Day</span>
          </div>
          <button type='submit' className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

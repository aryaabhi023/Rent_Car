import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faGasPump, faCogs, faSnowflake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { newCustomer,sendEmail } from '../connection/Customer';
import { findBlockedUser } from '../connection/BlockedUser';
import { getCar } from '../connection/Car';

export default function CarDetails() {

  const {id}=useParams();
 
  const [car,setCar]=useState({});
  const [showSubmit, setShowSubmit] = useState(true);
  const [showRequested,setShowRequested] = useState(false);
  const [showRejected,setShowRejected] = useState(false);

  const Rejected=()=>{
    setShowSubmit(false);
    setShowRejected(true);
    setTimeout(()=>{
      setShowRejected(false);
      setShowSubmit(true);
    },3000);
  }

  const Requested=()=>{
    setShowSubmit(false);
    setShowRequested(true);
    setTimeout(()=>{
      setShowRequested(false);
      setShowSubmit(true);
    },3000);
  }


  
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    contact: "",
    email: "",
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
    findBlockedUser(bookingDetails).then((res) => {
      if (res.data) {
        Rejected();
      }
      else{
        newCustomer(bookingDetails).then((res) => {
          sendEmail(bookingDetails);
          Requested();
          setBookingDetails({
            name: "",
            contact: "",
            email: "",
            pickupDate: "",
            dropoffDate: "",
            pickupAddress: "",
            dropoffAddress: "",
          });
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-center my-12">
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

          <div className='md:hidden'>
            <p className="block text-center text-red-400 mt-2">*You have to pay extra for 200 or 400 Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui.</p>
          </div>

        <form className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4 text-center">Book Information</h2>
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
              required
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
              required
            />
          </div>
          </div>
          <div className='flex justify-between gap-4'>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 w-1/2">
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
              required
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Drop Off Date</label>
            <input
              type="datetime-local"
              name="dropoffDate"
              value={bookingDetails.dropoffDate}
              onChange={handleChange}
              min={bookingDetails.pickupDate}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Drop Off Date"
              required
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
              required
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
              required
            />
          </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span>Rent fee</span>
            <span className="font-semibold">₹{car?.price}/Day</span>
          </div>
          <button type='submit' className={`${showSubmit?"block":"hidden"} w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700`}>
            Book
          </button>
          <button className={`${showRequested?"block":"hidden"} w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600`}>
            Requested
          </button>
          <button className={`${showRejected?"block":"hidden"} w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600`}>
            Rejected
          </button>
        </form>
      </div>
    </div>
  );
}

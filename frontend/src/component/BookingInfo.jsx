import { useEffect,useState } from 'react';
import { getAllCustomers,deleteCustomer } from '../connection/Customer';

const BookingInfo = () => {

  const [bookingDetails,setBookingDetails]=useState([]);

  useEffect(()=>{
    getAllCustomers().then((res)=>{
      setBookingDetails(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])


  return (
    <div className="h-screen space-y-6 bg-white pt-16">
        <h2 className="text-3xl font-bold text-center mb-4">Booking Information</h2>
      { bookingDetails?.length>0 && bookingDetails?.map((booking) => (
        <div
          key={booking?._id}
          className="relative max-w-4xl mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-md"
        >
          <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-destructive/20"
            onClick={() => {
              deleteCustomer(booking?._id).then((res)=>{
                setBookingDetails(bookingDetails.filter((booking) => booking._id !== res?.data?._id));
              })
            }}
          >
            <img
              alt="delete icon"
              src="https://openui.fly.dev/openui/20x20.svg?text=🗑️"
            />
          </button>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Name:</label>
              <p className="text-foreground">{booking?.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Contact No:</label>
              <p className="text-foreground">{booking?.contact}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Car Name:</label>
              <p className="text-foreground">{booking?.carName?booking?.carName:'--'}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Pick Up Date:</label>
              <p className="text-foreground">{booking?.pickupDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Drop Off Date:</label>
              <p className="text-foreground">{booking?.dropoffDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Pick Up Address:</label>
              <p className="text-foreground">{booking?.pickupAddress}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium text-muted-foreground">Drop Off Address:</label>
              <p className="text-foreground">{booking?.dropoffAddress}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingInfo;

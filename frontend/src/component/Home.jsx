import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { newCustomer, sendEmail } from "../connection/Customer";
import { findBlockedUser } from "../connection/BlockedUser";
import SlideShow from "./SlideShow";

export default function Home() {
  const [showSubmit, setShowSubmit] = useState(true);
  const [showRequested,setShowRequested] = useState(false);
  const [showRejected,setShowRejected] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
  });

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

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 950);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center  justify-center h-60 md:min-h-screen z-12">
        <h1
          className={`${
            isSmallScreen ? "text-5xl" : "text-8xl"
          } font-extrabold bg-gradient-to-r from-white/80 via-yellow-800/60 to-black/50 bg-clip-text text-transparent text-center`}
        >
          Rent A Car
        </h1>
        <div
          className={`${
            isSmallScreen ? "hidden" : "absolute"
          } w-full bottom:80 md:bottom-2 left-1/2 transform -translate-x-1/2`}
        >
          <form
            className="flex justify-between items-center bg-zinc-300 bg-opacity-80 rounded-lg p-1 shadow-lg md:mx-10"
            onSubmit={handleSubmit}
          >
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-zinc-500 block text-center z-20"
                htmlFor="Name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={bookingDetails.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-lg text-sm bg-zinc-200 block text-center focus:outline-none"
                required
              />
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-sm text-zinc-500 block text-center"
                htmlFor="Contact No."
              >
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={bookingDetails.contact}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full rounded-lg text-sm bg-zinc-200 block text-center focus:outline-none"
                required
              />
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-sm text-zinc-500 block text-center"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={bookingDetails.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full rounded-lg text-sm bg-zinc-200 block text-center focus:outline-none"
                required
              />
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-zinc-500 text-sm block text-center"
                htmlFor="pickup-address"
              >
                Pick Up Address
              </label>
              <input
                type="text"
                name="pickupAddress"
                value={bookingDetails.pickupAddress}
                onChange={handleChange}
                id="pickup-address"
                placeholder="From: address, airport, hotel ..."
                className="w-full rounded-lg bg-zinc-200 block text-center focus:outline-none"
                required
              />
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-zinc-500 text-sm block text-center"
                htmlFor="pickup-date"
              >
                Pick Up Date
              </label>
              <input
                type="datetime-local"
                id="pickup-date"
                name="pickupDate"
                value={bookingDetails.pickupDate}
                onChange={handleChange}
                className="w-full block text-gray-400 text-center bg-zinc-200 text-sm rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-sm text-zinc-500 block text-center focus:outline-none focus:ring-0"
                htmlFor="dropoff-address"
              >
                Drop Off Address
              </label>
              <input
                type="text"
                id="dropoff-address"
                name="dropoffAddress"
                value={bookingDetails.dropoffAddress}
                onChange={handleChange}
                placeholder="Distance, Hourly, Flat Rate"
                className="w-full block text-center rounded-lg bg-zinc-200 text-sm focus:outline-none"
                required
              />
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 m-1">
              <label
                className="text-muted text-sm text-zinc-500 block text-center"
                htmlFor="dropoff-date"
              >
                Drop Off Date
              </label>
              <input
                type="datetime-local"
                id="dropoff-date"
                name="dropoffDate"
                value={bookingDetails.dropoffDate}
                onChange={handleChange}
                min={bookingDetails.pickupDate}
                className="w-full block text-center text-zinc-400 text-sm rounded-lg bg-zinc-200 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className={`${showSubmit?"flex":"hidden"} bg-blue-600 text-white rounded-lg p-1 m-1 flex-col items-center shadow-lg w-32 h-16`}
            >
              <img
                alt="calendar-icon"
                src="https://img.icons8.com/?size=100&id=tIqOo7HYPQHK&format=png&color=000000"
                className="mb-1 h-7"
              />
              <span className="text-lg font-medium">Book Now</span>
            </button>
            <button
              className={`${showRequested?"flex":"hidden"} bg-green-600 text-white rounded-lg p-1 m-1 flex-col items-center shadow-lg w-32 h-16`}
            >
              <img
                alt="calendar-icon"
                src="https://ik.imagekit.io/abhi023/gifs/icons8-tick.gif?updatedAt=1725956856775"
                className="mb-1 h-7 rounded-full"
              />
              <span className="text-lg font-medium">Requested</span>
            </button>
            <button
              type="submit"
              className={`${showRejected?"flex":"hidden"} bg-red-500 text-white rounded-lg p-1 m-1 flex-col items-center shadow-lg w-32 h-16`}
            >
              <img
                alt="calendar-icon"
                src="https://ik.imagekit.io/abhi023/gifs/icons8-warning.gif?updatedAt=1726050663281"
                className="mb-1 h-7 rounded-full bg-red-500"
              />
              <span className="text-lg font-medium">Rejected</span>
            </button>
          </form>
            <div>
            <p className="block text-center text-red-400 mt-2">*You have to pay extra for 200 or 400 Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui.</p>
            </div>
        </div>
      </div>
      <div>
        <div className={`${isSmallScreen ? "flex" : "hidden"} mt-10`}>
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-lg p-3 mx-auto shadow-lg w-1/2"
            onClick={() => navigate("/Cars")}
          >
            View Car
          </button>
        </div>
        <div className="bg-background p-6">
          <h2 className="text-2xl font-bold text-primary mb-4 block text-center">
            Features & Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-muted rounded-lg p-4 flex flex-col items-center">
              <img
                undefinedhidden="true"
                alt="car-icon"
                src="https://ik.imagekit.io/abhi023/gifs/icons8-car.gif?updatedAt=1725796812813"
              />
              <p className="text-center text-primary mt-2">
                Unlimited km to drive
              </p>
            </div>
            <div className="border border-muted rounded-lg p-4 flex flex-col items-center">
              <img
                undefinedhidden="true"
                alt="location-icon"
                src="https://ik.imagekit.io/abhi023/gifs/icons8-home.gif?updatedAt=1725815002392"
                className="h-16"
              />
              <p className="text-center text-primary mt-2">
                24x7 Operating
                <br />
                in 3 Locations
              </p>
            </div>
            <div className="border border-muted rounded-lg p-4 flex flex-col items-center">
              <img
                undefinedhidden="true"
                alt="delivery-icon"
                src="https://ik.imagekit.io/abhi023/gifs/icons8-delivery.gif?updatedAt=1725815110426"
                className="h-16"
              />
              <p className="text-center text-primary mt-2">
                AnyTime
                <br />
                PickUp
              </p>
            </div>
            <div className="border border-muted rounded-lg p-4 flex flex-col items-center">
              <img
                undefinedhidden="true"
                alt="privacy-icon"
                src="https://ik.imagekit.io/abhi023/gifs/icons8-lock.gif?updatedAt=1725814934237"
                className="h-14"
              />
              <p className="text-center text-primary mt-2">
                Privacy &<br />
                freedom
              </p>
            </div>
          </div>
        </div>
      </div>
      <SlideShow />
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold text-center">How To Book</h2>
        <p className="text-center text-muted-foreground mb-8">
          It's easy to book a ride with us. Follow these simple steps:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="card bg-white border border-border rounded-lg p-6 mx-3 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <img
              alt="time"
              src="https://ik.imagekit.io/abhi023/gifs/icons8-schedule.gif?updatedAt=1725782416034"
              className="mx-auto mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Chose your date and time
            </p>
          </div>

          <div className="card bg-white dark:bg-card border border-border rounded-lg mx-3 p-6 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">Step 2</h3>
            <img
              alt="character"
              src="https://ik.imagekit.io/abhi023/gifs/icons8-location.gif?updatedAt=1725782415995"
              className="mx-auto mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Select the Pick up and Drop off location
            </p>
          </div>

          <div className="card bg-white dark:bg-card border border-border rounded-lg mx-3 p-6 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <img
              alt="hand"
              src="https://ik.imagekit.io/abhi023/gifs/icons8-submit-progress.gif?updatedAt=1725782416235"
              className="mx-auto mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Submit the Form with all other necessary details
            </p>
          </div>

          <div className="card bg-white border border-border rounded-lg mx-3 p-6 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">Step 4</h3>
            <img
              alt="hand"
              src="https://ik.imagekit.io/abhi023/gifs/icons8-link.gif?updatedAt=1725791748437"
              className="mx-auto mb-4"
            />
            <p className="text-muted-foreground mb-4">
              We Will Connect with you to confirm your booking
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-10 m-4 p-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why rent with Driveezz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-white text-center p-6 rounded-lg shadow-lg border border-slate-200 transform transition-transform duration-1000 ease-in-out hover:-translate-y-2 relative"
              style={{
                backgroundImage: `url('https://ik.imagekit.io/abhi023/gifs/ride_line.svg')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                alt="Payment Options"
                src="https://ik.imagekit.io/abhi023/gifs/Payment_Options.png"
                className="mb-4 w-20 mx-auto"
              />
              <h3 className="text-xl font-semibold mb-2">
                Multiple Payment Options
              </h3>
              <p className="text-muted-foreground">
                Don’t let payment mode come in between you and your dream car!
                Choose from credit card, debit card, net banking, or UPI.
              </p>
            </div>
            <div
              className="bg-white text-center p-6 rounded-lg shadow-lg border border-slate-200 transform transition-transform duration-1000 ease-in-out hover:-translate-y-2 relative"
              style={{
                backgroundImage: `url('https://ik.imagekit.io/abhi023/gifs/ride_line_2.svg')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                alt="Easy Cancellation"
                src="https://ik.imagekit.io/abhi023/gifs/Easy_Cancellation.png"
                className="mb-4 w-20 mx-auto"
              />
              <h3 className="text-xl font-semibold mb-2">Easy Cancellation</h3>
              <p className="text-muted-foreground">
                Change of plans made easy with BrandName. Enjoy the flexibility
                to cancel your car reservation with just a few clicks.
              </p>
            </div>
            <div
              className="bg-white text-center p-6 rounded-lg shadow-lg border border-slate-200 transform transition-transform duration-1000 ease-in-out hover:-translate-y-2 relative"
              style={{
                backgroundImage: `url('https://ik.imagekit.io/abhi023/gifs/ride_line_3.svg')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                alt="Best Price Guarantee"
                src="https://ik.imagekit.io/abhi023/gifs/Best_Price.png"
                className="mb-4 w-20 mx-auto"
              />
              <h3 className="text-xl font-semibold mb-2">
                Best Price Guarantee
              </h3>
              <p className="text-muted-foreground">
                We guarantee the lowest prices on car rentals. If you find a
                lower price, we'll match it.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8 bg-neutral-100">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Places We Are Available In
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near IndraDhanu Market
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Jagamara 
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Siripur
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Khandagiri
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Iginia
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Kalinga Nagar
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Patrapada
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Tomando
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Jagamohan Nagar
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Baramunda Bus-Stand
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Sum Hospital
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Nayapalli
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Lingaraj Temple
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Airport
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Master Caneteen
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Vani Vihar
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Jaydev Vihar
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Rasulgarh
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Saheed Nagar
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Kalinga Hospital
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Patia
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Chandrasekharpur
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near KIIT College
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near ITER College 
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Railway-Station
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Bapuji-Nagar
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near Acharya Vihar
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental Near MAYFAIR
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6 block text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Self-Drive Car Driveezz
        </h1>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Rent A Car from Driveezz Anywhere in Odisha
          </h2>
          <p className="text-xs">
          Experience the convenience of renting a car from Driveezz, the premier self-drive car rental service, available in every corner of Odisha. Whether you're exploring the vibrant cities or venturing into the scenic countryside, Driveezz ensures a hassle-free car rental experience anywhere in the state.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Driveezz - Best Self Drive Car Rental in Odisha
          </h2>
          <p className="text-xs">
          Driveezz offers the best self-drive car rental service in Odisha, providing a wide range of well-maintained vehicles to ensure a comfortable and reliable travel experience. Whether you're planning a business trip or a leisurely getaway, Driveezz is your top choice for exploring Odisha with convenience and freedom.
          </p>
          <p className="text-xs">
          Whether you're navigating the bustling streets of Bhubaneswar or embarking on a scenic road trip to Puri, Driveezz ensures that your journey is seamless, comfortable, and fully under your control. With easy online booking, affordable pricing, and 24/7 customer support, Driveezz makes renting a car effortless and enjoyable.

Say goodbye to the hassles of traditional car rentals and embrace the freedom of exploring Odisha at your own pace with Driveezz. Safety, comfort, and reliability – that's our commitment to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Daily and Monthly Car Rental by Driveezz
          </h2>
          <p className="text-xs">
          Driveezz offers flexible daily and monthly self-drive car rental plans tailored to suit your needs. Whether you need a car for a day to run errands or for an extended period during a long stay in Odisha, Driveezz provides a wide variety of vehicles to match your preferences and budget.

With our daily rental option, enjoy the convenience of short-term car hire, perfect for spontaneous trips or quick getaways. For those seeking longer-term solutions, our monthly rental packages offer cost-effective rates, ideal for extended vacations, business commitments, or personal use.

No matter the duration, Driveezz ensures that every journey is smooth, comfortable, and hassle-free with our top-notch customer service and well-maintained vehicles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Why rent a car
          </h2>
          <p className="text-xs">
          Renting a car provides unmatched convenience and flexibility, whether you're on vacation, need a temporary vehicle, or want to explore new places. It allows you to travel at your own pace, without relying on public transportation schedules or expensive taxis, offering both comfort and privacy. Renting is also cost-effective, especially for short trips, as you avoid the maintenance expenses of owning a car. With a variety of options available, from compact cars for city driving to SUVs for adventurous outings, you can select the perfect vehicle for your needs. Best of all, there's no long-term commitment, making it an ideal solution for temporary stays or occasional use. Driveezz makes the process hassle-free, ensuring you have the right vehicle for any journey, whenever you need it.


          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Why should you choose Driveezz Car Rentals?
          </h2>
          <p className="text-xs">
          Choosing Driveezz Car Rentals ensures a seamless and reliable experience with our well-maintained fleet of vehicles and flexible rental options. Whether you need a car for a day or an entire month, we offer affordable rates, making it easy to find a plan that fits your budget. Our user-friendly booking process, 24/7 customer support, and commitment to safety and comfort set us apart. With Driveezz, you can explore Odisha at your own pace, without the hassle of public transportation or the limitations of traditional car rentals. Enjoy freedom, flexibility, and exceptional service every time you rent with us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Hire Self-Drive Car with Driveezz Online Car Booking Plan
          </h2>
          <p className="text-xs">
          With Driveezz's online car booking plan, hiring a self-drive car has never been easier. Our intuitive platform allows you to choose from a wide selection of vehicles, all available at competitive rates. Whether you're planning a short trip or need a car for an extended period, our flexible booking options let you tailor the rental to your specific needs. Simply browse, select, and book your car online, and enjoy the freedom of self-driving anywhere in Odisha with Driveezz's hassle-free service.
          </p>
        </section>
      </div>
    </div>
  );
}

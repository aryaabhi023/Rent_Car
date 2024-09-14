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
            Why rent with BrandName?
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
        <h2 className="text-4xl font-bold mb-6 text-primary">
          Cities We Are Available In
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
            <p className="text-xs text-muted-foreground">
              Self-Drive Car Rental
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
            <p className="text-xs text-muted-foreground">Car Subscription</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6 block text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Self-Drive Car with Brandname
        </h1>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Rent A Car from BrandName Anywhere in India
          </h2>
          <p className="text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            labore voluptates maiores dolores earum molestiae nostrum, mollitia
            incidunt quam ut tenetur suscipit ab quis sunt laboriosam quasi
            reiciendis in obcaecati atque voluptatum tempore illum.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            MyChoize - Best Self Drive Car Rental in India
          </h2>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            nihil ipsum consectetur? In repudiandae incidunt ex non impedit
            voluptatum officia minus earum accusantium.
          </p>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, est
            enim expedita cumque ipsum quos quis tempore animi labore fuga a
            tenetur temporibus hic sunt autem asperiores quam. Sit incidunt quis
            doloribus illum.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Daily and Monthly Car Rental by BrandName
          </h2>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            aspernatur a doloribus repudiandae illum. Ducimus pariatur adipisci
            voluptatem modi, praesentium nulla recusandae dolor error optio
            repudiandae quasi illum reprehenderit, cupiditate nobis ipsam magnam
            cumque ab accusamus. Pariatur ad deleniti aliquam est vero fugit
            nemo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Why buy a car
          </h2>
          <p className="text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            quisquam debitis sequi nobis labore ullam optio animi officiis
            veritatis eveniet. Unde, dolor dolore enim sapiente aperiam,
            similique saepe sint quas fuga assumenda animi.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Why should you choose Brandname Car Rentals?
          </h2>
          <p className="text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
            quibusdam repudiandae quae dolorum dicta, fuga, illum reprehenderit,
            consequatur esse cum nostrum animi similique?
          </p>
          <p className="text-xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem amet
            consequatur, qui illo laborum dolor in earum inventore ipsam
            obcaecati delectus vitae voluptatum sequi blanditiis laudantium.
            Temporibus ex, delectus itaque facilis nesciunt minus!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Hire Self-Drive Car with MyChoize's Online Car Booking Plan
          </h2>
          <p className="text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio qui
            accusamus voluptatibus vitae iusto distinctio optio aliquam! Dicta
            culpa id quis! Commodi quas sequi nemo molestias. Asperiores sunt
            nemo sit!
          </p>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            corporis, iusto illum omnis ipsa placeat, beatae alias, obcaecati
            sunt rerum eligendi possimus animi quaerat quos cum dolore commodi
            nesciunt non. Delectus aliquid a explicabo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Martul Subscription
          </h2>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat in
            similique incidunt sint beatae cupiditate distinctio, voluptatum
            voluptas corrupti praesentium autem, optio neque, itaque rerum!
            Atque est quae praesentium aliquid!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Mahindra Subscription
          </h2>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            delectus! Delectus ipsum repellendus dolor doloribus perferendis
            suscipit consequuntur commodi alias? Iusto quam placeat voluptate
            quos alias voluptatem laudantium itaque, numquam enim reprehenderit?
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-secondary">
            Toyota Subscription
          </h2>
          <p className="text-xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
            enim at minima tempora praesentium minus quas, ipsa voluptatum qui
            cumque amet doloremque dolorum possimus molestias sed? Aperiam, ut
            molestias. Maiores autem, explicabo nesciunt impedit possimus quod
            rem, incidunt minus, eaque molestiae sed suscipit voluptates iusto.
          </p>
        </section>
      </div>
    </div>
  );
}

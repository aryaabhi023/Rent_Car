import { useState, useEffect } from "react";
import { getAllAddress } from "../connection/Address";

export default function ContactUs() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAllAddress().then((res) => {
      setAddresses(res.data);
    });
  }, []);

  return (
    <div className="w-full h-screen bg-white">
      <div className="flex flex-col items-center py-10 mt-16">
        <h1 className="text-2xl font-bold text-center">
          We are Available 24x7 @ 8093271439
        </h1>
        <div className="mt-8 flex flex-wrap justify-center w-full max-w-6xl">
          {addresses.length > 0 &&
            addresses.map((ad) => (
              <LocationCard
                key={ad._id}
                location={ad.locationName}
                address={ad.address}
                phone={ad.phone}
              />
            ))}
        </div>
      </div>
      <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8">
        <a
          href="https://wa.me/9368764601?text=Hello%20there!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="whatsapp-icon"
            src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000"
            className="w-12 md:w-16"
          />
        </a>
      </div>
    </div>
  );
}

const LocationCard = ({ location, address, phone }) => {
  return (
    <div className="bg-neutral-100 p-6 rounded-lg shadow-lg m-4 text-center text-black transform transition-transform duration-500 ease-in-out hover:-translate-y-5 hover:bg-neutral-300 w-full md:w-1/3">
      <div className="flex justify-center mb-4">
        <img
          alt="location-icon"
          src="https://img.icons8.com/?size=100&id=13800&format=png&color=000000"
          className="w-1/6"
        />
      </div>
      <h2 className="text-lg font-semibold">{location}</h2>
      <p className="text-muted-foreground">{address}</p>
      <p className="text-muted-foreground">{phone}</p>
    </div>
  );
};

import React from "react";

export default function ContactUs() {
  return (
    <div className="w-full h-screen bg-white">
      <div className="flex flex-col items-center py-10 mt-16">
        <h1 className="text-2xl font-bold text-primary">
          We are Available 24x7 @ 9348582126
        </h1>
        <div className="mt-8 flex flex-col md:flex-row justify-around w-full max-w-6xl">
          <LocationCard
            city="DELHI-NCR"
            address="Plot No. 12 Sector 18, Maruti Industrial Area Gurgaon 122015"
          />
          <LocationCard
            city="BENGALURU"
            address="No 1, Bandappa Colony, New Biyapanahalli Extension, Old Madras Rd, opp. Montfort college, Bengaluru, Karnataka 560038"
          />
          <LocationCard
            city="MUMBAI"
            address="Plot No 94, Marol Co Op Industrial Estate, Andheri Kurla Road, Andheri, Mumbai, Maharashtra."
          />
        </div>
      </div>
    </div>
  );
}

const LocationCard = ({ city, address }) => {
  return (
    <div className="bg-neutral-100 p-6 rounded-lg shadow-lg m-4 text-center text-black transform transition-transform duration-500 ease-in-out hover:-translate-y-5 hover:bg-neutral-300">
      <div className="flex justify-center mb-4">
        <img
          alt="location-icon"
          src="https://img.icons8.com/?size=100&id=13800&format=png&color=000000"
          className="w-1/6"
        />
      </div>
      <h2 className="text-lg font-semibold">{city}</h2>
      <p className="text-muted-foreground">{address}</p>
    </div>
  );
};

import { useState } from 'react';
import { uploadCar } from '../connection/Car';

const CarUpload = () => {
  const [imagePreview, setImagePreview] = useState('https://placehold.co/500x300');

  const [car, setCar] = useState({
    model: "",
    carName: "",
    speed: "",
    type: "",
    seats: "",
    rating: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCar({
      ...car,
      [name]: files ? files[0] : value,
    });

    // Update image preview if file input changes
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each field to the form data
    Object.keys(car).forEach((key) => {
      formData.append(key, car[key]);
    });

    uploadCar(formData).then((res) => {
      setCar({
        model: "",
        carName: "",
        speed: "",
        type: "",
        seats: "",
        rating: "",
        price: "",
        image: "",
        description: "",
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="max-w-lg w-full mx-auto p-4 rounded-2xl shadow-lg mt-16"
        onSubmit={handleSubmit}
      >
        <h2 className="block text-center text-3xl font-bold mb-6">Upload Car Data</h2>

        <div className="flex space-x-4 mb-5">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="carName">Car Name</label>
            <input
              type="text"
              id="carName"
              name="carName"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter car name"
              value={car.carName}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="model">Car Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter car model"
              value={car.model}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-5">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="speed">Speed</label>
            <input
              type="text"
              id="speed"
              name="speed"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Max Speed Eg. 200"
              value={car.speed}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="petrol/diesel/electric"
              value={car.type}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-5">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="seats">Seats</label>
            <input
              type="text"
              id="seats"
              name="seats"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter number of seats Eg. 4"
              value={car.seats}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="rating">Rating</label>
            <input
              type="text"
              id="rating"
              name="rating"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter rating Eg. 4"
              value={car.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-5">
          <div className="w-full">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter price Eg. 1000"
              value={car.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-muted-foreground" htmlFor="image">Car Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            accept="image/*"
            onChange={handleChange}
          />
          <img
            id="image-preview"
            className="mt-4 w-full h-64 object-cover border border-muted rounded-xl"
            src={imagePreview}
            alt="Car Image Preview"
          />
        </div>

        <div className="flex space-x-4 mb-5">
          <div className="w-full">
            <label className="block text-sm font-semibold text-muted-foreground" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="mt-2 block w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter description"
              value={car.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 p-3 rounded-lg hover:bg-blue-500/80"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CarUpload;

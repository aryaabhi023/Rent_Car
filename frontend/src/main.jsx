import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { Cars, CarList, Home, About, CarDetails, CarUpload, ContactUs, BookingInfo, Admin, NotFound, BlockUserList, LocationForm } from './component/index.js';
import './index.css';
import { getCodes } from './connection/Code.js';

function AppRouter() {
  const [navCode, setNavCode] = useState("");

  useEffect(() => {
    getCodes().then((res) => {
      setNavCode(res.data[0].navcode);
    }).catch((error) => {
      console.error("Error fetching codes:", error);
    });
  }, []);

  // Show a loading state until navCode is available

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Cars" element={<Cars />} />
        <Route path="Contact" element={<ContactUs />} />
        <Route path="CarDetails/:id" element={<CarDetails />} />
        <Route path="About" element={<About />} />
        {/* Admin options with dynamic navCode */}
        <Route path={`car_lists/${navCode}`} element={<CarList />} />
        <Route path={`car_upload/${navCode}`} element={<CarUpload />} />
        <Route path={`booking_info/${navCode}`} element={<BookingInfo />} />
        <Route path={`blockuser_list/${navCode}`} element={<BlockUserList />} />
        <Route path={`add_address/${navCode}`} element={<LocationForm />} />
        <Route path={`admin`} element={<Admin />} />

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <AppRouter />
);

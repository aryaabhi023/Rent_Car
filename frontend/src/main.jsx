import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,  createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Cars, Home,About, CarDetails, CarUpload,ContactUs, BookingInfo} from './component/index.js'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Cars" element={<Cars />} />
      <Route path="/Contact" element={<ContactUs />} />
      <Route path="/About" element={<About />} />
      <Route path="/CarDetails/:id" element={<CarDetails />} />
      <Route path="/CarUpload/123" element={<CarUpload />} />
      <Route path="/BookingInfo/123" element={<BookingInfo />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

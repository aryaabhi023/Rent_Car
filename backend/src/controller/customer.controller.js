import Customer from "../models/customer.model.js";
import nodemailer from "nodemailer";
import { asyncHandler, ApiResponse, ApiError } from "are_package";

export const newCustomer = asyncHandler(async (req, res) => {
  const {
    name,
    contact,
    email,
    pickupDate,
    pickupAddress,
    dropoffDate,
    dropoffAddress,
    carName,
  } = req.body;

  if (
    [
      name,
      contact,
      email,
      pickupDate,
      pickupAddress,
      dropoffDate,
      dropoffAddress,
    ].some((field) => field?.trim() === "" || field === undefined)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const newCustomer = new Customer({
    name,
    contact,
    email,
    pickupDate,
    pickupAddress,
    dropoffDate,
    dropoffAddress,
    carName,
  });

  const savedCustomer = await newCustomer.save();

  res
    .status(201)
    .json(new ApiResponse(201, savedCustomer, "Customer created successfully"));
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  res
    .status(200)
    .json(
      new ApiResponse(200, deletedCustomer, "Customer deleted successfully")
    );
});

export const sendEmail = async (req, res) => {
  try {
    const bookingDetails = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    async function sendCustomerBookingEmail(customerEmail, bookingDetails) {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Booking Confirmation",
        text: `Dear ${bookingDetails.name},\n\nYour booking details are as follows:\nCar Name: ${bookingDetails.carName}\nPickup Date: ${bookingDetails.pickupDate}\nPickup Address: ${bookingDetails.pickupAddress}\nDropoff Date: ${bookingDetails.dropoffDate}\nDropoff Address: ${bookingDetails.dropoffAddress}\n\nThank you for choosing us!`
      });
    }

    async function sendOwnerBookingEmail(ownerEmail, bookingDetails) {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: ownerEmail,
        subject: "New Booking Received",
        text: `Dear Owner,\n\nA new booking has been made with the following details:\nCustomer Name: ${bookingDetails.name}\nContact: ${bookingDetails.contact}\nCar Name: ${bookingDetails.carName}\nPickup Date: ${bookingDetails.pickupDate}\nPickup Address: ${bookingDetails.pickupAddress}\nDropoff Date: ${bookingDetails.dropoffDate}\nDropoff Address: ${bookingDetails.dropoffAddress}\n\nPlease confirm the booking at your earliest convenience.`
       });
    }

    async function handleBooking(bookingDetails) {
      // Check if bookingDetails contains email for customer
      if (!bookingDetails.email) {
        throw new Error("Customer email is missing.");
      }

      await sendCustomerBookingEmail(bookingDetails.email, bookingDetails);
      await sendOwnerBookingEmail(process.env.OWNER_EMAIL, bookingDetails);
    }

    await handleBooking(bookingDetails);

    res
      .status(200)
      .json(new ApiResponse(200, true, "Emails sent successfully"));
  } catch (error) {
    // Use an appropriate error status code (500 for server error)
    console.error("Error while sending emails:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = asyncHandler(async (req, res) => {
  const { pageToLoad = 1, searchTerm = "" } = req.body;
  const limit = 5;
  const page = parseInt(pageToLoad, 10);

  const totalCustomers = await Customer.countDocuments({
    name: { $regex: searchTerm, $options: "i" },
  });

  const customers = await Customer.find({
    name: { $regex: searchTerm, $options: "i" },
  })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPages = Math.ceil(totalCustomers / limit);

  res.status(200).json({
    statusCode: 200,
    data: { customers, totalPages },
    message: "Customers fetched successfully",
  });
});

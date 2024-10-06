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
      host: "smtpout.secureserver.net",
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
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2F4F4F;">Dear ${bookingDetails.name},</h2>
        <p>Thank you for choosing us for your car rental needs! We are pleased to confirm your booking with the following details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Car Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.carName?bookingDetails.carName:'----'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Date:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.pickupDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Address:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.pickupAddress}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Dropoff Date:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.dropoffDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Dropoff Address:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.dropoffAddress}</td>
          </tr>
        </table>

        <p style="margin-top: 15px;">If you are unable to reach our location for pickup or dropoff, please note that an additional charge of <strong>Rs. 200</strong> per Pickup/Drop-off will apply.</p>

        <p style="margin-top: 20px;">We look forward to serving you and hope you have a wonderful experience with our services!</p>
        
        <p style="margin-top: 20px;"><strong>Best Regards,</strong><br>
        The DriveEzz Team</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <footer style="font-size: 0.9em; color: #555;">
          <p>If you have any questions or need further assistance, feel free to reach us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #2F4F4F;">${process.env.EMAIL_USER}</a>.</p>
        </footer>
      </div>
    `,
  });
}
  
async function sendOwnerBookingEmail(ownerEmail, bookingDetails) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: ownerEmail,
    subject: "New Booking Received",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333;">New Booking Notification</h2>
        <p>Dear Owner,</p>
        <p>A new booking has been made. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Customer Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Contact:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.contact}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Car Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.carName?bookingDetails.carName:'----'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Pickup Date:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.pickupDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Pickup Address:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.pickupAddress}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Dropoff Date:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.dropoffDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Dropoff Address:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${bookingDetails.dropoffAddress}</td>
          </tr>
        </table>

        <p>Please confirm the booking at your earliest convenience.</p>
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 0;"><strong>Driveezz Team</strong></p>
        <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">For any inquiries, please contact us at support@driveezz.in.</p>
      </div>
    `
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

import { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../connection/Customer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const BookingInfo = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMoreBookings = (pageToLoad, searchTerm) => {
    if (loading || !hasMore) return;

    setLoading(true);
    getAllCustomers({pageToLoad, searchTerm})
      .then((res) => {
        if (res.customers.length > 0) {
          setBookingDetails((prevDetails) => [
            ...prevDetails,
            ...res.customers,
          ]);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  
  useEffect(() => {
    loadMoreBookings(page, searchTerm);
  }, [page, searchTerm]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDelete = (id) => {
    deleteCustomer(id)
      .then((res) => {
        setBookingDetails(
          bookingDetails.filter((booking) => booking._id !== res?.data?._id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingDetails([]); 
    setPage(1);
    setHasMore(true); 
    setSearchTerm(name);
  };

  return (
    <div className="h-screen space-y-6 bg-white py-16">
      <h2 className="text-3xl font-bold text-center mb-4">
        Booking Information
      </h2>
      <div className="w-full">
        <form className="w-full flex justify-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the name to be searched"
            className="border border-blue-300 rounded-full px-3 py-1 mr-2 w-1/2 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="bg-blue-400 py-1 px-3 rounded-full">
            Search
          </button>
        </form>
      </div>

      {bookingDetails?.length > 0 &&
        bookingDetails?.map((booking) => (
          <div
            key={booking?._id}
            className="relative w-5/6 md:5/6 mx-auto p-6 bg-neutral-200 border border-zinc-400 rounded-lg shadow-md"
          >
            <button
              className="absolute top-1 right-1 p-1 rounded-full"
              onClick={() => handleDelete(booking?._id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                aria-hidden="true"
                className="text-red-400 text-xs"
              />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Name:
                </label>
                <p className="text-foreground">{booking?.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Contact No:
                </label>
                <p className="text-foreground">{booking?.contact}</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Car Name:
                </label>
                <p className="text-foreground">
                  {booking?.carName ? booking?.carName : "--"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Pick Up Date:
                </label>
                <p className="text-foreground">{booking?.pickupDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Drop Off Date:
                </label>
                <p className="text-foreground">{booking?.dropoffDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Pick Up Address:
                </label>
                <p className="text-foreground">{booking?.pickupAddress}</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-medium text-muted-foreground">
                  Drop Off Address:
                </label>
                <p className="text-foreground">{booking?.dropoffAddress}</p>
              </div>
            </div>
          </div>
        ))}

      {loading && <div className="text-center">Loading...</div>}
      {!hasMore && <div className="text-center">No more bookings to load</div>}

      <div>
        <h1 className="text-center text-xl mb-4">Made with ❤️</h1>
      </div>
    </div>
  );
};

export default BookingInfo;

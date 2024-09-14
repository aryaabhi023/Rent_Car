import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteAddress,createAddress,getAllAddress } from "../connection/Address";

export default function LocationForm() {
  const [allAddress, setAllAddress] = useState([]);
  const [locationName, setlocationName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getAllAddress().then((res) => {
      setAllAddress(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationName !== "" && phone !== "" && address !== "") {
      createAddress({ locationName,phone,address }).then((res) => {
        setAllAddress([...allAddress,res.data]);
        setlocationName("");
        setPhone("");
        setAddress("");
      });
    }
  };

  return (
    <div className="h-screen bg-white">
      <div>
        <h1 className="text-center text-2xl font-bold mt-20">All Address</h1>
        <div>
          <form className="grid md:grid-cols-4 justify-center border-b border-zinc-200" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the Location Name"
              className="border-2 border-blue-200 p-2 m-3 rounded-full focus:outline-none"
              value={locationName}
              onChange={(e) => {
                setlocationName(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Enter the Phone Number"
              className="border-2 border-blue-200 p-2 m-3 rounded-full focus:outline-none"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Enter the Address"
              className="border-2 border-blue-200 p-2 m-3 rounded-full focus:outline-none"
              value={address}
              onChange={(e) => {
               setAddress(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="bg-blue-400 p-2 m-3 rounded-full w-1/16 text-zinc-200"
            >
              Add Address
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        {allAddress?.length > 0 &&
          allAddress?.map((user) => (
            <div
              key={user?._id}
              className="relative w-2/3 mx-auto md:w-4xl p-3 bg-neutral-100 mt-3 rounded-lg shadow-md"
            >
              <button
                className="absolute top-0 right-1 p-1 rounded-full"
                onClick={() => {
                  deleteAddress(user?._id).then((res) => {
                    setAllAddress(
                      allAddress.filter((user) => user._id !== res?.data?._id)
                    );
                  });
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  aria-hidden="true"
                  className="text-red-400 text-xs"
                />
              </button>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-2">
                  <label className="font-medium text-muted-foreground">
                    Location Name: 
                  </label>
                  <p className="text-foreground">{user?.locationName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="font-medium text-muted-foreground">
                    Phone:
                  </label>
                  <p className="text-foreground">{user?.phone}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="font-medium text-muted-foreground">
                    Address
                  </label>
                  <p className="text-foreground">{user?.address}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

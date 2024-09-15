import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  getBlockedUsers,
  createBlockedUser,
  deleteBlockedUser,
} from "../connection/BlockedUser";

export default function BlockUserList() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [CustomerNumber, setCustomerNumber] = useState("");

  useEffect(() => {
    getBlockedUsers().then((res) => {
      setBlockedUsers(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( CustomerNumber !== "" && CustomerEmail !== "") {
      createBlockedUser({ phone:CustomerNumber, email:CustomerEmail }).then((res) => {
        setBlockedUsers([res.data, ...blockedUsers]);
        setCustomerNumber("");
        setCustomerEmail("");
      });
    }
  };

  return (
    <div className="h-screen bg-white">
      <div>
        <h1 className="text-center text-2xl font-bold mt-20">Blocked Users</h1>
        <div>
          <form className="grid md:grid-cols-3 justify-center" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the Customer Email"
              className="border-2 border-red-200 p-2 m-3 rounded-full focus:outline-none"
              value={CustomerEmail}
              onChange={(e) => {
                setCustomerEmail(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Enter the Customer Number"
              className="border-2 border-red-200 p-2 m-3 rounded-full focus:outline-none"
              value={CustomerNumber}
              onChange={(e) => {
                setCustomerNumber(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="bg-red-500 p-2 m-3 rounded-full w-1/16 text-zinc-800"
            >
              Block Customer
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        {blockedUsers?.length > 0 &&
          blockedUsers?.map((user) => (
            <div
              key={user?._id}
              className="relative w-2/3 mx-auto md:w-4xl p-3 bg-neutral-100 mt-3 rounded-lg shadow-md"
            >
              <button
                className="absolute top-0 right-1 p-1 rounded-full"
                onClick={() => {
                  deleteBlockedUser(user?._id).then((res) => {
                    setBlockedUsers(
                      blockedUsers.filter((user) => user._id !== res?.data?._id)
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <label className="font-medium text-muted-foreground">
                    Phone:
                  </label>
                  <p className="text-foreground">{user?.phone}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="font-medium text-muted-foreground">
                    Email:
                  </label>
                  <p className="text-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCodes, updateCode } from "../connection/Code";

export default function Admin() {
  const [code, setCode] = useState("");
  const [navCode, setNavCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const [newNavCode, setNewNavCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCodes().then((res) => {
      setNavCode(res.data[0].navcode);
      setAdminCode(res.data[0].admincode);
      setShowNav(false);
      setShowAdmin(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(code === navCode) {
      setShowAdmin(false);
      setShowNav(true);
    } else if(code === adminCode) {
      setShowNav(false);
      setShowAdmin(true);
    }
    setCode("");
  } 

  const ChangeNavCode=(e)=>{
    e.preventDefault();
    if(newNavCode !== ""){
      updateCode(newNavCode).then((res)=>{
        setNavCode(newNavCode);
        setShowNav(true);
        setShowAdmin(false);
      })
    }
    setNewNavCode("");
  }

  return (
    <div className="bg-white flex flex-col h-screen items-center justify-center">
      <div className="text-4xl font-semibold">Admin</div>
      <br />
      <div className={`${showAdmin?"hidden":"block"} w-full`}>
        <form className="w-full flex justify-center" onSubmit={handleSubmit} >
          <input
            type="text"
            name="search"
            placeholder="Enter the code here"
            className="border-2 border-blue-200 p-2 rounded-full w-1/2 block text-center focus:outline-none"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-neutral-100 p-2 px-4 w-1/16 h-1/16 rounded-full ml-4"
          >
            Submit
          </button>
        </form>
      </div>
      <div className={`${showNav?"grid grid-cols-1 md:grid-cols-5":"hidden"}`}>
        <button className="bg-green-200 m-3 p-1 px-2 rounded-3xl text-neutral-600"
          onClick={() => {
            navigate("/car_lists/" + navCode);
          }}
        >
          Car List
        </button>
        <button className="bg-red-200 m-3 p-1 px-2 rounded-3xl text-neutral-600"
          onClick={() => {
            navigate("/blockuser_list/" + navCode);
          }}
        >
          Blocked User List
        </button>
        <button className="bg-green-200 m-3 p-1 px-2 rounded-3xl text-neutral-600"
          onClick={() => {
            navigate("/car_upload/" + navCode);
          }}
        >
          Add Car
        </button>
        <button className="bg-green-200 m-3 p-1 px-2 rounded-3xl text-neutral-600"
          onClick={() => {
            navigate("/booking_info/" + navCode);
          }}
        >
          Booking Info
        </button>
        <button className="bg-green-200 m-3 p-1 px-2 rounded-3xl text-neutral-600"
          onClick={() => {
            navigate("/add_address/" + navCode);
          }}
        >
          Add Address
        </button>
      </div>
      <div className={`${showAdmin?"block":"hidden"} mt-4 w-2/3`}>
        <form className="w-full flex justify-center" onSubmit={ChangeNavCode}>
          <input
            type="text"
            name="search"
            placeholder="Enter new Code"
            className="border-2 border-blue-200 p-2 rounded-full w-1/2 block text-center focus:outline-none"
            value={newNavCode}
            onChange={(e) => {
              setNewNavCode(e.target.value);
            }}
          />
          <button className="bg-green-500 text-white p-2 px-4 w-1/16 h-1/16 rounded-full ml-4">
            Update the code
          </button>
        </form>
      </div>
    </div>
  );
}

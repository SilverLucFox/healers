import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { atoken, dD, getDD, cancelAPPP ,backendurl} = useContext(AdminContext);
  const { SDF } = useContext(AppContext);
  const [loula, sloula] = useState(true);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Email:", email);
    console.log("Password:", password);
    const formData={email,password}
    try {
      const { data } = await axios.post(
      `${backendurl}/api/admin/addadmin`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      }
    );
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      
      toast.error(error.message)
    }


  };
  useEffect(() => {
    if (atoken) getDD();
  }, [atoken]);

  return (
    dD && (
      <div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-emerald-600">
                {dD.doctor}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-emerald-600">{dD.app}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-emerald-600">
                {dD.doctor}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-[122vh]">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-5 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-0 border border-t-0">
            {dD.lateApp.map((item, i) => (
              <div
                className="flex items-center px-6 gap-3 hover:bg-emerald-50 py-3"
                key={i}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-600 font-medium">
                    {item.docData.name}
                  </p>
                  <p className="text-emerald-600 ">{SDF(item.slotDate)}</p>
                </div>
                {item.isCompleted ? (
                  <p className="text-xs font-medium text-green-500">
                    Completed
                  </p>
                ) : item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => {
                      cancelAPPP(item._id), getDD();
                    }}
                    src={assets.cancel_icon}
                    className="w-10 cursor-pointer"
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => sloula(!loula)}
          className="fixed bottom-6  right-6 bg-green-500 rounded-xl hover:bg-green-300 hover:text-emerald-700 p-2  m-5"
        >
          Add doctor
        </div>

        <div
          className={`${
            loula ? "hidden" : "fixed"
          } p-5 m-2  top-1/2 left-1/2 w-[500px] h-[280px]  rounded-xl border border-purple-500 transform -translate-x-1/2 -translate-y-1/2 bg-purple-50`}
        >
          <div className="flex justify-between">
            <h1 className="text-center font-serif text-2xl font-semibold text-fuchsia-800">
              Add Admin :
            </h1>
            <img
              onClick={() => sloula(!loula)}
              className=" w-10 h-10"
              src={assets.exit}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <p>Email:</p>
            <input
              type="email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-fuchsia-600 m-2 p-2 border rounded-md text-gray-700"
            />
            <p>Password:</p>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-fuchsia-600 m-2 p-2 border rounded-md text-gray-700"
            />
            <div className="flex justify-center items-center w-full">
              <button
                className=" p-2 m-2 bg-purple-50 hover:bg-fuchsia-100  border border-purple-800 rounded-lg"
                type="submit"
              >
                {" "}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Dashboard;

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendurl, token ,getDoctorsData} = useContext(AppContext);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [appointments, setApp] = useState([]);
  const SDF = (SD) => {
    const dateARR = SD.split("_");
    return dateARR[0] + " " + month[Number(dateARR[1]) - 1] + " " + dateARR[2];
  };
  const getua = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setApp(data.appointment);
        console.log("appointments", data.appointment);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelApp = async(appointmentId)=>{
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(data.success){
        toast.success(data.message)
        getua()
        getDoctorsData()
}else{
  toast.error(data.message)
}
    } catch (error) { 
      toast.error(error.message);
    }
  }


  useEffect(() => {
    if (token) getua();
  }, [token]);

  return (
    <div className="p-4">
      <p className="pb-3 mt-12 font-medium text-emerald-700 border-b border-emerald-300">
        My Appointments
      </p>
      <div>
        {appointments.reverse().map((item, i) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b border-emerald-200"
            key={i}
          >
            <div>
              <img
                className="w-32 bg-emerald-100 rounded-lg"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-gray-700">
              <p className="text-lg font-semibold text-emerald-800">
                {item.docData.name}
              </p>
              <p className="text-emerald-600">{item.docData.speciality}</p>
              <p className="text-gray-800 font-medium mt-2">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-2">
                Date & Time:{" "}
                <span className="text-sm font-medium text-emerald-600">
                  {SDF(item.slotDate)} | {item.slotTime}
                </span>
              </p>
            </div>
            <div></div>{!item.cancelled&&
            <div className="flex flex-col justify-center gap-2">
              {item.payment?
              <button className="text-sm bg-slate-100 border text-emerald-400  transition-all duration-300 text-center sm:min-w-48 py-2 rounded shadow-md">
                Paid
              </button>: <button onClick={()=>cancelApp(item._id)} className="text-sm   hover:bg-red-600 transition-all duration-300 text-center sm:min-w-48 py-2 rounded shadow-md">
                Cancel Appointment
              </button>
              }
            </div>}
            {
              item.cancelled&&
              <div className="flex flex-col items-center justify-center gap-2">
                <button className="sm:min-w-48 py-2 text-red-500 border  bg-slate-100 rounded shadow-md">appointment cancelled</button>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

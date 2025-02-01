/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Rdoc from "../components/Rdoc";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, crSim, token, backendurl, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const navigate = useNavigate();

  const fetchDoctorInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(doctor);
  };

  const generateSlots = async () => {
    setDoctorSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      const endOfDay = new Date(currentDay);
      endOfDay.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDay.setHours(
          currentDay.getHours() > 10 ? currentDay.getHours() + 1 : 10
        );
        currentDay.setMinutes(currentDay.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDay.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDay < endOfDay) {
        const formattedTime = currentDay.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const dateKey = `${currentDay.getDate()}_${currentDay.getMonth() + 1}_${currentDay.getFullYear()}`;
        const isAvailable =
          !doctorInfo.slots_booked[dateKey]?.includes(formattedTime);

        if (isAvailable) {
          timeSlots.push({
            datetime: new Date(currentDay),
            time: formattedTime,
          });
        }

        currentDay.setMinutes(currentDay.getMinutes() + 30);
      }
      if(timeSlots.length!==0)
      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  };

  const handleAppointmentBooking = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      navigate("/login");
      window.scrollTo(0, 0);
      return;
    }

    if (!selectedSlotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = doctorSlots[selectedSlotIndex][0].datetime;
      const dateKey = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const response = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId, slotDate: dateKey, slotTime: selectedSlotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
        navigate("/my-appointments");
        window.scrollTo(0, 0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment: " + error.message);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (doctorInfo) {
      generateSlots();
    }
  }, [doctorInfo]);

  return (
    doctorInfo && (
      <div className="p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:max-w-xs">
            <img
              className="bg-primary w-full rounded-lg"
              src={doctorInfo.image}
              alt={`${doctorInfo.name}`}
            />
          </div>
          <div className="flex-1 border border-gray-500 rounded-lg p-6 sm:p-8 bg-white">
            <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-emerald-800">
              {doctorInfo.name}
              <img className="w-4 sm:w-5" src={assets.verified_icon} alt="Verified" />
            </h2>
            <p className="text-sm text-green-600 mt-2">
              {doctorInfo.degree} - {doctorInfo.speciality}
            </p>
            <p className="text-gray-500 mt-4">{doctorInfo.about}</p>
            <p className="mt-4 font-medium text-primary">
              Appointment Fee: {crSim}
              {doctorInfo.fees}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg text-emerald-700">Booking Slots</h3>
          <div className="flex gap-2 overflow-x-scroll mt-4">
            {doctorSlots.map((slots, index) => (
              <div
                key={index}
                className={`text-center py-4 min-w-12 rounded-full cursor-pointer ${
                  selectedSlotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-700"
                }`}
                onClick={() => {
                  setSelectedSlotIndex(index);
                  setSelectedSlotTime(null);
                }}
              >
                <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
                <p>{slots[0] && slots[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-4 mt-4">
            {doctorSlots[selectedSlotIndex]?.map((slot, i) => (
              <button
                key={i}
                className={`px-3 py-2 rounded-full ${
                  selectedSlotTime === slot.time
                    ? "bg-primary text-white"
                    : "border border-emerald-700 text-emerald-600"
                }`}
                onClick={() => setSelectedSlotTime(slot.time)}
              >
                {slot.time.toLowerCase()}
              </button>
            ))}
          </div>
          <button
            onClick={handleAppointmentBooking}
            className="mt-6 bg-primary text-white px-10 py-3 rounded-full"
          >
            Book an Appointment
          </button>
        </div>
        <Rdoc docId={docId} speciality={doctorInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;

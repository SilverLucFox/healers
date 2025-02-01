/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AssistantContext } from "../../context/assistantContext";

const AddAppointment = () => {
  const {
    backendurl,
    getC,
    doctorInfo,
    ass,
    initialize,
    conversations,
  } = useContext(AssistantContext);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const generateSlots = () => {
    if (!doctorInfo || !doctorInfo.slots_booked) return;
    const today = new Date();
    const newSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);
      const endOfDay = new Date(currentDay);
      endOfDay.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDay.setHours(
          currentDay.getHours() >= 10 ? currentDay.getHours() + 1 : 10
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
        const dateKey = `${currentDay.getDate()}_${
          currentDay.getMonth() + 1
        }_${currentDay.getFullYear()}`;
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
        newSlots.push(timeSlots);
    }
    setDoctorSlots(newSlots);
  };

  useEffect(() => {
    initialize();
  }, [activeConversationId]);

  useEffect(() => {
    if (doctorInfo) {
      generateSlots();
      getC();
    }
  }, [doctorInfo]);

  const handleAppointmentBooking = async () => {
    try {
      const docId = ass.assignedDoctor;
      console.log(ass);
      console.log(docId);
      console.log(activeConversationId);
      const date = doctorSlots[selectedSlotIndex][0].datetime;
      const dateKey = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}`;
      const response = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId, slotDate: dateKey, slotTime: selectedSlotTime },
        { headers: { Authorization: `Bearer ${activeConversationId}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setActiveConversationId(null);
        window.scrollTo(0, 0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment: " + error.message);
    }
  };

  return (
    <div className="p-2 sm:p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="mt-1">
        <div className="flex gap-4  mt-4 scrollbar-hide">
          {doctorSlots.map((slots, index) => (
            <div
              key={index}
              className={`text-center py-4 px-6 rounded-lg cursor-pointer transition-transform duration-300 ${
                selectedSlotIndex === index
                  ? "bg-emerald-700 text-white scale-105 shadow-lg"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedSlotIndex(index);
                setSelectedSlotTime(null);
              }}
            >
              <p className="text-sm font-medium">
                {slots[0] && daysOfWeek[slots[0].datetime.getDay()]}
              </p>
              <p className="text-lg font-bold">
                {slots[0] && slots[0].datetime.getDate()}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4 mt-6">
          {doctorSlots[selectedSlotIndex]?.map((slot, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedSlotTime === slot.time
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-500"
              }`}
              onClick={() => setSelectedSlotTime(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-3 items-center space-x-4">
          <button
            onClick={handleAppointmentBooking}
            className={`px-4 py-2 rounded-lg text-lg font-semibold text-white transition-all duration-300 shadow-lg ${
              selectedSlotTime && activeConversationId
                ? "bg-emerald-700 hover:bg-emerald-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedSlotTime && !activeConversationId}
          >
            {selectedSlotTime
              ? activeConversationId
                ? "Confirm Appointment"
                : "Select a Patient"
              : "Select a Slot"}
          </button>
          <select
            value={activeConversationId || ""}
            onChange={(e) => {
              const conversationId = e.target.value;
              setActiveConversationId(conversationId);
            }}
            className="h-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select a Patient
            </option>
            {conversations.map((conv) => (
              <option key={conv._id} value={conv.participants[0]._id}>
                {conv.participants[0].name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;

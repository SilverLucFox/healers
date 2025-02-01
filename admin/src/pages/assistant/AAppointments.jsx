import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AssistantContext } from "../../context/assistantContext";
import { assets } from "../../assets/assets.js"; 

function AAppointments() {
  const { calAge, cur, SDF } = useContext(AppContext);
  const {  app } = useContext(AssistantContext);
  
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (app && app.length > 0) {
      setAppointments(app);
    }
  }, [app]);

  const canTheA = (id) => {
    console.log(`Cancel appointment with id: ${id}`);
  };

  const completeApp = (id) => {
    console.log(`Complete appointment with id: ${id}`);
  };

  return (
    <div className="overflow-hidden ">
      <h1 className="text-xl font-bold mb-4">Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <div className="overflow-y-auto h-96 flex ">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-emerald-500 text-white">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Patient Info</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2">Fees</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item, i) => (
                <tr
                  className={`${
                    item.cancelled
                      ? "bg-red-200"
                      : "hover:bg-emerald-50 bg-emerald-100 text-emerald-900"
                  } border-b`}
                  key={i}
                >
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      className="w-8 rounded-full"
                      src={item.useData.image}
                      alt="Patient Avatar"
                    />
                    <span>{item.useData.name}</span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <p className="text-xs inline border border-primary px-2 rounded-full">
                      {item.payment ? "Paid" : "Unpaid"}
                    </p>
                  </td>
                  <td className="px-4 py-2 text-center">{calAge(item.useData.dob)}</td>
                  <td className="px-4 py-2">
                    {SDF(item.slotDate)}, {item.slotTime}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {cur}
                    {item.amount}
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    {item.cancelled ? (
                      <p className="text-xs font-medium text-red-800">Cancelled</p>
                    ) : item.isCompleted ? (
                      <p className="text-xs font-medium text-green-500">Completed</p>
                    ) : (
                      <div className="flex gap-2">
                        <img
                          onClick={() => canTheA(item._id)}
                          className="w-10 cursor-pointer"
                          src={assets.cancel_icon}
                          alt="Cancel"
                        />
                        <img
                          onClick={() => completeApp(item._id)}
                          className="w-10 cursor-pointer"
                          src={assets.tick_icon}
                          alt="Complete"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AAppointments;

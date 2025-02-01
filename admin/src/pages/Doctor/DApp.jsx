import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DApp = () => {
  const { dtoken, app, getApp, completeApp, canTheA } =
    useContext(DoctorContext);
  const { calAge, cur, SDF } = useContext(AppContext);

  useEffect(() => {
    getApp();
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl my-5">
      <p className="mb-3 text-lg font-medium">All appointments</p>
      <div className="bg-white border rounded min-h-[60vh] text-sm max-h-[65vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_2fr_1.5fr_1.5fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Content */}
        {app.map((item, i) => (
          <div
            className={`${
              item.cancelled ? "bg-red-200" : "hover:bg-emerald-50"
            } border-b py-3 px-6 text-gray-500 items-center sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] sm:gap-4 max-sm:flex max-sm:flex-col max-sm:gap-2`}
            key={i}
          >
            {/* Index */}
            <p className="max-sm:hidden">{i + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.useData.image}
                alt=""
              />
              <p>{item.useData.name}</p>
            </div>

            {/* Payment Status */}
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Paid" : "Unpaid"}
              </p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden text-center">{calAge(item.useData.dob)}</p>

            {/* Date & Time */}
            <p>
              {SDF(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="text-center">
              {cur}
              {item.amount}
            </p>

            {/* Action */}
            {item.cancelled ? (
              <p className="text-xs font-medium text-red-800">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-xs font-medium text-green-500">Completed</p>
            ) : (
              <div className="flex">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DApp;

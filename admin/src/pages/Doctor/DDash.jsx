import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DDash = () => {
  const { dtoken, getDData, dData,  canTheA } = useContext(DoctorContext);
  const { cur, SDF } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDData();
    }
  }, [dtoken]);

  if (!dData) return null; // Ensure data is loaded before rendering the content

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex items-center gap-4 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-emerald-600">
              {cur} {dData.ern}
            </p>
            <p className="text-gray-400">Earning</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex items-center gap-4 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-emerald-600">{dData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-gray-100 flex items-center gap-4 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-emerald-600">{dData.pat}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white p-2  rounded-lg border">
        <div className="flex items-center gap-2.5 mb-2">
          <p className="font-semibold ml-3">Latest Bookings</p>
        </div>
          {dData.lateApp.map((item, i) => (
            <div className="flex items-center gap-3 px-6 py-3 hover:bg-emerald-50 rounded" key={i}>
              <img className="w-10 h-10 rounded-full" src={item.useData.image} alt={item.useData.name} />
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-600">{item.useData.name}</p>
                <p className="text-emerald-600">{SDF(item.slotDate)}</p>
              </div>
              {item.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
              ) : item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => {
                    canTheA(item._id);
                    getDData(); // Re-fetch data after action
                  }}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DDash;

import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";
function AAPASS() {
  const { getAllAssF, dtoken, assDa, backendurl } = useContext(DoctorContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAllAssF();
  }, [dtoken]);

  const shuffleDoctor = () => {
    if (assDa.Dcont.length === 0) return;

    const nextIndex = (currentIndex + 1) % assDa.Dcont.length;
    setCurrentIndex(nextIndex);
  };
  const dell = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/delete`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );
      if (data.success) {
        getAllAssF();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!assDa || !assDa.success) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const doctor = assDa.Dcont[currentIndex];

  return assDa.Dcont.length>0?(
    <div className="max-h-[500px]  flex justify-center items-center  text-green-800 p-6">
      <div className=" p-2 bg-slate-100 rounded-xl border border-emerald-200 max-w-4xl w-full">
        <h1 className="text-4xl font-bold px-6 text-left text-green-700 mb-6">
          <p>{doctor.name}</p>
        </h1>

        {assDa.Dcont.length > 0 ? (
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p>
                  <span className="font-semibold">Email:</span> {doctor.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {doctor.phone}
                </p>
                <p>
                  <span className="font-semibold">Years of Expertise:</span>{" "}
                  {doctor.yearsOfExpertise}
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  <span className="font-semibold">At:</span>{" "}
                  {new Date(doctor.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {doctor.role}
                </p>
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-6">
              <p>
                <span className="font-semibold">Message:</span>
              </p>
              <p className="max-h-32 overflow-y-auto p-2 border border-emerald-300 rounded-md scroll-smooth text-gray-600">
                {doctor.message}
              </p>
            </div>
          </div>
        ) : (
          <div>No data available.</div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={shuffleDoctor}
            className="bg-green-800 text-white py-3 px-8 rounded-full hover:bg-green-900 transition"
          >
            Next application
          </button>
          <button
            onClick={() => dell(doctor._id)}
            className="bg-green-800 text-white py-3 px-8 rounded-full hover:bg-red-900 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ):(
    <div className=" min-h-[300px] flex items-center text-4xl text-emerald-700 justify-center"><h1>No Records</h1></div>
  );
}

export default AAPASS;

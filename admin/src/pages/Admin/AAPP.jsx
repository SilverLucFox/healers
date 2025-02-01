import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
function AAPASS() {
  const { getAllDoctersF, atoken, docDa,backendurl } = useContext(AdminContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAllDoctersF();
  }, [atoken]);
  const dell = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/delete`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      if (data.success) {
        getAllDoctersF();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const shuffleDoctor = () => {
    if (docDa.Dcont.length === 0) return;

    const nextIndex = (currentIndex + 1) % docDa.Dcont.length;
    setCurrentIndex(nextIndex);
  };

  if (!docDa || !docDa.success) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center text-xl font-semibold text-green-700">Loading...</div>
      </div>
    );
  }

  const doctor = docDa.Dcont[currentIndex];

  return docDa.Dcont.length>0?(
    <div className="min-h-[500px] flex justify-center items-center  text-green-800 p-6">
      <div className="bg-white px-3 border border-emerald-500  rounded-xl shadow-xl max-w-4xl w-full">
        <h1 className="text-4xl font-bold p-2 text-center text-green-700 mb-2">
          <p>{doctor.name}</p>
        </h1>
        
        {docDa.Dcont.length > 0 ? (
          <div className="space-y-4">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 ">
              <div className="space-y-2">
                <p><span className="font-semibold">Email:</span> {doctor.email}</p>
                <p><span className="font-semibold">Phone:</span> {doctor.phone}</p>
                <p><span className="font-semibold">Role:</span> {doctor.role}</p>
                <p><span className="font-semibold">Specialty:</span> {doctor.expertise}</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold">Years of Expertise:</span> {doctor.yearsOfExpertise}</p>
                <p><span className="font-semibold">At:</span> {new Date(doctor.createdAt).toLocaleString()}</p>
                <p><span className="font-semibold">Education:</span> {doctor.education}</p>
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-2">
              <p><span className="font-semibold">Message:</span></p>
              <p className="max-h-32 p-2 border rounded-md border-emerald-300 overflow-y-auto text-gray-600">{doctor.message}</p>
            </div>
          </div>
        ) : (
          <div>No data available.</div>
        )}
        
        <div className="mt-4 mb-2 flex justify-between">
          <button
            onClick={shuffleDoctor}
            className="bg-green-800 text-white py-3 px-8 rounded-full hover:bg-green-900 transition"
          >
            Next application
          </button><button
            onClick={() => dell(doctor._id)}
            className="bg-green-800 text-white py-3 px-8 rounded-full hover:bg-red-900 transition"
          >Delete
          </button>
        </div>
      </div>
    </div>
  ):(<div className=" min-h-[300px] flex items-center text-4xl text-emerald-700 justify-center"><h1>No Records</h1></div>
  )
}

export default AAPASS;

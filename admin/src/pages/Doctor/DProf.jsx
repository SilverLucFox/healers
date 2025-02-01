import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const DProf = () => {
  const { dtoken, getPData, pData, setPData } = useContext(DoctorContext);
  const { cur,backendurl } = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (dtoken) {
      getPData();
    }
  }, [dtoken]);
const updateP=async ()=>{
  try {
    const updateD={
      address:pData.address,
      fees:pData.fees,
      ava:pData.ava,
      name:pData.name,
    }
    const { data } = await axios.post(`${backendurl}/api/doctor/updatePro`, {body:updateD},{
      headers: {
        Authorization: `Bearer ${dtoken}`,
      },
    });
    if(data.success){
      toast.success(data.message)
      setEdit(false)
      getPData()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error)
  }
}
  return (
    pData && (
      <div className=" bg-slate-50 flex items-start justify-start p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white shadow-lg rounded-lg p-8 w-full max-w-[1400px]">
          {/* Left Section: Profile Image */}
          <div className="flex justify-center items-center">
            <img
              src={pData.image}
              alt={pData.name}
              className="w-full h-auto max-w-[250px] rounded-lg shadow-md object-cover border border-green-100"
            />
          </div>

          {/* Center Section: General Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-green-700">
              {pData.name}
            </h1>
            <p className="text-lg text-gray-600">
              {pData.degree} - {pData.speciality}
            </p>
            <button className="bg-green-100 text-green-700 px-6 py-2 rounded-full shadow-sm text-sm">
              {pData.experience} Years Experience
            </button>
            <div>
              <h2 className="text-lg font-medium text-green-600">About:</h2>
              <p className="text-gray-600">{pData.about}</p>
            </div>
          </div>

          {/* Right Section: Additional Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-medium text-green-600">
                Appointment Fee:
              </h2>
              <p className="text-gray-700">
                {cur}{" "}
                {edit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setPData((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    value={pData.fees}
                  />
                ) : (
                  pData.fees
                )}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-green-600">Address:</h2>
              <p className="text-gray-600">
                {edit ? (
                  <input
                    value={pData.address.line1}
                    type="text"
                    onChange={(e) =>
                      setPData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  pData.address.line1
                )}
                <br />
                {edit ? (
                  <input
                    value={pData.address.line2}
                    type="text"
                    onChange={(e) =>
                      setPData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  pData.address.line2
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={()=>edit&& setPData(prev=>({...prev,ava:!prev.ava}))}
                checked={pData.ava}
                type="checkbox"
                id="availability"
                className="w-5 h-5 accent-green-500"
              />
              <label htmlFor="availability" className="text-gray-700">
                Available
              </label>
            </div>
           
            {
              edit? <button
              onClick={updateP}
              className="bg-green-500 text-white px-8 py-3 rounded-lg shadow hover:bg-green-600 transition"
            >
              Save
            </button>
              :
              <button
              onClick={() => setEdit(true)}
              className="bg-green-500 text-white px-8 py-3 rounded-lg shadow hover:bg-green-600 transition"
            >
              Edit
            </button>
            }
          </div>
        </div>
      </div>
    )
  );
};

export default DProf;

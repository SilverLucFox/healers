/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { AssistantContext } from "../../context/assistantContext";
import axios from "axios";
import { toast } from "react-toastify";
function AddmR() {
  const {
    doctorInfo,
    backendurl,
    setConversations,
    conversations,
    initialize,
    assistantToken,
  } = useContext(AssistantContext);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: doctorInfo ? doctorInfo._id : "",
    diagnosis: "",
    treatment: "",
    medications: "",
    notes: "",
  });

  const getC = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/assistant/sendconv`,
        {},
        {
          headers: {
            Authorization: `Bearer ${assistantToken}`,
          },
        }
      );

      if (data.success) {
        setConversations(data.conversations);
        console.log("Fetched conversations:", data.conversations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    initialize(); 
    getC();
  }, [assistantToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(doctorInfo)
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendurl}/api/medicalrecord/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${assistantToken}`,
          },
        }
      );

      if (response.data.success) {
        setFormData({
          patient: "",
          doctor: doctorInfo._id ,
          diagnosis: "",
          treatment: "",
          medications: "",
          notes: "",
        });
        toast.success(response.data.message);
      } else {
        console.error("Error adding medical record:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting medical record:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto  px-4 bg-green-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-5 text-green-700">
        Add Medical Record
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-3">
            <label
              htmlFor="patient"
              className="block text-green-700 font-medium text-sm"
            >
              Patient
            </label>
            <select
              id="patient"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-sm transition-all duration-300 hover:border-green-300"
              required
            >
              <option value="" disabled>
                Select patient
              </option>
              {conversations.length > 0 &&
                conversations.map((m, i) => (
                  <option key={i} value={m.participants[0]._id}>
                    {m.participants[0].name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="doctor"
              className="block text-green-700 font-medium text-sm"
            >
              Doctor
            </label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={doctorInfo ? doctorInfo.name : "Loading..."}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed text-sm"
              disabled
            />
            <input type="hidden" name="doctor" value={formData.doctor} />
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="diagnosis"
            className="block text-green-700 font-medium text-sm"
          >
            Diagnosis
          </label>
          <input
            type="text"
            id="diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition-all duration-300 hover:border-green-300"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="treatment"
            className="block text-green-700 font-medium text-sm"
          >
            Treatment
          </label>
          <input
            type="text"
            id="treatment"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition-all duration-300 hover:border-green-300"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="medications"
            className="block text-green-700 font-medium text-sm"
          >
            Medications
          </label>
          <input
            type="text"
            id="medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition-all duration-300 hover:border-green-300"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="notes"
            className="block text-green-700 font-medium text-sm"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition-all duration-300 hover:border-green-300"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 mb-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddmR;

/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
export const AssistantContext = createContext();

const AssistantContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [conversations, setConversations] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [mR,sMR]=useState([])
  const [ass, setAss] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [app, sApp] = useState([]);
  const [assistantToken, setAssistantToken] = useState(
    localStorage.getItem("assistantToken")
      ? localStorage.getItem("assistantToken")
      : ""
  );
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchAssistantData = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/assistant/list`,
        {},
        {
          headers: { Authorization: `Bearer ${assistantToken}` },
        }
      );
      if (data.success) {
        return data.data;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      toast.error(error.message || "Error fetching assistant data.");
      return null;
    }
  };
  const fetchDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/list`);
      if (data.success) {
        return data.data;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.message || "Error fetching doctors.");
      return [];
    }
  };
  const initialize = async () => {
    try {
      const [assData, doctorData] = await Promise.all([
        fetchAssistantData(),
        fetchDoctorsData(),
      ]);
      if (!assData || !doctorData) {
        throw new Error("Failed to fetch required data.");
      }
      setAss(assData);
      setDoctors(doctorData);
      const assignedDoctor = assData.assignedDoctor;
      const doctor = doctorData.find((doc) => doc._id === assignedDoctor);
      if (doctor) {
        console.log("dr",doctor)
        setDoctorInfo(doctor);
      } else {
        toast.error("Assigned doctor not found.");
      }
    } catch (error) {
      console.error("Error during initialization:", error);
      toast.error(error.message || "Error initializing data.");
    }
  };
  const getApp = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/assistant/appointmrnts`,
        {
          headers: {
            Authorization: `Bearer ${assistantToken}`,
          },
        }
      );
      if (data.success) {
        console.log(data.app);
        sApp(data.app.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getMR =async()=>{
    try {
      
      const { data } = await axios.get(
        `${backendurl}/api/medicalrecord/get`,
        {
          headers: {
            Authorization: `Bearer ${assistantToken}`,
          },
        }
      );
      if(data.success){
        console.log("MR:",data.data)
        sMR(data.data.reverse())
      }
    } catch (error) {
      
      console.log(error);
      toast.error(error.message);
    }

  }
  useEffect(() => {
    const fetchData = async () => {
      await getApp();
    };
    fetchData();
  }, [assistantToken]); 

  const value = {
    assistantToken,getMR,
    setAssistantToken,
    backendurl,
    getC,getApp,
    app,
    sApp,
    conversations,
    setConversations,
    fetchAssistantData,
    fetchDoctorsData,
    initialize,
    doctorInfo,mR,sMR,
    setDoctorInfo,
    ass,
    setAss,
    doctors,
    setDoctors,
  };

  return (
    <AssistantContext.Provider value={value}>
      {props.children}
    </AssistantContext.Provider>
  );
};
export default AssistantContextProvider;

/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );
  const [app, sApp] = useState([]);
  const [pData, setPData] = useState(false);
  const [dData, setDData] = useState(false);
  const [assDa, setAssda] = useState([]);
  const getApp = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctor/appointmrnts`,
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
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
  const completeApp = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/completeapp`,
        { appointmentId: appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getApp();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const canTheA = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/canit`,
        { appointmentId: appointmentId },
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getApp();
        getDData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getDData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/dash`, {
        headers: {
          Authorization: `Bearer ${dtoken}`,
        },
      });
      if (data.success) {
        setDData(data.dashD);
        console.log(data.dashD);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getPData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${dtoken}`,
        },
      });
      if (data.success) {
        setPData(data.proData);
        console.log(data.proData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getAllAssF = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/doctor/getF`,
        {},
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );
      if (data.success) {
        console.log(data);
        setAssda(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dtoken,
    getAllAssF,
    getPData,
    pData,
    setPData,
    setDtoken,
    backendurl,
    assDa,
    app,
    getApp,
    completeApp,
    canTheA,
    getDData,
    dData,
    setDData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

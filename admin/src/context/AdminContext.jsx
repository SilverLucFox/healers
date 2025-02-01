/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [dD, sDD] = useState(false);
  const [atoken, setatoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [docDa, setDocDa] = useState([]);
  const [app, sApp] = useState([]);
  const getAllDocters = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/all-doctor`,
        {},
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeAva = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/change-ava`,
        { docId },
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDocters();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDD = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      });
      if (data.success) {
        sDD(data.dashData);
        console.log("zobeh:", data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAllAPP = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      });
      if (data.success) {
        console.log(data.appointments);
        sApp(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAPPP = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/cancel`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAPP();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAllDoctersF = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/getF`,
        {},
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      if (data.success) {
        console.log(data);
        setDocDa(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const value = {
    atoken,
    getAllDoctersF,
    docDa,
    setatoken,
    app,
    cancelAPPP,
    sApp,
    getDD,
    dD,
    getAllAPP,
    backendurl,
    doctors,
    getAllDocters,
    changeAva,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

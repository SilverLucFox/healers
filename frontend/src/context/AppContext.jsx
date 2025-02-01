/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppConpro = (props) => {
  const crSim = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const [doctors, setDoctors] = useState([]);


  const getDoctorsData = async () => {
    try {
      console.log(`${backendurl}/api/doctor/list`);
      const { data } = await axios.get(`${backendurl}/api/doctor/list`);
      console.log("Response Data:", data); // Log the full response data

      if (data.success) {
        setDoctors(data.data);
        console.log("Doctors data:", data.data); // Log doctors data directly
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
      toast.error(error.message || "An error occurred while fetching doctors.");
    }
  };
  const loadUserData = async () => {
    try {
      console.log("token :", token);
      const { data } = await axios.get(backendurl + "/api/user/get-profile", {
        headers: { Authorization: `Bearer ${token}` }, // Send token as Bearer token
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error loading User Data:", error);
      toast.error(
        error.message || "An error occurred while loading User Data."
      );
    }
  };
  const value = {
    crSim,
    doctors,getDoctorsData,
    token,
    setToken,
    backendurl,
    userData,
    setUserData,
    loadUserData,
  };
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setUserData(false);
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppConpro;

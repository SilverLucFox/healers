/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { AssistantContext } from "../context/assistantContext";
const Login = () => {
  const [stat, sets] = useState("Admin"); // Tracks the current role (Admin, Doctor, or Assistant)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navi = useNavigate();
  const { setatoken, backendurl } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);
  const {setAssistantToken}=useContext(AssistantContext)
  const subhand = async (event) => {
    event.preventDefault();

    try {
      if (stat === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setatoken(data.token);
          navi("/admin-dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (stat === "Doctor") {
        const { data } = await axios.post(backendurl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDtoken(data.token);
          navi("/doctor-dashboard");
        } else {
          toast.error(data.message);
        }
      } else if (stat === "Assistant") {
        const { data } = await axios.post(backendurl + "/api/assistant/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("assistantToken", data.token);
          setAssistantToken(data.token)
          toast.success("Assistant logged in successfully!");
          navi("/assistant-dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={subhand} className="min-h-[80vh] flex items-center">
      <div className=" flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl border-primary text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className=" text-primary">{stat}</span> Login
        </p>
        <div className="w-full">
          <p>Email :</p>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className=" border border-emerald-400 rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password :</p>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className=" border border-emerald-400 rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className=" bg-primary text-white w-full py-2 rounded-md">
          Login
        </button>
        {stat === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => sets("Doctor")}
            >
              Click me
            </span>
          </p>
        ) : stat === "Doctor" ? (
          <p>
            Assistant Login?{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => sets("Assistant")}
            >
              Click me
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => sets("Admin")}
            >
              Click me
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;


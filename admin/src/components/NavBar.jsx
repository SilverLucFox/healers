import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate}from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext";
import { AssistantContext } from "../context/assistantContext";
const NavBar = () => {
  const { atoken,setatoken } = useContext(AdminContext);
  const { dtoken,setDtoken } = useContext(DoctorContext);
  const {assistantToken, setAssistantToken}=useContext(AssistantContext)
  const navi =useNavigate()
  const logout = ()=>{
    navi('/')
    atoken && setatoken('')
    dtoken && setDtoken('')
    assistantToken && setAssistantToken('')
    atoken && localStorage.removeItem('atoken')
    dtoken && localStorage.removeItem('dtoken')
    assistantToken && localStorage.removeItem('assistantToken')
  }

  return (
    <div className=" flex items-center px-4 sm:px-10 py-3 border-b bg-white justify-between">
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center sm:w-40 cursor-pointer gap-2">
          <img
            src={assets.admin_logo}
            alt="Admin Logo"
            className="max-w-[80px]"
          />
          <div>
            <h1 className="text-xl text-primary font-bold">Healers</h1>
            <small className="text-xs text-emerald-500">Admin Panel</small>
          </div>
        </div>
        <p className="border p-2.5 rounded-full  border-emerald-500 text-primary py-0.5">{atoken ? "Admin" : dtoken?"Doctor":"Assistant"}</p>
      </div>
      <button onClick={logout} className="bg-primary text-white text-sm rounded-full px-10 py-2">Logout</button>
    </div>
  );
};

export default NavBar;

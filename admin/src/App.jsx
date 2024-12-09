import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import Appointments from "./pages/Admin/Appointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DDash from "./pages/Doctor/DDash";
import DApp from "./pages/Doctor/DApp";
import DProf from "./pages/Doctor/DProf";
import MCQ from "./pages/Doctor/MCQ";
import PP from "./pages/Doctor/PP";
import Aass from "./pages/Doctor/Aass";
import AssDash from "./pages/assistant/AssDash";
import { AssistantContext } from "./context/assistantContext";
import ChatRoom from "./pages/assistant/ChatRoom";
import DChatRoom from "./pages/Doctor/DChatRoom";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const {assistantToken}= useContext(AssistantContext)
  if (!atoken && !dtoken&&!assistantToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <ToastContainer />
      <NavBar />

      <div className="flex">
        <SideBar />

        <div className="flex-1 p-4">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/admin-adddoctor" element={<AddDoctor />} />
            <Route path="/admin-appointments" element={<Appointments />} />
            <Route path="/admin-doctorslist" element={<DoctorsList />} />

            {/* Doctor Routes */}
            <Route path="/doctor-p" element={<PP />} />
            <Route path="/doctor-addass" element={<Aass />} />
            <Route path="/doctor-dashboard" element={<DDash />} />
            <Route path="/doctor-appointments" element={<DApp />} />
            <Route path="/doctor-profile" element={<DProf />} />
            <Route path="/doctor-mcq" element={<MCQ />} />
            <Route path="/doctor-dchatroom" element={<DChatRoom/>} />
            {/*ass routes*/}
            <Route path="/assistant-dashboard" element={<AssDash/>} />
            <Route path="/assistant-chatroom" element={<ChatRoom/>} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

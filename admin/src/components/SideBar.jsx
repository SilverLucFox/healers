import { useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { AssistantContext } from '../context/assistantContext';

function SideBar() {
  const navi = useNavigate();
  const location = useLocation();  
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  const {assistantToken}=useContext(AssistantContext)
  const handleNavigation = (route) => {
    navi(route);
  };

  // Helper function to determine if the current route is active
  const isActive = (route) => location.pathname === route;

  return (
    <div className="w-64 h-screen bg-gradient-to-r scrollbar-hide from-primary to-primary-dark text-white p-6 shadow-xl  overflow-y-auto">
      {/* Admin Navigation */}
      {atoken && (
        <ul className="space-y-6">
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/admin-dashboard')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/admin-dashboard')}
          >
            <img src={assets.list_icon} alt="" className="w-6 h-6" />
            <span className="text-lg">Dashboard</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/admin-adddoctor')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/admin-adddoctor')}
          >
            <img src={assets.add_icon} alt="" className="w-6 h-6" />
            <span className="text-lg">Add Doctors</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/admin-appointments')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/admin-appointments')}
          >
            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
            <span className="text-lg">Appointments</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/admin-doctorslist')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/admin-doctorslist')}
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6" />
            <span className="text-lg">Doctors List</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/admin-apps')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/admin-apps')}
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6" />
            <span className="text-lg">Application List</span>
          </li>
        </ul>
      )}

      {/* Doctor Navigation */}
      {dtoken && (
        <ul className="space-y-2">
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-dashboard')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-dashboard')}
          >
            <span className="text-lg">Dashboard</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-appointments')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-appointments')}
          >
            <span className="text-lg">Appointments</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-profile')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-profile')}
          >
            <span className="text-lg">Profile</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-mcq')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-mcq')}
          >
            <span className="text-lg">MCQ Game</span>
          </li><li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-chats')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-chats')}
          >
            <span className="text-lg">Chats</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-p')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-p')}
          >
            <span className="text-lg">Patients</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-addass')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-addass')}
          >
            <span className="text-lg">Add Assistant</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/doctor-assap')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/doctor-assap')}
          >
            <span className="text-lg">Assistant Apps</span>
          </li>
        </ul>
      )}
      {
        assistantToken&& <ul className="space-y-6">
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/assistant-dashboard')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/assistant-dashboard')}
          >
            <span className="text-lg">Dashboard</span>
          </li><li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/assistant-AddAppointment')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/assistant-AddAppointment')}
          >
            <span className="text-lg">Add Appointment</span>
          </li><li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/assistant-Appointments')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/assistant-Appointments')}
          >
            <span className="text-lg">Appointments</span>
          </li><li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/assistant-achats')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/assistant-achats')}
          >
            <span className="text-lg">Chats</span>
          </li><li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/assistant-medrec')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/assistant-medrec')}
          >
            <span className="text-lg">Add Med Record</span>
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-300 ease-in-out transform ${
              isActive('/assistant-allmr')
                ? 'bg-white text-primary font-semibold shadow-lg'
                : 'hover:bg-white hover:text-primary hover:scale-105'
            }`}
            onClick={() => handleNavigation('/assistant-allmr')}
          >
            <span className="text-lg">Medical Records</span>
          </li>
          </ul>
      }
    </div>
  );
}

export default SideBar;

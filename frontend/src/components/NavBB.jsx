
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBB = () => {
  const navi = useNavigate();
  const [sm, setsm] = useState(false);
  const {token,setToken,userData}=useContext(AppContext)
  const setf= ()=>{
    setToken(false)
      localStorage.removeItem('token')
    
  }
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-600">
      {/* Logo and navigation */}
      <div onClick={() => navi("/")} className="flex items-center justify-between gap-3 ml-3 text-4xl">
        <img className="w-14 cursor-pointer" src={assets.logo} alt="" />
        <p>
          <span className="text-primary font-semibold">H</span>ealers
        </p>
      </div>

      {/* Desktop navigation links */}
      <ul className="hidden md:flex items-start font-medium gap-8">
        <NavLink to="/">
          <li className="py-2 px-4 text-lg hover:text-primary hover:font-semibold transition-all duration-300">
            Home
          </li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-2 px-4 text-lg hover:text-primary hover:font-semibold transition-all duration-300">
            All Doctors
          </li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-2 px-4 text-lg hover:text-primary hover:font-semibold transition-all duration-300">
            About
          </li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-2 px-4 text-lg hover:text-primary hover:font-semibold transition-all duration-300">
            Contact
          </li>
        </NavLink>
      </ul>

      {/* Profile and login button */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 rounded-full" src={userData.image} alt="" />
            <img className="w-3" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navi("/my-profile")} className="hover:text-black hover:font-semibold cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navi("/my-appointments")} className="hover:text-black hover:font-semibold cursor-pointer">
                  My Appointments
                </p>
                <p onClick={setf} className="hover:text-black hover:font-semibold cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navi("/login")} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">
            Login
          </button>
        )}

        {/* Mobile menu toggle button */}
        <img onClick={() => setsm(true)} src={assets.menu_icon} alt="" className="w-6 md:hidden" />
      </div>

      {/* Mobile menu (hidden by default) */}
      <div
        className={`fixed inset-0 bg-white z-30 flex flex-col p-6 space-y-4 md:hidden transition-all duration-500 ${
          sm ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button and logo */}
        <div className="flex justify-between items-center">
          <div onClick={() => (navi("/"), setsm(false))} className="flex items-center gap-3 text-4xl cursor-pointer transition-transform duration-300 hover:scale-105">
            <img className="w-12" src={assets.logo} alt="Logo" />
            <p className="font-semibold text-primary">
              H<span className="text-black">ealers</span>
            </p>
          </div>
          <img
            onClick={() => setsm(false)}
            src={assets.cross_icon}
            alt="Close Icon"
            className="w-6 cursor-pointer transition-transform duration-300 hover:rotate-90"
          />
        </div>

        {/* Mobile menu links */}
        <ul className="flex flex-col space-y-6 text-lg">
          <NavLink to="/" onClick={() => setsm(false)} className="hover:text-primary transition-colors duration-300">
            <p>Home</p>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setsm(false)} className="hover:text-primary transition-colors duration-300">
            <p>All Doctors</p>
          </NavLink>
          <NavLink to="/about" onClick={() => setsm(false)} className="hover:text-primary transition-colors duration-300">
            <p>About Us</p>
          </NavLink>
          <NavLink to="/contact" onClick={() => setsm(false)} className="hover:text-primary transition-colors duration-300">
            <p>Contact Us</p>
          </NavLink>
          {
            !token&&
          <NavLink to="/login" onClick={() => setsm(false)} className="hover:text-primary transition-colors duration-300">
            <p>Login</p>
          </NavLink>
          }
        </ul>
      </div>
    </div>
  );
};

export default NavBB;

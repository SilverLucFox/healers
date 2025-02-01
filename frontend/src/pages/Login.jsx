/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {toast}from 'react-toastify'
import axios from 'axios'
import {useNavigate}from 'react-router-dom'
const Login = () => {

  const {backendurl,token,setToken}=useContext(AppContext)
  const navi = useNavigate()
  const [state, setState] = useState("Login")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [name, setName] = useState("")
  const onSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendurl}/api/user/register`, { name, pass, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/user/login`, { pass, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
  
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
    
  };
  useEffect(()=>{
if(token){
  navi('/')
}
  },[token])
  
  return (
    <form onSubmit={onSubmit} className="min-h-[80vh] flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg space-y-6">
        <p className="text-3xl font-bold text-center text-emerald-600">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        {state === 'Sign Up' && (
          <div>
            <label htmlFor="name" className="block text-emerald-500">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-emerald-500">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-emerald-500">Password</label>
          <input
            id="password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="text-emerald-600 hover:underline ml-2"
            >
              {state === 'Sign Up' ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </form>
  )
}

export default Login

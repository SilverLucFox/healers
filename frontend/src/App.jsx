
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import NavBB from './components/NavBB'
import Foot from './components/Foot'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './components/chatbot'
import ContactForm from './pages/ContactForm'
const App = () => {
 
  return (
    <div className='mx-4 sm:mx-[10%]'> 
    <ToastContainer/>
      <NavBB/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:specialty' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/form' element={<ContactForm/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
      </Routes>
      <Chatbot/>
      <Foot/>
    </div>
  )
}

export default App

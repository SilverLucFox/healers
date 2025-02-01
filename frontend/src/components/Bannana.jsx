import{ assets} from "../assets/assets"
import {useNavigate } from 'react-router-dom'
const Bannana = () => {
    const navi = useNavigate()
  return (
    <div className="flex bg-primary/15 rounded-lg px-6 sm:px-14 my-20 md:mx-10">
        <div className="flex-1 py-8 sm:py-10 lg:py-24 lg:pl-5">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold ">
                <p>
                    Book <span className="text-primary">Appointment</span>
                </p>
                <p className=" mt-4">
                    With 100+ <span className="text-primary">Trusted</span> Doctors
                </p>
            </div>
            <button onClick={()=>{navi('/login');scrollTo(0,0)}} className="bg-primary text-sm text-white px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all sm:text-base">Create account</button>
        </div>
    
    
            <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
            <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img}alt=""/>
        </div>
    </div>
  )
}

export default Bannana

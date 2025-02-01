import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { useEffect } from "react"
import{ AppContext,}from '../../context/AppContext'
import { assets } from "../../assets/assets"
const Appointments = () => {
  
  const {atoken,app,getAllAPP,cancelAPPP}=useContext(AdminContext)
  const {calAge,cur ,SDF}=useContext(AppContext)
  useEffect(()=>{
    if(atoken){
      getAllAPP()
    }
  },[atoken])
  return (
    <div className="w-full max-w-6xl my-5">
    <p className="mb-3 text-lg font-medium">All appointments</p>
    <div className="bg-white border rounded min-h-[60vh] text-sm max-h-[65vh] overflow-y-scroll ">
      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b ">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>
      {app.map((item,i)=>(
        <div className="flex flex-wrap justify-between max-sm:gap-2 border-b sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 hover:bg-emerald-200 text-gray-500 items-center" key={i}> 
          <p className=" max-sm:hidden">{i+1}</p>
          <div className="flex items-center gap-2"><img className="w-8 rounded-full" src={item.useData.image} alt="" /><p>{item.useData.name}</p></div>
        <p className="max-sm:hidden">{calAge(item.useData.dob)}</p>
        <p>{SDF(item.slotDate)} | <span className="text-emerald-700">{item.slotTime}</span></p>
        <div className="flex items-center gap-2"><img className="w-8 bg-green-200 rounded-full" src={item.docData.image} alt="" /><p>{item.docData.name}</p></div>
        <p>{cur}{item.amount}</p>
        {item.isCompleted ? (
              <p className="text-xs font-medium text-green-500">Completed</p>
            ) 
          :item.cancelled?<p className="text-red-400 text-xs font-medium">Cancelled</p>:
        <img onClick={()=>cancelAPPP(item._id)} src={assets.cancel_icon} className="w-10 cursor-pointer" alt=""/>
        }
        </div>
      ))}

    </div>
    </div>
  )
}

export default Appointments
import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"

const DoctorsList = () => {
  const{doctors,atoken,getAllDocters,changeAva}= useContext(AdminContext)
  useEffect(()=>{
    if(atoken){
      getAllDocters()
    }
  },[atoken])
      
  return (
 <div className="m-5 ">
  <h1 className="text-lg p-3 font-medium">All Doctors</h1>
  <div className="w-full max-h-[410px] scrollbar-hide overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5">
    {doctors.map((item, i) => (
      <div
        className="border border-emerald-500 rounded-xl overflow-hidden cursor-pointer group"
        key={i}
      >
        <img
          className="bg-green-50 group-hover:bg-primary transition-all duration-500"
          src={item.image}
          alt=""
        />
        <div className="p-4">
          <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
          <p className="text-zinc-400 text-sm">{item.speciality}</p>
          <div className="mt-2 text-sm flex items-center gap-2">
            <input type="checkbox" checked={item.ava} onChange={()=>changeAva(item._id)} />
            <p>Available</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default DoctorsList

import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'
const Spicy = () => {
  return ( 
    <div id='spicy' className='flex flex-col items-center gap-4 text-gray-900 py-16'>
        <h1 className='text-3xl font-medium'>Find by <span className='text-primary'>Specialty</span></h1>
        <div className='flex flex-row gap-4 pt-5 sm:justify-center w-full overflow-scroll'>
            {specialityData.map((item,i)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={i} to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt=''/>
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
      
    </div>
  )
}

export default Spicy

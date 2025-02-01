
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-slate-100 rounded-lg px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
            <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight'>
                <span className='text-primary'>Book</span> Appointment <br/> With trusted<span className='text-primary'> Doctors</span> 
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 '>
                <img className='w-28' src={assets.group_profiles}alt=''/>
                <p>Simply browse through our extensive list of trusted <span className='text-primary font-semibold'>Doctors</span>, <br className='hidden sm:block'/><span className='text-primary font-semibold'>schedule </span>your appointment hassle-free.</p>
            </div>
            <a className='flex items-center gap-2 px-8 py-3 rounded-full text-white bg-primary text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href='#spicy'>
                Book your appointment
                <img className='w-3' src={assets.arrow_icon} alt=''/>
            </a>
        </div>
      
            
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt='' />
        </div>
    </div>
  )
}

export default Header

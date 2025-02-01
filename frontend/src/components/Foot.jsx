import { assets } from "../assets/assets"


const Foot = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <div className='flex mb-5  items-center gap-3 ml-3 text-4xl'><img className='w-14 cursor-pointer' src={assets.logo} alt=''/><p><span className='text-primary font-semibold '>H</span>ealers</p></div>
                <p className="w-full md:w2/3 text-emerald-700 leading-6">Healers - Connecting You to Trusted Healthcare Professionals Book appointments with top doctors and specialists across various fields through Healers. We&apos;re dedicated to making healthcare accessible, efficient, and tailored to your needs. Your health is our priority</p>
            </div>
            <div >
                <p className="text-xl font-medium mb-5">Company</p>
                <ul className="flex flex-col text-emerald-700 gap-2 ">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col text-emerald-700 gap-2 ">
                    <li>
                        +961 81 192 415
                    </li>
                    <li>
                        jawad.a.c444@gmail.com 
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className="py-5 text-center text-sm">© 2024 Healers. All rights reserved. Healers is a trusted platform for booking healthcare appointments. Unauthorized duplication or redistribution of content is strictly prohibited.</p>
        </div>
    </div>
  )
}

export default Foot
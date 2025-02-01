import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navi = useNavigate()
  return (
    <div className="p-8 sm:p-12 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-4"><span className="text-emerald-500">Contact</span> US</h2>
        <p className="text-gray-600 mb-8">
          We’re here to help. Reach out to us for assistance, inquiries, or feedback. Our team at Healers is dedicated to supporting your journey to wellness.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto text-gray-800">
        <div className="w-full md:w-1/2">
          <img src={assets.contact_image} alt="Contact" className="rounded-lg shadow-lg w-full h-auto transition-transform duration-300 hover:scale-105" />
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-emerald-600">Email Us</h3>
            <p className="text-sm mb-4">Send us an email, and we’ll get back to you within 24 hours:</p>
            <p className="text-sm font-medium text-emerald-700 transition-colors duration-300 hover:text-emerald-500">support@healers.com</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-emerald-600">Call Us</h3>
            <p className="text-sm mb-4">Our support line is open 9 AM - 6 PM on weekdays:</p>
            <p className="text-sm font-medium text-emerald-700 transition-colors duration-300 hover:text-emerald-500">+1 (123) 456-7890</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-600 hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-emerald-600">Visit Us</h3>
            <p className="text-sm">123 Wellness Ave, Suite 100<br/>Healers City, HC 12345</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button onClick={()=>(navi('/form'),window.scrollTo(0, 0))} className="bg-primary text-white font-semibold py-3 px-10 rounded-full transition-all duration-300 hover:bg-emerald-600 hover:scale-105">
          Explore Jobs
        </button>
      </div>
    </div>
  );
};

export default Contact;

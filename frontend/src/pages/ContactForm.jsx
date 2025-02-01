import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
function ContactForm() {
  const {backendurl} = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'doctor', // Default role
    expertise: '',
    education: '',
    yearsOfExpertise: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
   
     try{
       
    const { data } = await axios.post(`${backendurl}/api/user/regi`, { formData});
    if(data.success){
      toast.success(data.message)
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'doctor', 
        expertise: '',
        education: '',
        yearsOfExpertise: '',
        message: '',
      })
      window.scrollTo(0, 0)
    }else{
    toast.error(data.message)

    }
     }
    catch (error) {
      console.log(error)
    toast.error(error.message)
   }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-slate-50 shadow-xl rounded-lg border border-green-200">
      <h2 className="text-3xl font-extrabold mb-8 text-green-800 text-center">Apply as a Doctor or Assistant</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-green-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-green-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-lg font-medium text-green-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-lg font-medium text-green-700">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
          >
            <option value="doctor">Doctor</option>
            <option value="assistant">Assistant</option>
          </select>
        </div>

        {formData.role === 'doctor' && (
          <>
            <div>
              <label htmlFor="expertise" className="block text-lg font-medium text-green-700">Expertise</label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                required
                placeholder="Enter your area of expertise"
                className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
              />
            </div>

            <div>
              <label htmlFor="education" className="block text-lg font-medium text-green-700">Education</label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                placeholder="Enter your highest degree or qualification"
                className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
              />
            </div>
          </>
        )}<div>
              <label htmlFor="yearsOfExpertise" className="block text-lg font-medium text-green-700">Years of Expertise</label>
              <input
                type="number"
                id="yearsOfExpertise"
                name="yearsOfExpertise"
                value={formData.yearsOfExpertise}
                onChange={handleChange}
                required
                placeholder="Enter your years of experience"
                className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
              />
            </div>

        <div>
          <label htmlFor="message" className="block text-lg font-medium text-green-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message or additional information"
            className="mt-2 block w-full p-4 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
            rows="5"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-green-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

const Aass = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { backendurl, dtoken } = useContext(DoctorContext);

  const onSubHand = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        name,
        email,password,phone
      }
      const { data } = await axios.post(
        `${backendurl}/api/doctor/addass`,
        {formData:formData},
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setName(""); 
        setEmail("");
        setPassword("");
        setPhone("");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <form
        onSubmit={onSubHand}
        className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mx-4"
      >
        {/* Name and Email */}
        <div className="col-span-1 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Assistant Name:</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-2 border rounded-md text-gray-700"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Assistant Email:</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-2 border rounded-md text-gray-700"
            />
          </div>
        </div>

        {/* Password and Phone */}
        <div className="col-span-1 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Assistant Password:</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded-md text-gray-700"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Phone Number:</p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="text"
              placeholder="Phone Number"
              required
              className="w-full p-2 border rounded-md text-gray-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 flex flex-col justify-center">
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-150"
          >
            Add Assistant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Aass;

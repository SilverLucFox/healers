/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useContext } from "react";
import { MessageCircle, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
const Chatbot = () => {
  
  const { backendurl,userData,token ,doctors } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("doctorList");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const messagesEndRef = useRef(null);

  const[len,slen]=useState(0)
   
  useEffect(() => {
      if (messages.length > len ) {
          slen(messages.length)
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
  const getMessages = async (receiverId)=>{
    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.get(
        `${backendurl}/api/messages/get/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data)
    } catch (error) {
      console.error("Error receiving message:", error);
    }
  }

  useEffect(() => {
    let interval;
    if (selectedDoctor) {
      interval = setInterval(() => {
        getMessages(selectedDoctor._id);
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [selectedDoctor]);
  const handleSendMessage = async (receiverId) => {
    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.post(
        `${backendurl}/api/messages/send/${receiverId}`,
        {
          message:input,
          senderRole:'user',
          receiverRole:'doctor',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Message sent", response.data);
      
      setInput("")
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(userData._id)
  const toggleSidebar = () => setIsOpen(!isOpen);
  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSpecialty ? doctor.speciality === selectedSpecialty : true)
  );

  const specialties = [...new Set(doctors.map((doctor) => doctor.speciality))];

  return token&& (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 bg-green-500 text-white px-3 py-3 rounded-full shadow-lg flex items-center hover:bg-green-600 transition z-50"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-80 z-50`}
      >
        {!selectedDoctor && (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-green-700 text-white">
              <h2 className="text-xl font-semibold">Chat Room</h2>
              <button onClick={toggleSidebar}>
                <X className="w-5 h-5 text-white hover:text-gray-200" />
              </button>
            </div>
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="flex items-center flex-col h-full">
          {step === "doctorList" ? (
            <div className="flex flex-col w-[90%] h-[80%] overflow-auto">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setMessages([])
                      setStep("chat");
                    }}
                    className="w-full text-left p-4 mb-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    {doctor.name} - {doctor.speciality}
                  </button>
                ))
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 bg-green-700 text-white flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {" "}
                  {selectedDoctor.name}
                </h2>
                <button
                  onClick={() => {
                    setStep("doctorList");
                    setSelectedDoctor(null);
                  }}
                  className="bg-red-500 px-3 py-1 rounded-lg"
                >
                  Back
                </button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
                {messages.map((msg, index) => (
                  <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.senderRole === "user"
                ? "bg-emerald-500 text-white "
                : msg.senderRole === "doctor"
                ? "bg-blue-500 text-white "
                : msg.senderRole === "assistant"
                ? "bg-yellow-500 text-black "
                : "bg-gray-300 text-black "
            }`}
          >
            <p className="font-thin text-xs">{msg.senderRole!=="user"&&msg.senderRole}</p>
            {msg.message}
          </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-2 bg-white border-t flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={
                    (e) => e.key === "Enter"
                    && handleSendMessage(selectedDoctor._id)
                  }
                  className="flex-1 border rounded-lg px-4 py-2 mr-2 focus:outline-none"
                  placeholder="Type your message..."
                />
                <button onClick={()=>(handleSendMessage(selectedDoctor._id))} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Chatbot;

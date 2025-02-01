/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { AssistantContext } from "../../context/assistantContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link} from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";

function Chats() {
  const { dtoken, backendurl } = useContext(DoctorContext);
  const [messages, setmessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  
  const getC = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/assistant/sendconv`,
        {},
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );

      if (data.success) {
        setConversations(data.conversations);
        console.log("Fetched conversations:", data.conversations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getM = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/assistant/sendmsg`,
        {},
        {
          headers: {
            Authorization: `Bearer ${dtoken}`,
          },
        }
      );

      if (data.success) {
        setmessages(data.enrichedMessages);
        console.log("Fetched messages:", data.enrichedMessages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const delcon= async (id) => {
    try {
      const { data } = await axios.post(
      `${backendurl}/api/assistant/delcon`,
      {body:id},
      {
        headers: {
          Authorization: `Bearer ${dtoken}`,
        },
      }
    );
    if(data.success){
      getC()
      toast.success(data.message)
    }
      
    } catch (error) {
      toast.error(error.message);
    }

  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      getM();
      getC();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getC();
  }, [dtoken]);

  useEffect(() => {
    getM();
  }, [dtoken]);

  const sortedConversations = conversations
    .map((conversation) => {
      const latestMessage = messages
        .filter((message) => message.conversationId === conversation._id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]; 
      return { ...conversation, latestMessage }; 
    })
    .sort((a, b) => new Date(b.latestMessage?.createdAt) - new Date(a.latestMessage?.createdAt)); 

  return (<div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
    {sortedConversations.map((conversation) => (
      <div
        key={conversation._id}
        className="border flex justify-between items-center border-green-300 rounded-lg p-3 bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out overflow-y-auto"
      >
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-green-800  truncate">{conversation.participants[0].name}</h2>
  
          <p className="text-green-700 text-sm">
            <span className="font-semibold text-green-800">Last Message: </span>
            <span>
              {conversation.latestMessage ? (
                <span className="text-green-700">{conversation.latestMessage.message}</span>
              ) : (
                <span className="text-green-700 italic">No messages</span>
              )}
            </span>
          </p>
        </div>
  
        <div className="flex items-center justify-center   ">
          <Link to={`/doctor-dchatroom/id/${conversation.participants[0]._id}`}> <button  className="bg-green-500 text-white w-[70px] px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-all duration-300 ease-in-out flex justify-center items-center">
           View</button> </Link> 
          
          <button onClick={()=>(delcon(conversation._id))} className="bg-red-500 ml-3 text-white w-[70px] px-4 py-2 mr-2 rounded-lg text-sm hover:bg-red-600 transition-all duration-300 ease-in-out flex justify-center items-center">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
  
  );
}

export default Chats;

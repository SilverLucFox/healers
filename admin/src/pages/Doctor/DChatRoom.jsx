import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";

const DChatRoom = () => {
  const { dtoken, backendurl } = useContext(DoctorContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [len, setLen] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (messages.length > len) {
      setLen(messages.length);
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        if (data.conversations.length > 0) {
          setActiveConversationId(id);
          getMessages(id);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async (conversationId) => {
    if (!conversationId) return;

    try {
      const response = await axios.get(
        `${backendurl}/api/messages/getD/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${dtoken}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      toast.error("Error fetching messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !activeConversationId) return;

    try {
      const token = localStorage.getItem("dtoken");

      await axios.post(
        `${backendurl}/api/messages/sendd/${activeConversationId}`,
        {
          message: input,
          senderRole: "doctor",
          receiverRole: "assistant",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInput("");
      getMessages(activeConversationId);
    } catch (error) {
      toast.error("Error sending message", error);
    }
  };

  useEffect(() => {
    getC();
  }, []);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-100">
      {/* Dropdown for Conversations */}
      <div className="p-4 bg-green-600 border-b">
        <select
          value={activeConversationId || ""}
          onChange={(e) => {
            const conversationId = e.target.value;
            setActiveConversationId(conversationId);
            getMessages(conversationId);
          }}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>
            Select a conversation
          </option>
          {conversations.map((conv) => (
            <option key={conv._id} value={conv.participants[0]._id}>
              {conv.participants[0].name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages Display */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg w-max mt-2 ${
              msg.senderRole === "user"
                ? "bg-green-500 text-white mr-auto"
                : msg.senderRole === "doctor"
                ? "bg-blue-500 text-white ml-auto"
                : msg.senderRole === "assistant"
                ? "bg-yellow-500 text-black ml-auto"
                : "bg-gray-300 text-black ml-auto"
            } shadow-md`}
          >
            <p className="font-thin text-xs mb-1">{msg.senderRole}</p>
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-100 border-t flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          disabled={!input.trim() || !activeConversationId}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DChatRoom;

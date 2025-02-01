/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { AssistantContext } from "../../context/assistantContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js"; // Assuming assets are being imported

function AssDash() {
  const { backendurl, assistantToken, getApp, app } =
    useContext(AssistantContext);
  const [messages, setmessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { calAge, cur, SDF } = useContext(AppContext);
  const getC = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/assistant/sendconv`,
        {},
        {
          headers: {
            Authorization: `Bearer ${assistantToken}`,
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
            Authorization: `Bearer ${assistantToken}`,
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
  const delcon = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/assistant/delcon`,
        { body: id },
        {
          headers: {
            Authorization: `Bearer ${assistantToken}`,
          },
        }
      );
      if (data.success) {
        getC();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (app && app.length > 0) {
      setAppointments(app.slice(0, 3));
    }
  }, [app]);

  const canTheA = (id) => {
    // handle cancellation
    console.log(`Cancel appointment with id: ${id}`);
  };

  const completeApp = (id) => {
    // handle completion
    console.log(`Complete appointment with id: ${id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getM();
      getC();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getC();
    getM();
  }, [assistantToken]);

  const sortedConversations = conversations
    .map((conversation) => {
      const latestMessage = messages
        .filter((message) => message.conversationId === conversation._id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      return { ...conversation, latestMessage };
    })
    .sort(
      (a, b) =>
        new Date(b.latestMessage?.createdAt) -
        new Date(a.latestMessage?.createdAt)
    );

  return (
    <div className="px-6 space-y-4  overflow-auto ">
      <h1 className="text-xl font-semibold m-3">Chats:</h1>
      {sortedConversations.slice(0, 2).map((conversation) => (
  <div
    key={conversation._id}
    className="border flex items-center justify-between border-green-300 rounded-lg p-3 bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
  >
    {/* Participant Name and Last Message */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
      <h2 className="text-xl font-semibold text-green-800">{conversation.participants[0].name}</h2>
      <p className="text-green-700 text-sm">
        <span className="font-semibold text-green-800">Last Message: </span>
        {conversation.latestMessage ? (
          <span className="text-green-700">{conversation.latestMessage.message}</span>
        ) : (
          <span className="text-green-700 italic">No messages</span>
        )}
      </p>
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-3">
      <Link to={`/assistant-chatroom/id/${conversation.participants[0]._id}`}>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-all duration-300 ease-in-out">
          View
        </button>
      </Link>
      <button
        onClick={() => delcon(conversation._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-all duration-300 ease-in-out"
      >
        Delete
      </button>
    </div>
  </div>
))}
      <div className="overflow-hidden ">
        <h1 className="text-xl font-semibold m-3">Appointments:</h1>
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          <div className="overflow-y-auto  flex flex-col-reverse">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-emerald-500 text-white">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Patient Info</th>
                  <th className="px-4 py-2">Payment</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Date & Time</th>
                  <th className="px-4 py-2">Fees</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item, i) => (
                  <tr
                    className={`${
                      item.cancelled
                        ? "bg-red-200"
                        : "hover:bg-emerald-50 bg-emerald-100 text-emerald-900"
                    } border-b`}
                    key={i}
                  >
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <img
                        className="w-8 rounded-full"
                        src={item.useData.image}
                        alt="Patient Avatar"
                      />
                      <span>{item.useData.name}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <p className="text-xs inline border border-primary px-2 rounded-full">
                        {item.payment ? "Paid" : "Unpaid"}
                      </p>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {calAge(item.useData.dob)}
                    </td>
                    <td className="px-4 py-2">
                      {SDF(item.slotDate)}, {item.slotTime}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {cur}
                      {item.amount}
                    </td>
                    <td className="px-4 py-2 flex justify-center">
                      {item.cancelled ? (
                        <p className="text-xs font-medium text-red-800">
                          Cancelled
                        </p>
                      ) : item.isCompleted ? (
                        <p className="text-xs font-medium text-green-500">
                          Completed
                        </p>
                      ) : (
                        <div className="flex gap-2">
                          <img
                            onClick={() => canTheA(item._id)}
                            className="w-10 cursor-pointer"
                            src={assets.cancel_icon}
                            alt="Cancel"
                          />
                          <img
                            onClick={() => completeApp(item._id)}
                            className="w-10 cursor-pointer"
                            src={assets.tick_icon}
                            alt="Complete"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssDash;

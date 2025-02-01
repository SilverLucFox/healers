import { useContext, useEffect, useState } from 'react';
import { AssistantContext } from '../../context/assistantContext';
import { DoctorContext } from '../../context/DoctorContext';

function PP() {
  const { getMR, mR } = useContext(AssistantContext);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dtoken } = useContext(DoctorContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setLoading(true);
      await getMR();
      setLoading(false);
    };

    if (dtoken) {
      fetchMedicalRecords();
    }
  }, [dtoken]);

  useEffect(() => {
    const filtered = mR.filter(record =>
      record.patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [mR, searchQuery]);

  const handleRowClick = (record) => {
    setSelectedRecord(record);
  };

  const closeCard = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="max-w-7xl mx-auto overflow-hidden h-[500px] p-6 bg-white rounded-lg shadow-xl relative">
      <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
        All Medical Records
      </h2>

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold text-green-500">Loading...</div>
      ) : (
        <div className="overflow-y-auto scrollbar-hide max-h-96 border rounded-lg">
          <table className=" min-w-full bg-white table-auto">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-6 border border-green-400">Patient</th>
                <th className="py-3 px-6 border border-green-400">Date of Visit</th>
                <th className="py-3 px-6 border border-green-400">Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record._id}
                  className="hover:bg-green-50 cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => handleRowClick(record)}
                >
                  <td className="py-3 px-6 border border-green-100">{record.patient.name}</td>
                  <td className="py-3 px-6 border border-green-100">
                    {`${new Date(record.dateOfVisit).toLocaleDateString()} ${new Date(record.dateOfVisit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </td>
                  <td className="py-3 px-6 border border-green-100">{record.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRecord && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
          onClick={closeCard}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-green-600 mb-4">Medical Record Details</h3>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition duration-300"
              onClick={closeCard}
            >
              &#10005;
            </button>
            <div className="space-y-4">
              <p><strong>Patient:</strong> {selectedRecord.patient.name}</p>
              <p><strong>Date of Visit:</strong>{`${new Date(selectedRecord.dateOfVisit).toLocaleDateString()} ${new Date(selectedRecord.dateOfVisit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
              <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
              <p><strong>Treatment:</strong> {selectedRecord.treatment}</p>
              <p><strong>Medications:</strong> {selectedRecord.medications}</p>
              <p><strong>Notes:</strong> {selectedRecord.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PP;

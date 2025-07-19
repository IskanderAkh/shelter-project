import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SideBar from '../../components/SideBar/SideBar';

const AllMedicalRecords = () => {
    const [modalTreatment, setModalTreatment] = React.useState(null);

    // ✅ Fetch all medical records
    const { data: records, isLoading } = useQuery({
        queryKey: ["recentMedicalRecords"],
        queryFn: async () => {
            const res = await axios.get('/api/shelter/med/recent');
            return res.data;
        }
    });

    return (
        <div className="flex">
            <SideBar />

            <main className="flex-1 p-6 space-y-6">
                <h1 className="text-3xl font-bold mb-4">All Medical Records</h1>

                {isLoading ? (
                    <p>Loading records...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Animal</th>
                                    <th>Date</th>
                                    <th>Diagnosis</th>
                                    <th>Treatment</th>
                                    <th>Staff</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records?.map(record => (
                                    <tr key={record._id}>
                                        <td>{record.animalId?.name}</td>
                                        <td>{new Date(record.date).toLocaleDateString()}</td>
                                        <td>{record.diagnosis}</td>
                                        <td
                                            className="cursor-pointer max-w-xs overflow-hidden whitespace-nowrap text-ellipsis text-blue-600 hover:underline"
                                            title="Click to view full treatment"
                                            onClick={() => setModalTreatment(record.treatment)}
                                        >
                                            {record.treatment.split('. ').slice(0, 3).join('. ') + (record.treatment.split('. ').length > 3 ? '...' : '')}
                                        </td>
                                        <td>{record.staffId?.fname} {record.staffId?.lname}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ✅ Modal for full treatment */}
                {modalTreatment && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
                            <h3 className="text-lg font-bold mb-2">Full Treatment Notes</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">{modalTreatment}</p>
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                                onClick={() => setModalTreatment(null)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllMedicalRecords;

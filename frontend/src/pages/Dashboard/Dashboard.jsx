import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

const Dashboard = ({ authUser }) => {
  const queryClient = useQueryClient();

  // ✅ Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axios.get("/api/shelter/dashboard/overview");
      return res.data;
    },
  });

  // ✅ Fetch recent adoptions
  const { data: adoptions } = useQuery({
    queryKey: ["recentAdoptions"],
    queryFn: async () => {
      const res = await axios.get('/api/shelter/recent');
      return res.data;
    }
  });

  // ✅ Fetch recent medical records
  const { data: records } = useQuery({
    queryKey: ["recentMedicalRecords"],
    queryFn: async () => {
      const res = await axios.get('/api/shelter/med/recent');
      return res.data;
    }
  });

  // ✅ Adoption status mutation
  const mutation = useMutation({
    mutationFn: async ({ adoptionId, status }) => {
      const res = await axios.put(`/api/animal/adoption/${adoptionId}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Adoption status updated successfully");
      queryClient.invalidateQueries(["recentAdoptions"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  });
  const [modalTreatment, setModalTreatment] = React.useState(null);

  return (
    <div className="flex">
      {/* ✅ Side Navigation */}
      <SideBar />

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold">Welcome, {authUser?.fname} 👋</h1>

        {/* ✅ Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat bg-base-200 shadow rounded">
            <div className="stat-title">Total Animals</div>
            <div className="stat-value">{stats?.totalAnimals ?? "-"}</div>
          </div>
          <div className="stat bg-base-200 shadow rounded">
            <div className="stat-title">Available</div>
            <div className="stat-value text-green-500">{stats?.availableAnimals ?? "-"}</div>
          </div>
          <div className="stat bg-base-200 shadow rounded">
            <div className="stat-title">Adopted</div>
            <div className="stat-value text-blue-500">{stats?.adoptedAnimals ?? "-"}</div>
          </div>
          <div className="stat bg-base-200 shadow rounded">
            <div className="stat-title">Pending Requests</div>
            <div className="stat-value text-yellow-500">{stats?.pendingAdoptions ?? "-"}</div>
          </div>
        </div>

        {/* ✅ Recent Adoptions */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Recent Adoptions</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Animal</th>
                <th>Adopter</th>
                <th>Status</th>
                <th>Date</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {adoptions?.map(a => (
                <tr key={a._id}>
                  <td>{a.animalId?.name}</td>
                  <td>{a.adopterId?.fname} {a.adopterId?.lname}</td>
                  <td><span className="badge badge-outline">{a.status}</span></td>
                  <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={a.status}
                      onChange={(e) => mutation.mutate({ adoptionId: a._id, status: e.target.value })}
                      className="select select-bordered select-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Recent Medical Records */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Recent Medical Records</h2>
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
                console.log(record),
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
          {/* ✅ Modal for full treatment text */}
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

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

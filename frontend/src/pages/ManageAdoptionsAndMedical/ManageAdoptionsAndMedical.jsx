import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Modal from '@/components/Shared/Modal'; // make sure you have a modal component

const ManageAdoptionsAndMedical = () => {
  const [tab, setTab] = useState('adoptions');
  const [editAdoption, setEditAdoption] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const queryClient = useQueryClient();

  const { data: adoptions } = useQuery({
    queryKey: ['allAdoptions'],
    queryFn: async () => {
      const res = await axios.get('/api/animal/getAlladoptions');
      return res.data;
    }
  });

  const { data: records } = useQuery({
    queryKey: ['allMedicalRecords'],
    queryFn: async () => {
      const res = await axios.get('/api/med/all');
      return res.data;
    }
  });

  const deleteAdoptionMutation = useMutation({
    mutationFn: async (id) => await axios.delete(`/api/animal/adoption/${id}`),
    onSuccess: () => {
      toast.success("Adoption deleted");
      queryClient.invalidateQueries(['allAdoptions']);
    },
    onError: () => toast.error("Failed to delete adoption")
  });

  const deleteRecordMutation = useMutation({
    mutationFn: async (id) => await axios.delete(`/api/med/${id}`),
    onSuccess: () => {
      toast.success("Medical record deleted");
      queryClient.invalidateQueries(['allMedicalRecords']);
    },
    onError: () => toast.error("Failed to delete medical record")
  });

  const updateAdoptionMutation = useMutation({
    mutationFn: async ({ id, status }) => await axios.put(`/api/animal/adoption/${id}/status`, { status }),
    onSuccess: () => {
      toast.success("Adoption updated");
      queryClient.invalidateQueries(['allAdoptions']);
      setEditAdoption(null);
    },
    onError: () => toast.error("Failed to update adoption")
  });

  const updateRecordMutation = useMutation({
    mutationFn: async ({ id, diagnosis, treatment }) =>
      await axios.put(`/api/med/${id}`, { diagnosis, treatment }),
    onSuccess: () => {
      toast.success("Medical record updated");
      queryClient.invalidateQueries(['allMedicalRecords']);
      setEditRecord(null);
    },
    onError: () => toast.error("Failed to update record")
  });

  return (
    <div className="flex">
      <aside className="w-64 p-6 border-r min-h-screen space-y-4 bg-base-100">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link className="link" to="/dashboard">Dashboard Main</Link>
          <Link className="link " to="/add-animal">Add Animal</Link>
          <Link className="link" to="/delete-animal">Delete Animal</Link>
          <Link className="link" to="/update-animal">Update Animal</Link>
          <Link className="link" to="/add-medical-record">Add Medical Record</Link>
          <Link className="link font-bold" to="#">Manage Adoptions And Medical</Link>
        </nav>
      </aside>

      <div className="p-6 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Records</h1>

        {/* Tabs */}
        <div className="tabs mb-6 tabs-boxed">
          <a
            className={`tab tab-bordered ${tab === 'adoptions' ? 'tab-active' : ''}`}
            onClick={() => setTab('adoptions')}
          >
            Adoptions
          </a>
          <a
            className={`tab tab-bordered ${tab === 'medical' ? 'tab-active' : ''}`}
            onClick={() => setTab('medical')}
          >
            Medical Records
          </a>
        </div>


        {/* Adoptions Table */}
        {tab === 'adoptions' && (
          <table className="table table-zebra w-full">
            <thead>
              <tr><th>Animal</th><th>Adopter</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {adoptions?.map(a => (
                <tr key={a._id}>
                  <td>{a.animalId?.name}</td>
                  <td>{a.adopterId?.fname} {a.adopterId?.lname}</td>
                  <td>{a.status}</td>
                  <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline" onClick={() => setEditAdoption(a)}>Edit</button>
                    <button className="btn btn-sm btn-outline" onClick={() => deleteAdoptionMutation.mutate(a._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Medical Records Table */}
        {tab === 'medical' && (
          <table className="table table-zebra w-full">
            <thead>
              <tr><th>Animal</th><th>Date</th><th>Diagnosis</th><th>Treatment</th><th>Staff</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {records?.map(r => (
                <tr key={r._id}>
                  <td>{r.animalId?.name}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.diagnosis}</td>
                  <td className="max-w-xs truncate" title={r.treatment}>{r.treatment}</td>
                  <td>{r.staffId?.fname} {r.staffId?.lname}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline" onClick={() => setEditRecord(r)}>Edit</button>
                    <button className="btn btn-sm btn-outline" onClick={() => deleteRecordMutation.mutate(r._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📝 Adoption Edit Modal */}
      {editAdoption && (
        <Modal title="Edit Adoption Status" onClose={() => setEditAdoption(null)}>
          <select
            className="select select-bordered w-full mb-4"
            value={editAdoption.status}
            onChange={(e) => setEditAdoption(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button className="btn btn-primary w-full"
            onClick={() => updateAdoptionMutation.mutate({ id: editAdoption._id, status: editAdoption.status })}
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* 📝 Medical Record Edit Modal */}
      {editRecord && (
        <Modal title="Edit Medical Record" onClose={() => setEditRecord(null)}>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            placeholder="Diagnosis"
            value={editRecord.diagnosis}
            onChange={(e) => setEditRecord(prev => ({ ...prev, diagnosis: e.target.value }))}
          />
          <textarea
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Treatment"
            rows={4}
            value={editRecord.treatment}
            onChange={(e) => setEditRecord(prev => ({ ...prev, treatment: e.target.value }))}
          />
          <button className="btn btn-primary w-full"
            onClick={() => updateRecordMutation.mutate({
              id: editRecord._id,
              diagnosis: editRecord.diagnosis,
              treatment: editRecord.treatment
            })}
          >
            Save Changes
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ManageAdoptionsAndMedical;

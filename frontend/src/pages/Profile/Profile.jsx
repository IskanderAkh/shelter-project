import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../Hooks/useLogout';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get('/api/auth/me');
      return res.data;
    },
    retry: 2,
    onError: () => {
      navigate('/login');
    },
  });

  const adoptionId = user?.adoptions?.[0];

  const { data: adoptionData, isLoading: isAdoptionLoading } = useQuery({
    queryKey: ['adoption', adoptionId],
    queryFn: async () => {
      const res = await axios.get(`/api/animal/adoption/${adoptionId}`);
      return res.data;
    },
    enabled: !!adoptionId,
  });

  if (isLoading) return <div className='p-10 text-center'>Loading...</div>;
  if (!user) return navigate('/login');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Hello, {user.fname} {user.lname}</h1>
          <p className="text-gray-500">Here's your profile information</p>
        </div>
        <button
          className="btn btn-sm btn-outline mt-4 sm:mt-0"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Logout
        </button>
      </div>

      {/* Profile Info Card */}
      <div className="card bg-base-100 shadow-md mb-8">
        <div className="card-body">
          <h2 className="card-title text-lg">Profile Info</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            {user.address && <p><strong>Address:</strong> {user.address}</p>}
          </div>
        </div>
      </div>

      {/* Adoption Section */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-lg">Adoption Status</h2>
          {isAdoptionLoading ? (
            <p className="text-gray-500 mt-2">Loading adoption info...</p>
          ) : adoptionData ? (
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <p><strong>Animal:</strong> {adoptionData.animalId?.name || "Unknown"}</p>
              <p><strong>Species:</strong> {adoptionData.animalId?.species}</p>
              <p><strong>Status:</strong> <span className="badge badge-info">{adoptionData.status}</span></p>
              <p><strong>Requested:</strong> {new Date(adoptionData.createdAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">You don't have a current adoption.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

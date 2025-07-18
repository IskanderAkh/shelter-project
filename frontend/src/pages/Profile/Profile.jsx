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

  const { data: adoptionsData, isLoading: isAdoptionsLoading } = useQuery({
    queryKey: ['adoptions', user?.adoptions],
    queryFn: async () => {
      const requests = user.adoptions.map((id) =>
        axios.get(`/api/animal/adoption/${id}`)
      );
      const responses = await Promise.all(requests);
      return responses.map((res) => res.data);
    },
    enabled: !!user?.adoptions?.length,
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
      {/* Adoption Section */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-lg">Adoption Queries</h2>
          {isAdoptionsLoading ? (
            <p className="text-gray-500 mt-2">Loading adoption info...</p>
          ) : adoptionsData?.length ? (
            <div className="mt-4 space-y-4">
              {adoptionsData.map((adoption) => (
                <div
                  key={adoption._id}
                  className="border p-4 rounded-lg bg-gray-50"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <p><strong>Animal:</strong> {adoption.animalId?.name || 'Unknown'}</p>
                    <p><strong>Species:</strong> {adoption.animalId?.species || 'N/A'}</p>
                    <p><strong>Status:</strong>
                      <span
                        className={`badge ${adoption.status === 'Approved'
                            ? 'badge-success'
                            : adoption.status === 'Rejected'
                              ? 'badge-error'
                              : 'badge-info'
                          }`}
                      >
                        {adoption.status}
                      </span>
                    </p>
                    <p><strong>Requested:</strong> {new Date(adoption.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">You don't have any adoptions.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;

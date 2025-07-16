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
        enabled: !!adoptionId // run only if ID is present
    });

    if (isLoading) return <div className='p-10'>Loading...</div>;
    if (!user) return navigate('/login');

    return (
        <div className='p-10 max-w-3xl mx-auto'>
            <div className='flex justify-between items-center mb-10'>
                <h1 className='text-2xl font-bold'>Welcome, {user.fname} {user.lname}</h1>
                <button
                    className='btn btn-sm btn-outline'
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    Logout
                </button>
            </div>

            <div className='mb-6'>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
                {user.address && <p><strong>Address:</strong> {user.address}</p>}
            </div>

            <h2 className='text-xl font-semibold mt-8 mb-4'>Your Current Adoption</h2>

            {isAdoptionLoading ? (
                <p>Loading adoption info...</p>
            ) : adoptionData ? (
                <div className='border p-4 rounded'>
                    <p><strong>Animal:</strong> {adoptionData.animalId?.name || "Unknown"}</p>
                    <p><strong>Species:</strong> {adoptionData.animalId?.species}</p>
                    <p><strong>Status:</strong> <span className='badge badge-info'>{adoptionData.status}</span></p>
                    <p><strong>Requested:</strong> {new Date(adoptionData.createdAt).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>You don't have a current adoption.</p>
            )}

        </div>
    );
};

export default Profile;

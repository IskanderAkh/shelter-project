import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Adoptions = () => {
    const queryClient = useQueryClient();

    // Fetch all adoptions
    const { data: adoptions, isLoading } = useQuery({
        queryKey: ['adoptions'],
        queryFn: async () => {
            const res = await axios.get('/api/animal/getAlladoptions');
            return res.data;
        },
    });

    // Mutation for updating status
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

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Link to="/adoptions" className="text-2xl font-semibold mb-4 block">
                Recent Adoptions
            </Link>

            <div className="overflow-x-auto">
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
                        {adoptions?.map((a) => (
                            <tr key={a._id}>
                                <td>{a.animalId?.name}</td>
                                <td>{a.adopterId?.fname} {a.adopterId?.lname}</td>
                                <td>
                                    <span
                                        className={`badge ${a.status === 'Approved'
                                            ? 'badge-success'
                                            : a.status === 'Rejected'
                                                ? 'badge-error'
                                                : 'badge-info'
                                            }`}
                                    >
                                        {a.status}
                                    </span>
                                </td>
                                <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <select
                                        value={a.status}
                                        onChange={(e) =>
                                            mutation.mutate({ adoptionId: a._id, status: e.target.value })
                                        }
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
        </div>
    );
};

export default Adoptions;

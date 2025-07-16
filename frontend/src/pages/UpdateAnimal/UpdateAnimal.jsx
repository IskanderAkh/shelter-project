import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UpdateAnimal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    // ✅ Fetch all animals
    const { data: animals = [], isLoading } = useQuery({
        queryKey: ['animals'],
        queryFn: async () => {
            const res = await axios.get('/api/animal/all');
            return res.data;
        },
    });

    // ✅ Mutation to update
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await axios.put(`/api/animal/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Animal updated successfully');
            queryClient.invalidateQueries(['animals']);
        },
        onError: () => {
            toast.error('Update failed');
        }
    });

    // ✅ Filter by name or id
    const filtered = animals.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal._id.includes(searchTerm)
    );

    return (
        <div className="flex">
            <aside className="w-64 p-6 border-r min-h-screen space-y-4 bg-base-100">
                <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
                <nav className="flex flex-col gap-3">
                          <Link className="link" to="/dashboard">Dashboard Main</Link>
                          <Link className="link " to="/add-animal">Add Animal</Link>
                          <Link className="link" to="/delete-animal">Delete Animal</Link>
                          <Link className="link font-bold" to="/update-animal">Update Animal</Link>
                          <Link className="link" to="/add-medical-record">Add Medical Record</Link>
                          <Link className="link" to="/manage-adoptions-and-medical">Manage Adoptions And Medical</Link>
                        </nav>
            </aside>
            <div className='p-6'>
                <h1 className='text-2xl font-bold mb-4'>Update Animals</h1>

                <input
                    className='input input-bordered mb-6 w-full max-w-xl'
                    placeholder='Search by Name or ID...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {isLoading ? <p>Loading...</p> : (
                    <div className='overflow-x-auto'>
                        <table className='table table-zebra'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Species</th>
                                    <th>Breed</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Health</th>
                                    <th>Status</th>
                                    <th>Save</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(animal => (
                                    <AnimalRow key={animal._id} animal={animal} onUpdate={updateMutation.mutate} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// ✅ Editable Row Component
const AnimalRow = ({ animal, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: animal.name,
        species: animal.species,
        breed: animal.breed,
        gender: animal.gender,
        age: animal.age,
        healthStatus: animal.healthStatus,
        adoptionStatus: animal.adoptionStatus,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate({ id: animal._id, updatedData: formData });
    };

    return (
        <tr>
            <td><input name='name' className='input input-sm w-full' value={formData.name} onChange={handleChange} /></td>
            <td><input name='species' className='input input-sm w-full' value={formData.species} onChange={handleChange} /></td>
            <td><input name='breed' className='input input-sm w-full' value={formData.breed} onChange={handleChange} /></td>
            <td>
                <select name='gender' className='select select-sm w-full' value={formData.gender} onChange={handleChange}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
            </td>
            <td><input name='age' type='number' className='input input-sm w-20' value={formData.age} onChange={handleChange} /></td>
            <td><input name='healthStatus' className='input input-sm w-full' value={formData.healthStatus} onChange={handleChange} /></td>
            <td>
                <select name='adoptionStatus' className='select select-sm' value={formData.adoptionStatus} onChange={handleChange}>
                    <option value='Available'>Available</option>
                    <option value='Pending'>Pending</option>
                    <option value='Adopted'>Adopted</option>
                </select>
            </td>
            <td>
                <button className='btn btn-sm btn-outline' onClick={handleSave}>Save</button>
            </td>
        </tr>
    );
};

export default UpdateAnimal;

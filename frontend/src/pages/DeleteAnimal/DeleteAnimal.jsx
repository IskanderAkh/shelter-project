import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const DeleteAnimal = () => {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  // ✅ Get all animals
  const { data: animals = [], isLoading } = useQuery({
    queryKey: ['animals'],
    queryFn: async () => {
      const res = await axios.get('/api/animal/all');
      return res.data;
    }
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/animal/${id}`);
    },
    onSuccess: () => {
      toast.success('Animal deleted');
      queryClient.invalidateQueries(['animals']);
    },
    onError: () => {
      toast.error('Failed to delete');
    }
  });

  // ✅ Filter animals
  const filtered = animals.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a._id.includes(search)
  );

  return (
    <div className="flex">
      <aside className="w-64 p-6 border-r min-h-screen space-y-4 bg-base-100">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
                  <Link className="link" to="/dashboard">Dashboard Main</Link>
                  <Link className="link " to="/add-animal">Add Animal</Link>
                  <Link className="link font-bold" to="/delete-animal">Delete Animal</Link>
                  <Link className="link" to="/update-animal">Update Animal</Link>
                  <Link className="link" to="/add-medical-record">Add Medical Record</Link>
                  <Link className="link" to="/manage-adoptions-and-medical">Manage Adoptions And Medical</Link>
                </nav>
      </aside>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Delete Animal</h1>

        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xl mb-6"
        />

        {isLoading ? (
          <p>Loading animals...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Species</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((animal) => (
                  <tr key={animal._id}>
                    <td>{animal.name}</td>
                    <td>{animal.species}</td>
                    <td>{animal.breed}</td>
                    <td>{animal.age}</td>
                    <td>
                      <span className="badge badge-outline">{animal.adoptionStatus}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          if (confirm(`Delete ${animal.name}? This action is irreversible.`)) {
                            deleteMutation.mutate(animal._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="6" className="text-center text-gray-500">No animals found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAnimal;

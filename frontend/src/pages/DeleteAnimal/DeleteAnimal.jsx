import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

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
      <SideBar />

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

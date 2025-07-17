import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

const AddAnimal = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: 'Male',
    age: '',
    healthStatus: '',
    adoptionStatus: 'Available',
    imgs: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/animal/addAnimal', formData);
      toast.success('Animal added successfully!');
      setFormData({
        name: '',
        species: '',
        breed: '',
        gender: 'Male',
        age: '',
        healthStatus: '',
        adoptionStatus: 'Available',
        imgs: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to add animal');
    }
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Animal</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Animal Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="species"
            value={formData.species}
            onChange={handleChange}
            placeholder="Species"
            className="input input-bordered w-full"
            required
          />
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Breed"
            className="input input-bordered w-full"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="input input-bordered w-full"
            required
          />
          <input
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            placeholder="Health Status"
            className="input input-bordered w-full"
            required
          />
          <select
            name="adoptionStatus"
            value={formData.adoptionStatus}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            name="imgs"
            value={formData.imgs}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-neutral w-full">Add Animal</button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimal;

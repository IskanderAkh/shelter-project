import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';

const AddMedicalRecord = () => {
    const [animals, setAnimals] = useState([]);
    const [formData, setFormData] = useState({
        animalId: '',
        date: '',
        diagnosis: '',
        treatment: ''
    });

    useEffect(() => {
        // Fetch animals for selection
        axios.get("/api/animal/all").then(res => {
            setAnimals(res.data);
        }).catch(err => {
            console.error(err);
            toast.error("Failed to load animals.");
        });
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/med/create", formData);
            toast.success("Medical record added!");
            setFormData({
                animalId: '',
                date: '',
                diagnosis: '',
                treatment: ''
            });
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Failed to add record.");
        }
    };

    return (
        <div className="flex">
            <SideBar />

            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Add Medical Record</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="animalId"
                        value={formData.animalId}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Animal</option>
                        {animals?.map(animal => (
                            <option key={animal._id} value={animal._id}>
                                {animal.name} ({animal._id.slice(0, 6)})
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <textarea
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Diagnosis"
                        required
                    />

                    <textarea
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Treatment"
                        required
                    />

                    <button type="submit" className="btn btn-neutral w-full">Submit Record</button>
                </form>
            </div>
        </div>
    );
};

export default AddMedicalRecord;

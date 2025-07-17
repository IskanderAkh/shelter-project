import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import SideBar from '../../components/SideBar/SideBar'

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    role: 'admin',
    email: '',
    phoneNumber: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/shelter/register', formData)
      console.log(res);

      toast.success('Admin created successfully!')

      setFormData({
        fname: '',
        lname: '',
        role: 'admin',
        email: '',
        phoneNumber: '',
        password: ''
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      <SideBar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2">Create New Admin</h2>
          <p className="text-center text-gray-500 mb-6">Fill in the information below to register a new admin.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control bg-transparent">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="fname"
                  className="input input-bordered text-black"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control bg-transparent">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lname"
                  className="input input-bordered text-black"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-control bg-transparent">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered text-black"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control bg-transparent">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <input
                type="text"
                name="role"
                className="input input-bordered text-black capitalize"
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: e.target.value.toLowerCase(),
                  }))
                }
                required
              />
            </div>

            <div className="form-control bg-transparent">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="input input-bordered text-black"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control bg-transparent">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered text-black"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control bg-transparent mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Create Admin'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAdmin

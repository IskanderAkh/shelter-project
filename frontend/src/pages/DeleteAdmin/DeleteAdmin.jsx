import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import SideBar from '../../components/SideBar/SideBar'

const DeleteAdmin = () => {
    const [admins, setAdmins] = useState([])
    const [adminId, setAdminId] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [targetId, setTargetId] = useState('')

    const fetchAdmins = async () => {
        try {
            setFetching(true)
            const res = await axios.get('/api/shelter/all')
            setAdmins(res.data)
        } catch (err) {
            toast.error('Failed to fetch admins')
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [])
    const handleDelete = () => {
        if (!adminId.trim()) return toast.error('Please enter an admin ID')
        setTargetId(adminId)
        setConfirmOpen(true)
    }

    const confirmDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`/api/shelter/delete/${targetId}`)
            toast.success('Admin deleted successfully')
            setAdminId('')
            fetchAdmins()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Deletion failed')
        } finally {
            setLoading(false)
            setConfirmOpen(false)
        }
    }


    return (
        <div className="flex min-h-screen bg-base-200">
            <SideBar />
            <div className="flex-1 p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold text-center">Delete Admin</h2>

                    {/* Delete by ID input */}
                    <div className="card bg-base-100 shadow-md p-4">
                        <label className="label">
                            <span className="label-text">Enter Admin ID to Delete</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Admin ID"
                            />
                            <button
                                onClick={handleDelete}
                                className="btn btn-error"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Admin list */}
                    <div className="card bg-base-100 shadow-md p-4">
                        <h3 className="text-xl font-semibold mb-4">All Admins</h3>
                        {fetching ? (
                            <p className="text-center text-sm">Loading admins...</p>
                        ) : admins.length === 0 ? (
                            <p className="text-center text-sm text-gray-500">No admins found</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins.map((admin, index) => (
                                            <tr key={admin._id}>
                                                <td>{index + 1}</td>
                                                <td>{admin.fname} {admin.lname}</td>
                                                <td>{admin.email}</td>
                                                <td className='capitalize'>{admin.role}</td>
                                                <td className="text-xs">{admin._id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                {/* Confirmation Modal */}
                <dialog id="confirm_modal" className={`modal ${confirmOpen ? "modal-open" : ""}`}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                        <p className="py-4">Are you sure you want to delete the admin with ID:</p>
                        <p className="text-error font-mono text-sm mb-4">{targetId}</p>
                        <div className="modal-action">
                            <button
                                onClick={confirmDelete}
                                className="btn btn-error"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Yes, Delete"
                                )}
                            </button>
                            <button onClick={() => setConfirmOpen(false)} className="btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>

        </div>
    )
}

export default DeleteAdmin

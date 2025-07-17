import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideBar = () => {
    const location = useLocation()

    const links = [
        { to: '/dashboard', label: 'Dashboard Main' },
        { to: '/add-animal', label: 'Add Animal' },
        { to: '/delete-animal', label: 'Delete Animal' },
        { to: '/update-animal', label: 'Update Animal' },
        { to: '/add-medical-record', label: 'Add Medical Record' },
        { to: '/manage-adoptions-and-medical', label: 'Manage Adoptions And Medical' },
        { to: '/create-admin', label: 'Create Admin' },
        { to: '/delete-admin', label: 'Delete Admin' },
    ]

    return (
        <aside className="w-64 p-6 border-r min-h-screen space-y-4 bg-base-100">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <nav className="flex flex-col gap-3">
                {links.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`link ${location.pathname === to ? 'font-bold' : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default SideBar

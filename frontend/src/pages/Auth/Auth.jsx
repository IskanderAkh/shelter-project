import React, { useState } from 'react';
import './auth.scss';
import { Link, useLocation } from 'react-router-dom';
import Login from './Login/Login';
import { useQuery } from '@tanstack/react-query';
import Register from './Register/Register';

const Auth = () => {
    const [login, setLogin] = useState(true);
    const location = useLocation();

    const { data: authUser, isLoading, isError } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        retry: 2,
    },);

    if (isLoading) {
        return <div className='w-full h-96 flex justify-center items-center'><span className="loading loading-bars loading-lg"></span>
        </div>;
    }
    return (
        <>
            {isError && <div>
                <div className='w-full flex items-center justify-center'>
                    <h1 className='mx-auto card-title'>My account</h1>
                </div>
                <div className='max-w-lg mx-auto mt-14 p-1 flex h-16 auth-choice'>
                    <button
                        className={`flex-1 auth-choice-btn`}
                        onClick={() => setLogin(true)}
                    >
                        Sign in
                    </button>
                    <button
                        className={`flex-1 auth-choice-btn`}
                        onClick={() => setLogin(false)}
                    >
                        Register
                    </button>
                    <div className={`whitespace ${login ? 'left' : 'right'}`}>
                        <div className='whitespace-nowrap'></div>
                    </div>
                </div>
                {login ? (
                    <Login />
                ) : (
                    <Register />
                )}
            </div>}
            {
                authUser && <div>
                    <div className='text-center w-full h-96 flex flex-col justify-center items-center m-auto'>You have logged in, tap to go <Link className='link golden-text' to={'/'}>HOME</Link> </div>
                </div>
            }
        </>
    );
}

export default Auth;

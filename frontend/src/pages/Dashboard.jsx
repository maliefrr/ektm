import React from 'react'
import SideBar from '../components/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Mahasiswa from '../components/Mahasiswa';
import User from '../components/User'
import { logout } from '../features/auth/authSlice';
const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {

        if (!user) {
        logout()
        navigate('/')
        }
    }, [user, navigate, dispatch])


    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                <SideBar />
                <div className='flex-1 h-full'>
                    {user.data.role === "admin" ? (
                        <>
                        <User/>
                        <Mahasiswa/>
                        </>
                    ) : (
                        <>
                        <h1>Welcome {user.data.username}</h1>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard
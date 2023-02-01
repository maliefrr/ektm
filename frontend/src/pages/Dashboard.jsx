import React from 'react'
import SideBar from '../components/SideBar'
import logo from "../assets/logo-uho.png"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Mahasiswa from '../components/Mahasiswa';
import User from '../components/User'
import { logout } from '../features/auth/authSlice';
import QRGenerator from '../components/QRGenerator'
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
                        <div className='bg-gray-100 p-4'>
                        <div className='text-center md:ml-[16rem] w-[80%]'>
                            <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg m-4">
                            <div className="flex justify-between px-6 py-4 bg-gray-200">
                                <div className="font-medium text-lg">Universitas Halu Oleo</div>
                                <img
                                src={logo}
                                alt="Universitas Halu Oleo logo"
                                className="h-10"
                                />
                            </div>
                            <div className="flex h-48">
                                <div className="w-1/3 px-6 py-4">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUsj6MqlO3g3EqO-cCVE7hAPbFDgNwjMwgpg&usqp=CAU" alt="profile pic" className="w-48 h-24 object-cover" />
                                <QRGenerator size="72" className="mt-1"/>
                                </div>
                                <div className="w-2/3 px-6 py-4">
                                <div className="font-bold text-xl mb-2">{user.data.username}</div>
                                <p className="text-gray-700 text-base">info</p>
                                </div>
                            </div>
                            </div>        

                        </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard
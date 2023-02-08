import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import logo from "../assets/logo-uho.png"
import Mahasiswa from '../components/Mahasiswa';
import User from '../components/User'
import QRGenerator from '../components/QRGenerator'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { RotatingLines } from  'react-loader-spinner'
import axios from 'axios'
import { logout } from '../features/auth/authSlice';
const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useSelector((state) => state.auth)
    const {mahasiswaIsError,mahasiswaMessage} = useSelector((state) => state.mahasiswa)
    useEffect(() => {
        if (mahasiswaIsError) {
        toast.error(mahasiswaMessage)
        }

        if (!user) {
        logout()
        navigate('/')
        }
        const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/mahasiswa/profile/${user.data.username}`);
            setData(response.data.mahasiswa);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
        };
        if(user.data.role === "mahasiswa"){
            fetchData()
        }
    }, [user, navigate, mahasiswaIsError, mahasiswaMessage, dispatch])
    if (error) {
        toast.error(`An error occurred: ${error.message}`)
    }
    if (isLoading) {
        return <div className='loadingSpinnerContainer'>
            <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            />
        </div>
    }
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
                                <div>
                                    <h2 className="font-medium text-lg">
                                    Universitas Halu Oleo
                                    </h2>
                                    <p><a href="https://www.uho.ac.id/" target="_blank" rel="noreferrer noopener">www.uho.ac.id</a></p>
                                </div>
                                <img
                                src={logo}
                                alt="Universitas Halu Oleo logo"
                                className="h-10"
                                />
                            </div>
                            <div className="flex h-48">
                                <div className="w-1/3 px-6 py-4">
                                <img src={data.pas_foto} alt="profile pic" className="w-48 h-24 object-cover" />
                                <QRGenerator size="72" className="mt-1"/>
                                </div>
                                <div className="w-2/3 px-4 py-4">
                                <div className="font-bold text-xl mb-2">{data.name}</div>
                                <div className='flex flex-col'>
                                <p className='text-sm text-start'>NIM : {data.nim}</p>
                                <p className='text-sm text-start'>Program Studi : {data.prodi}</p>
                                <p className='text-sm text-start'>Alamat : {data.alamat}</p>
                                <p className='text-sm text-start'>Jenis Kelamin : {data.jenis_kelamin}</p>
                                <p className='text-sm text-start'>Golongan Darah : {data.gol_darah}</p>
                                </div>
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
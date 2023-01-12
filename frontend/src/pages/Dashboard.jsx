import React from 'react'
import {useState} from 'react'
import SideBar from '../components/SideBar'
import Button from '../components/Button'
import {toast} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import { useEffect } from 'react'
import { getMahasiswa,mahasiswaReset } from '../features/mahasiswa/mahasiswaSlice'
import { getUser, userReset } from '../features/user/userSlice'
const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {mahasiswa,mahasiswaIsError,mahasiswaIsLoading,mahasiswaMessage} = useSelector((state) => state.mahasiswa)
    const {users,userIsError,userIsLoading,userMessage} = useSelector((state) => state.user)
    const [userData, setUserData] = useState([
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 26 },
    { id: 3, name: "James", age: 27 },
    ]);

    console.log(users)
    const handleDeleteMahasiswa = (id) => {
        // setMahasiswaData(mahasiswaData.filter((data) => data.id !== id))
    }

    const handleDeleteUser = (id) => {
        setUserData(userData.filter((data) => data.id !== id))
    }
    

    useEffect(() => {
        if (mahasiswaIsError) {
        toast.error(mahasiswaMessage)
        }

        if(userIsError) {
            toast.error(userMessage)
        }

        if (!user) {
        navigate('/')
        }

        dispatch(getMahasiswa())
        dispatch(getUser())
        return () => {
        dispatch(mahasiswaReset())
        dispatch(userReset())
        }
    }, [user, navigate, mahasiswaIsError, mahasiswaMessage, dispatch,userIsError,userMessage])

    if(mahasiswaIsLoading || userIsLoading){
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
                    <div className="bg-gray-100 p-4 overflow-y-scroll overflow-x-hidden w-screen">
                        <div className='my-2'>
                            <h2 className="text-lg font-bold md:ml-[17rem] text-center">User</h2>
                            <table className="text-center md:ml-[16rem] table-collapse w-[80%]">
                                <thead>
                                    <tr>
                                        <Button text="Add User" className="mb-3"/>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 border-2 border-black">Username</th>
                                        <th className="px-4 py-2 border-2 border-black">Email</th>
                                        <th className="px-4 py-2 border-2 border-black">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className='px-4 py-2 border-2 border-black'>{user.username}</td>
                                            <td className='px-4 py-2 border-2 border-black'>{user.email}</td>
                                            <td className='px-4 py-2 border-2 border-black'>
                                                <button className="px-2">
                                                    Edit
                                                </button>
                                                <button className="px-2" onClick={() => handleDeleteUser(user.id)}>
                                                    Delete
                                                </button>
                                                <button className="px-2">
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 overflow-y-scroll overflow-x-hidden">
                        <div className='my-2'>
                            <h2 className="text-lg font-bold md:ml-[17rem] text-center">Mahasiswa</h2>
                            <table className="text-center md:ml-[16rem] table-collapse w-[80%]">
                                <thead>
                                    <tr>
                                        <Button text="Add Mahasiswa" className="mb-3"/>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 border-2 border-black">Nama</th>
                                        <th className="px-4 py-2 border-2 border-black">Prodi</th>
                                        <th className="px-4 py-2 border-2 border-black">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswa.map(mahasiswa => (
                                        <tr key={mahasiswa.id}>
                                            <td className='px-4 py-2 border-2 border-black'>{mahasiswa.name}</td>
                                            <td className='px-4 py-2 border-2 border-black'>{mahasiswa.prodi}</td>
                                            <td className='px-4 py-2 border-2 border-black'>
                                                <button className="px-2 ">
                                                    Edit
                                                </button>
                                                <button className="px-2" onClick={() => handleDeleteMahasiswa(mahasiswa.id)}>
                                                    Delete
                                                </button>
                                                <button className="px-2">
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
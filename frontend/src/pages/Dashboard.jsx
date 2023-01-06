import React from 'react'
import {useState} from 'react'
import SideBar from '../components/SideBar'
const Dashboard = () => {
    // const {user} = useSelector((state) => state.auth)
    const [mahasiswaData, setMahasiswaData] = useState([
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 21 },
    { id: 3, name: "Charlie", age: 22 },
    ]);
    const [userData, setUserData] = useState([
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 26 },
    { id: 3, name: "James", age: 27 },
    ]);

    const handleDeleteMahasiswa = (id) => {
        setMahasiswaData(mahasiswaData.filter((data) => data.id !== id))
    }

    const handleDeleteUser = (id) => {
        setUserData(userData.filter((data) => data.id !== id))
    }
    
    
    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                <SideBar />
                <div className='flex-1 h-full'>
                    <div className="bg-gray-100 p-4 overflow-y-scroll overflow-x-hidden w-screen">
                        <div className='my-2'>
                            <h2 className="text-lg font-bold md:ml-[17rem] mb-2 text-center">User</h2>
                            <table className="text-center md:ml-[16rem] table-collapse w-[80%]">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-2 border-black">Username</th>
                                        <th className="px-4 py-2 border-2 border-black">Email</th>
                                        <th className="px-4 py-2 border-2 border-black">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map(user => (
                                        <tr key={user.id}>
                                            <td className='px-4 py-2 border-2 border-black'>{user.name}</td>
                                            <td className='px-4 py-2 border-2 border-black'>{user.age}</td>
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
                            <h2 className="text-lg font-bold md:ml-[17rem] mb-2 text-center">Mahasiswa</h2>
                            <table className="text-center md:ml-[16rem] table-collapse w-[80%]">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-2 border-black">Nama</th>
                                        <th className="px-4 py-2 border-2 border-black">Prodi</th>
                                        <th className="px-4 py-2 border-2 border-black">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswaData.map(mahasiswa => (
                                        <tr key={mahasiswa.id}>
                                            <td className='px-4 py-2 border-2 border-black'>{mahasiswa.name}</td>
                                            <td className='px-4 py-2 border-2 border-black'>{mahasiswa.age}</td>
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

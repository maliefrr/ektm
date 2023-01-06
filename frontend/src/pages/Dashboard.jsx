import React from 'react'
import Button from '../components/Button'
import { useDispatch} from 'react-redux'
import {logout,reset} from "../features/auth/authSlice"
import {useNavigate,Link} from "react-router-dom"
import {useState} from 'react'
const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
    
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }
    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100">
                {/* sidebar */}
                <button className="block md:hidden p-2 text-gray-800 hover:text-gray-700" onClick={() => setMenuOpen(!menuOpen)} style={{position: "absolute",
                                    left: menuOpen ? "250px" : "16px",
                                    transition: "left 0.1s ease-out",
                                    }}>
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                            </svg>
                )}    
                </button>
                {console.log(menuOpen)}
                <div className={`sidebar w-64 bg-gray-800 text-white p-4 fixed left-0 h-screen ${menuOpen ? "block" : "hidden"} md:block`}
                    style={{
                    transform: `translateX(${menuOpen ? 0 : 0}%)`,
                    transition: "transform 0.5s ease-out",
                    }}>
                    <div className="py-4 px-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        <p className="text-gray-500">Welcome Back!!</p>
                    </div>
                    <ul className="list-none p-0">
                        <li className='py-2 px-6'>
                            <Link to={"/dashboard"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">My Profile</Link>
                        </li>
                        <li className='py-2 px-6'>
                            <Link to={"/dashboard"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">Home</Link>
                        </li>
                        <li className='py-2 px-6'>
                            <Link to={"/dashboard"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">Users</Link>
                        </li>
                        <li className='py-2 px-6'>
                            <Link to={"/dashboard"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">Mahasiswa</Link>
                        </li>
                        <li className='py-2 px-6'>
                            <Button text="Logout" onClick={onLogout}/>
                        </li>
                    </ul>
                </div>
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

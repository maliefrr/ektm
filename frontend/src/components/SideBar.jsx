import React from 'react'
import {useState} from 'react'
import { useDispatch} from 'react-redux'
import {logout,reset} from "../features/auth/authSlice"
import Button from './Button'
import {useNavigate,Link} from "react-router-dom"
const SideBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }
    return (
    <>
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
                            <Button text="Logout" onClick={onLogout} className="mx-auto"/>
                        </li>
                    </ul>
                </div>
    </>
    )
}

export default SideBar

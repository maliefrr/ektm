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

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }
    return (
        <>
            <div className="flex flex-col h-screen bg-gray-200">
                {/* sidebar */}
                <button class="block md:hidden p-2 text-gray-800 hover:text-gray-700">
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                )}    
                </button>
                <div className="w-64 bg-gray-800 h-screen fixed top-0 bottom-0 left-0 sidebar hidden md:block">
                    <div className="py-4 px-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        <p className="text-gray-500">Welcome Back!!</p>
                    </div>
                    <ul className="list-none p-0">
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
            </div>
        </>
    )
}

export default Dashboard

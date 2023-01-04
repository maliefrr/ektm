import React from 'react'
import Button from '../components/Button'
import { useDispatch} from 'react-redux'
import {logout,reset} from "../features/auth/authSlice"
import {useNavigate,Link} from "react-router-dom"

const Dashboard = () => {
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
                <div className="w-64 bg-gray-800 h-screen fixed top-0 bottom-0 left-0 sidebar">
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

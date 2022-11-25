import React from 'react'
import Button from '../components/Button'
import { useDispatch} from 'react-redux'
import {logout,reset} from "../features/auth/authSlice"
import {useNavigate} from "react-router-dom"

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
            <h1>Dashboard</h1>
            <Button text="Logout" onClick={onLogout}/>
        </>
    )
}

export default Dashboard

import React from 'react'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'

const Dashboard = () => {

    const dispatch = useDispatch()

    const onLogout = () => {

    }
    return (
        <>
            <h1>Dashboard</h1>
            <Button text="Logout" onClick={onLogout}/>
        </>
    )
}

export default Dashboard

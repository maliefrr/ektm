import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo-uho.png"
import Button from '../components/Button'
import InputForm from '../components/InputForm'


const Register = () => {
    return (
    <div className='font-arima bg-gradient-to-r from-sky-500 to-gray-400 lg:h-full md:h-screen h-screen'>
        <main className="max-w-screen-2xl flex items-center mx-auto">
            <div className="fixed sm:top-100 sm:bottom-100 lg:top-0 lg:bottom-0 left-0 right-0 flex">
                <img src={logo} alt="logo" width="250" className="m-auto" />
            </div>
            <div className='shadow-lg p-4 bg-slate-100/30 backdrop-blur-md w-full max-w-screen-lg rounded-md mx-auto md:w-4/5 md:my-6 lg:text-lg'>
                <Link to="/" className='flex hover:font-medium'>
                    <img src={logo} alt="logo" width="30" />
                    <h3 className="ml-3 font-sansita">E-KTM Web Admin</h3>
                </Link>
                <div className='w-full'>
                    <h3 className="text-center font-semibold text-slate-600 mb-3 lg:text-2xl"><i className="bx bxs-user-plus lg:text-4xl"></i> Daftar</h3>
                    <hr className="mb-3 mx-16 lg:mb-11" />
                    <form>
                    <InputForm id='Nama' type='text' name='nama' placeholder="Nama" label="Nama"/>
                    <InputForm id='Username' type='text' name='username' placeholder="Username" label="Username"/>
                    <InputForm id='email' type='email' name='email' placeholder="Email" label="Email"/>
                    <InputForm id='password' type='password' name='password' placeholder="Password" label="Password"/>
                    <InputForm id='passwordConfirmation' type='password' name='passwordConfirmation' placeholder="Confirmation Password" label="Password Confirmation"/>
                    <Button text="Daftar" type="Submit"/>
                    <p className="mt-5 text-center">Sudah punya akun? <a href="/login" className="text-blue-700 hover:text-blue-900 hover:underline">Masuk</a></p>
                    </form>
                </div>
            </div>
        </main>
    </div>
    )
}

export default Register

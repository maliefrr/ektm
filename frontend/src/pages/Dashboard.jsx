import React from 'react'
import SideBar from '../components/SideBar'
import Button from '../components/Button'
import 'react-responsive-modal/styles.css';
import {toast} from "react-toastify"
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import { useEffect } from 'react'
import {Modal} from 'react-responsive-modal'
import { getMahasiswa,mahasiswaReset } from '../features/mahasiswa/mahasiswaSlice'
import { getUser, userReset, deleteUser } from '../features/user/userSlice'
const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openMahasiswaDetail,setOpenMahasiswaDetail] = useState(false)
    const [openUserDetail,setOpenUserDetail] = useState(false)
    const [mahasiswaDetail,setMahasiswaDetail] = useState({
        pas_foto: "",
        name:"",
        nim:"",
        alamat:"",
        prodi:"",
        gol_darah:"",
        jenis_kelamin: ""
    })
    const [userDetail,setUserDetail] = useState({
        username : "",
        email: "",
        role: ""
    })
    const {user} = useSelector((state) => state.auth)
    const {mahasiswa,mahasiswaIsError,mahasiswaIsLoading,mahasiswaMessage} = useSelector((state) => state.mahasiswa)
    const {users,userIsError,userIsLoading,userMessage} = useSelector((state) => state.user)
    const handleDeleteMahasiswa = (id) => {
        // setMahasiswaData(mahasiswaData.filter((data) => data.id !== id))
    }
    

    const handleMahasiswaModalClose = () => {
        setOpenMahasiswaDetail(false)
        setMahasiswaDetail({
            pas_foto: "",
            name:"",
            nim:"",
            alamat:"",
            prodi:"",
            gol_darah:"",
            jenis_kelamin: ""
        })
    }

    const handleUserModalClose = () => {
        setOpenUserDetail(false)
        setUserDetail({
            username : "",
            email: "",
            role: ""
        })
    }

    useEffect(() => {
        if (mahasiswaIsError) {
        toast.error(mahasiswaMessage)
        }

        if(userIsError) {
            toast.error(userMessage)
            navigate("/")
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
    console.log(userMessage)
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
                                        <td>
                                        <Button text="Add User" className="mb-3"/>
                                        </td>
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
                                                <button className="px-2" onClick={() => {toast.success("data has been successfully deleted"); dispatch(deleteUser(user.id))}}>
                                                    Delete
                                                </button>
                                                <button className="px-2" onClick={() => {setUserDetail({
                                                    username : user.username,
                                                    email: user.email,
                                                    role: user.role
                                                }); setOpenUserDetail(true)}}>
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
                                        <td>
                                        <Link to={"/add/mahasiswa"} className="block mt-5 bg-orange-500 px-4 py-1 rounded-md text-white hover:bg-orange-600 active:bg-orange-700 mb-3 md:w-1/4 sm:w-full">Add Mahasiswa</Link>
                                        </td>
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
                                                <button className="px-2" onClick={() => {setMahasiswaDetail({
                                                            pas_foto: mahasiswa.pas_foto,
                                                            name: mahasiswa.name,
                                                            nim: mahasiswa.nim,
                                                            prodi: mahasiswa.prodi,
                                                            gol_darah:mahasiswa.gol_darah,
                                                            jenis_kelamin: mahasiswa.jenis_kelamin,
                                                            alamat: mahasiswa.alamat
                                                            }); setOpenMahasiswaDetail(true)}}>
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
            <Modal open={openMahasiswaDetail} onClose={handleMahasiswaModalClose} center classNames={{
                modal: "w-1/3 overflow-x-hidden"
            }}>
                <div className='flex w-full'>
                    <div className='mx-auto mb-2'>
                    <img src={mahasiswaDetail.pas_foto} alt={`Pas foto ${mahasiswaDetail.name}`} className='w-32 h-32 rounded-full mx-auto'/>
                    <h2 className='text-lg font-medium'>{mahasiswaDetail.name}</h2>
                    <h2 className='text-md font-medium text-center'>{mahasiswaDetail.nim}</h2>
                    </div>
                </div>
                <table className='ml-20 w-full'>
                    <tr>
                    <td className='pl-4 py-2'>Program Studi</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.prodi}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Alamat</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.alamat}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Jenis Kelamin</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.jenis_kelamin}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Golongan Darah</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.gol_darah}</td>
                    </tr>
                </table>
            </Modal>
            <Modal open={openUserDetail} onClose={handleUserModalClose} center classNames={{
                modal: "w-1/4 overflow-x-hidden"
            }}>
                 <table className='w-full'>
                    <tr>
                    <td className='pl-4 py-2'>Username</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{userDetail.username}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Email</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{userDetail.email}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Role</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{userDetail.role}</td>
                    </tr>
                </table>
            </Modal>
        </>
    )
}

export default Dashboard
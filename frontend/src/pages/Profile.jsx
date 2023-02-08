import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SideBar from '../components/SideBar'
import {useSelector} from 'react-redux'
import {toast} from "react-toastify"
import { RotatingLines } from  'react-loader-spinner'
import Button from '../components/Button'
import InputForm from '../components/InputForm'

const Profile = () => {
  const [data, setData] = useState([]);
  const {user} = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edit,setEdit] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get(`http://localhost:5000/api/mahasiswa/profile/${user.data.username}`);
          setData(response.data.mahasiswa);
      } catch (err) {
          setError(err);
      } finally {
          setIsLoading(false);
      }
    }
    fetchData()
  },[user])
    if (error) {
        toast.error(`An error occurred: ${error.message}`)
    }
    if (isLoading) {
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
    <div className="flex h-screen">
        <SideBar/>
        <div className="md:ml-[16rem] w-3/4 bg-white p-4">
          <div className='w-full flex flex-col'>
            <h1 className="text-2xl font-medium">Profile</h1>
            {user.data.role === "mahasiswa" ? (
              <>
                <img src={data.pas_foto} alt={`Profile ${data.name}`} className="w-52 h-52 rounded-md object-cover mx-auto"/>
                <hr className=' border-2 border-black my-3'/>
                <div className="flex justify-end">
                  <Button className="" text="Edit" onClick={() => setEdit(!edit)}/>
                </div>
                <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={data.name} disable={edit} class="mb-2"/>
                <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={data.nim} disable={edit} class="mb-2"/>
                <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={data.prodi} disable={edit} class="mb-2"/>
                <InputForm id='email' type='email' name='email' placeholder="Email" label="Email" value={user.data.email} disable={edit} class="mb-2"/>
                <InputForm id='gol_darah' type='text' name='gol_darah' placeholder="Golongan Darah" label="Golongan Darah" value={data.gol_darah} disable={edit} class="mb-2"/>
                <InputForm id='jenis_kelamin' type='text' name='jenis_kelamin' placeholder="Jenis Kelamin" label="Jenis Kelamin" value={data.jenis_kelamin} disable={edit} class="mb-2"/>
              </>
            ) : ""}
          </div>
        </div>
    </div>
);
}

export default Profile
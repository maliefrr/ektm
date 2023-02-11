import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SideBar from '../components/SideBar'
import {useSelector} from 'react-redux'
import {toast} from "react-toastify"
import { RotatingLines } from  'react-loader-spinner'
import Button from '../components/Button'
import InputForm from '../components/InputForm'

const Profile = () => {
  const [data, setData] = useState({
    name : "",
    prodi : "",
    nim : "",
    gol_darah : "",
    jenis_kelamin : ""
  });
  const {user} = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edit,setEdit] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const response = await axios.get(`http://localhost:5000/api/mahasiswa/profile/${user.data.username}`);
          setData({
            name: response.data.mahasiswa.name,
            prodi: response.data.mahasiswa.prodi,
            nim: response.data.mahasiswa.nim,
            gol_darah: response.data.mahasiswa.gol_darah,
            jenis_kelamin: response.data.mahasiswa.jenis_kelamin,
          });
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
    const {name,prodi,nim,gol_darah,jenis_kelamin} = data
  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="flex h-screen">
        <SideBar/>
        <div className="md:ml-[16rem] w-3/4 bg-white p-4">
          <div className='w-full flex flex-col'>
            <h1 className="text-2xl font-medium">Profile</h1>
            {user.data.role === "mahasiswa" ? (
              <>
                <img src={data.pas_foto} alt={`Profile ${name}`} className="w-52 h-52 rounded-md object-cover mx-auto"/>
                <hr className=' border-2 border-black my-3'/>
                <h1 className="text-center font-bold text-2xl">Informasi Akun</h1>
                <div className="flex justify-end">
                  <Button className="" text="Edit" onClick={() => setEdit(!edit)}/>
                </div>
                <InputForm id='text' type='text' name='username' placeholder="Username" label="Username" value={user.data.username} disable={edit} class="mb-2"/>
                <InputForm id='email' type='email' name='email' placeholder="Email" label="Email" value={user.data.email} disable={edit} class="mb-2"/>
                <div className="flex mx-auto mb-2">
                  <Button className="" text="Submit"/>
                </div>
                <h1 className="text-center font-bold text-2xl mt-5">Biodata</h1>
                <div className="flex justify-end">
                  <Button className="" text="Edit" onClick={() => setEdit(!edit)}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} disable={edit} class="mb-2" onChange={handleChange}/>
                    <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={nim} disable={edit} class="mb-2" onChange={handleChange}/>
                    <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={prodi} disable={edit} class="mb-2" onChange={handleChange}/>
                    <label htmlFor='gol_darah' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Golongan Darah
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={gol_darah} name="gol_darah" disabled={edit} onChange={handleChange}>
                        <option value="default" disabled>Golongan Darah</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                        <option value="-">-</option>
                    </select>
                    </label> 
                    <label htmlFor='gol_darah' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Jenis Kelamin
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={jenis_kelamin} name="jenis_kelamin" disabled={edit} onChange={handleChange}>
                        <option value="default" disabled>Jenis Kelamin</option>
                        <option value="Pria">L</option>
                        <option value="Wanita">P</option>
                    </select>
                    </label> 
                    <div className="flex mx-auto mb-2">
                      <Button className="" text="Submit"/>
                    </div>
                </form>
              </>
            ) : ""}
          </div>
        </div>
    </div>
);
}

export default Profile
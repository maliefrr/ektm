import React, {useState} from 'react'
import SideBar from '../components/SideBar'

const Profile = () => {
  return (
    <div className="flex h-screen">
        <SideBar/>
        <div className="md:ml-[16rem] w-3/4 bg-white p-4">
          <div className='w-full flex flex-col'>
            <h1 className="text-2xl font-medium">Profile</h1>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile" className="w-52 h-52 rounded-md object-cover mx-auto"/>
            <p className="text-sm">Name: John Doe</p>
            <p className="text-sm mb-3">Email: johndoe@example.com</p>
          </div>
        </div>
    </div>
);
}

export default Profile
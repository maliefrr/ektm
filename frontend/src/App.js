import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import AddMahasiswa from './pages/AddMahasiswa';
import Profile from './pages/Profile';
import Mahasiswa from './pages/Mahasiswa';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/mahasiswa' element={<Mahasiswa/>}/>
          <Route path='/dashboard/users' element={<User/>}/>
          <Route path='/dashboard/me' element={<Profile/>}/>
          <Route path='/add/mahasiswa' element={<AddMahasiswa/>}/>
        </Routes>
      </Router>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

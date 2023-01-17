import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import AddMahasiswa from './pages/AddMahasiswa';

function App() {
  return (
    <div className="App">
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/add/mahasiswa' element={<AddMahasiswa/>}/>
        </Routes>
      </Router>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

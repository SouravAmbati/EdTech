import React from 'react'
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast';
import Skills from './components/Skills';

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
        <Route path='/skills' element={<Skills/>}/>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
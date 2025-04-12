import React from 'react'
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast';
import Skills from './components/Skills';
import Roadmap from './components/Roadmap';
import Projects from './components/Project';
import Brief from './components/brief';

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/roadmap' element={<Roadmap/>}/>
        <Route path='/project' element={<Projects/>}/>
        <Route path='/inBrief' element={<Brief/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
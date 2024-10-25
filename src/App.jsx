import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Beranda from './pages/Beranda'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from './Detail'
import DetailBeranda from './pages/DetailBeranda'
import ThemeContext from './components/context/ThemeContext';
import { Provider } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import store from './store/store';
import Profil from './pages/Profil'

function App() {

  const theme = useState("Light")

  return (
    <BrowserRouter>
    <ThemeContext.Provider value={theme}>
    <Provider store={store}>
    
    <Navbar/>
    <Routes>
      <Route path='/' element={<Beranda/>} />
      <Route path='/profil' element={<Profil/>} />
      <Route path='/detail' element={<Detail/>} />
      <Route path='/detailberanda/:id' element={<DetailBeranda/>} />
    </Routes>
    </Provider>
    </ThemeContext.Provider>
    <Footer />
    </BrowserRouter>
  )
}

export default App

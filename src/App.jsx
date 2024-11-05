import React from 'react';
import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/Landingpage';
import Footer from './components/Footer';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Shoppinglistpage from './pages/Shoppinglistpage';
import Cartpage from './pages/Cartpage';
import Additemspage from './pages/Additemspage'


function App() {
  return (
    <div className='flex flex-col min-h-screen'>
    <BrowserRouter>
     
      <Navigation />
      <div className='flex-grow'>
      <Routes>
        <Route index element={<Landingpage />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Registerpage" element={<Registerpage />} />
        <Route path="/Shoppinglistpage" element={<Shoppinglistpage />} />
        <Route path="/Cartpage" element={<Cartpage />} />
        <Route path="/Additemspage" element={<Additemspage />} />
      

      </Routes>
         </div>
   
      <Footer />
 
    </BrowserRouter>
    </div>
  );
}

export default App;

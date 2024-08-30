import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Header from '../../components/Header/Navbar';
import Footer from '../../components/Footer/Index';
// import HeroSection from './HeroSection';
// import Menu from './Menu';
// import Services from './Services';
// import Testimonial from './testimonial';
import LayoutServices from './LayoutServices';
import LayoutMenu from './LayoutMenu';
import ContactTable from './ContactTable';

export default function Frontend() {
  return (
    <>
    <Header />
    {/* 
      <HeroSection/>
      <Menu/>} */}
      {/* <div style={{ padding: '30px' }}></div>
      <Services/> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<LayoutServices />} />
        <Route path='food-menu' element={<LayoutMenu />} />
        <Route path='contact-table' element={<ContactTable />} />
      </Routes>
      {/* <Testimonial/>
       */}
       <Footer/>
    </>
  );
}

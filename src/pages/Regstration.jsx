import React from 'react'
import About from '../components/About'
import RegistrationForm from '../components/RegistrationForm'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Registration() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Nav />
      <div className='flex-grow'>
        <div className='grid grid-cols-1 md:grid-cols-2 sm:w-[80%] md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto'>
            <RegistrationForm />
            <About/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Registration

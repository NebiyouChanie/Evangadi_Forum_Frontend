import React from 'react'
import LoginForm from '../components/LoginForm'
import About from '../components/About'
import Nav from '../components/Nav'
import Footer from '../components/Footer'


function Login() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Nav />
      <div className='flex-grow'>
        <div className='grid grid-cols-1 md:grid-cols-2 sm:w-[80%] md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto'>
            <LoginForm/>
            <About/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login

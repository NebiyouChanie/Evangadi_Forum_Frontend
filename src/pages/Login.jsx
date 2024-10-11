import React from 'react'
import LoginForm from '../components/LoginForm'
import About from '../components/About'

function Login() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 sm:w-[80%] md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto'>
        <LoginForm/>
        <About/>
    </div>
  )
}

export default Login
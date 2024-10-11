import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/image.png'
function Nav() {
  return (
    <nav className='flex h-20 items-center justify-between  px-6 md:px-8  lg:px-[10%]  border-b-2'>
        <Link to={'/questions'}>
          <div><img className='h-5 lg:h-6' src={logo} alt="logo" /></div>
        </Link>
        <div>
            <ul className='flex gap-4'>
                <li><Link className='font-medium  hidden md:block' to={'/questions'}>Home</Link></li>
                <li><Link className='font-medium hidden md:block' to={'/aboutus'}>How it works</Link></li>
                <li><Link className='text-xs lg:text-base font-semibold bg-orange-600 px-4 py-2 rounded-md text-white' to={'/users/login'}>Log Out</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav
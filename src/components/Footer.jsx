import React from 'react'
import logo from '../assets/image2.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className='flex flex-col    md:flex-row md:justify-between w-full px-[10%] py-[5%] bg-gray-700 gap-6'>
        <div className='flex flex-col gap-4'>
            <div className='h-6'>
                <img className='h-full' src={logo} alt="" />
            </div>
            <div className='flex gap-2'>
                <FacebookIcon />
                <YouTubeIcon />
                <LinkedInIcon />
            </div>
        </div>
        <div className='flex flex-col'>
            <h3 className='text-white font-semibold mb-2'>Useful links</h3>
            <a className='text-gray-300' href="/">How it works</a>
            <a className='text-gray-300' href="/">Terms of Service</a>
            <a className='text-gray-300' href="/">Privacy policy</a>
        </div>
        <div className='flex flex-col'>
            <h3 className='text-white font-semibold mb-2'> Useful links</h3>
            <a className='text-gray-300' href="/">Evangadi Networks</a>
            <a className='text-gray-300' href="/">support@evangadi.com</a>
            <a className='text-gray-300' href="/">+1-202-386-2702</a>
        </div>
    </div>
  )
}

export default Footer
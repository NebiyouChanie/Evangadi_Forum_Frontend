import React from 'react'

function About() {
  return (
    <div className='flex flex-col pt-8 pb-16 px-4'>
        <h3 className='text-orange-500 mb-2'>About</h3>
        <h1 className='font-bold text-5xl leading-[130%]  text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-500 to-orange-200'>
            Evangadi Networks
        </h1>

        <p className='mb-4 text-gray-700'>No matter what stage of life you are in, whether you're just starting elentary school or being promoted to CEO of a Gortun 500 comany. you have much to offer to those who are trying to follow in your footsteps.</p>
        <p className='mb-8 text-gray-700'>Wheather you are iwlling to share your knowledge or you are just looking to meet mentors of your own , please start by  joining the network here</p>
        <button className='bg-orange-500 text-white uppercase w-fit px-8 py-2'>How it works</button>
    </div>
  )
}

export default About
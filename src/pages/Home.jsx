import React from 'react'
import Nav from '../components/Nav'
import Questions from './Questions'
import Footer from '../components/Footer'
function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Nav />
      <Questions />
      <Footer />
    </div>
  )
}

export default Home

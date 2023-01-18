import React from 'react'
import { Jumbotron } from '../components/cards'

const Home = () => {
  return (
    <div className='bg-gray-700'>
      <Jumbotron title="Hello World" subtitle="Welcome to Mern E-Commerce App" />
      <h1 className='text-center m-auto'>Here is the content of Home Page</h1>
    </div>
  )
}

export default Home
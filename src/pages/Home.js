import React from 'react'
import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'

function Home() {
  return (
    <>
        <h1 className='text-6xl'>Welcome back!</h1>
        <UserSearch/>
        <UserResults/>
    </>
  )
}

export default Home
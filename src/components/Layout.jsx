import React from 'react'
import Navbar from './NavBar'

const Layout = ({ children }) => {
  return (
    <>
      <main className="container mx-auto">
        <Navbar />
        {children}
      </main>
    </>
  )
}

export default Layout
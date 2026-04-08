import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className=' sticky top-0 left-0 right-0 z-50'>
      <div className="title text-md font-bold mx-2 my-2">
        <Link to="/">
          Jvnpey
        </Link>
      </div>
    </header>
  )
}

export default Header
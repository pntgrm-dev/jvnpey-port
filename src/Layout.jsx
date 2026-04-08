import React, { useEffect } from 'react'
import { Link } from 'react-router'
import Card from './Card'
import Nav from './Nav'
import useWorkStore from './Store/getWorks'
import Footer from './Footer'
import Body from './Body'
import Header from './Header'

const Layout = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  return (
    <>
      <Header />
      <div className='main grid grid-cols-1 md:grid-cols-8'>
        <div className='col-span-1 md:col-span-1'>
          <Nav />
        </div>
        <div className='col-span-1 md:col-span-7'>
          <Body />
        </div>
      </div>
          
      <Footer />
    </>
    )
}

export default Layout
import React, { useEffect } from 'react'
import { Link } from 'react-router'
import Card from './Card'
import Nav from './Nav'
import useWorkStore from './Store/getWorks'
import Footer from './Footer'
import Body from './Body'
import Header from './Header'
import useProfileStore from './Store/getProfile'

const Layout = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchWorks();
    fetchProfile();
  }, [fetchWorks, fetchProfile]);

  const backgroundUrl = profile?.backgroundImage?.url || "";
  return (
    <div className='relative min-h-screen'>
      {/* 背景画像専用レイヤー（透けさせる） */}
      <div 
        className='fixed inset-0 bg-cover bg-center bg-fixed opacity-5 -z-10'
        style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none' }}
      />
      
      <Header />
      <div className='main grid grid-cols-1 md:grid-cols-8 min-h-[calc(100vh-100px)]'>
        <div className='col-span-1 md:col-span-1'>
          <Nav />
        </div>
        <div className='col-span-1 md:col-span-7'>
          <Body />
        </div>
      </div>
      <Footer />
    </div>
    )
}

export default Layout
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
    <div className="relative h-screen flex flex-col overflow-hidden">
      {/* 背景画像専用レイヤー */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed opacity-20 -z-10"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        }}
      />
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-grow grid grid-cols-1 md:grid-cols-12 w-full overflow-hidden">
          <div className="col-span-1 md:col-span-1 overflow-y-auto">
            <Nav />
          </div>
          <div className="col-span-1 md:col-span-11 overflow-y-auto">
            <Body />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout
import React, { useEffect } from 'react'
import { Link } from 'react-router'
import List from './list'
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
        className="fixed inset-0 bg-cover bg-center bg-fixed -z-10"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        }}
      />
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-grow grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[auto_1fr] w-full overflow-hidden min-h-0">
          <div className="col-span-1 md:col-span-1 overflow-y-auto min-h-0">
            <Nav />
          </div>
          <div className="col-span-1 md:col-span-1 overflow-y-auto min-h-0">
            <Body />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout
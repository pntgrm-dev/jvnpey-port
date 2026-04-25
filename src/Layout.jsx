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

  console.log('Works in Layout:', works); // デバッグ用ログ
  console.log('Profile in Layout:', profile); // デバッグ用ログ

  const backgroundUrl = profile?.backgroundImage?.url || "";
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 背景画像専用レイヤー */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed -z-10 opacity-100"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        }}
      />
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1 grid grid-cols-[auto_1fr_auto] w-full">
          {/* <div className="col-span-1 overflow-y-auto min-h-0">
            <Nav />
          </div> */}
          <div className="col-span-1 min-h-0 border-border-primary">
            <div className="frame w-[15px] md:w-[60px] h-full bg-black"></div>
          </div>
          <div className="col-span-1 min-h-0 border-border-primary mx-4 rounded-lg">
            <Body />
          </div>
          <div className="col-span-1 min-h-0 border-border-primary">
            <div className="frame w-[15px] md:w-[60px] h-full bg-black"></div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout

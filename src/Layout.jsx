import React, { useEffect, useState } from 'react'
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
  const [backgroundUrl, setBackgroundUrl] = useState("");

  useEffect(() => {
    fetchWorks();
    fetchProfile();
  }, [fetchWorks, fetchProfile]);

  useEffect(() => {
    if (profile?.backgroundImages && Array.isArray(profile.backgroundImages) && profile.backgroundImages.length > 0) {
      // 複数画像がある場合、ランダムに1つ選択
      const randomIndex = Math.floor(Math.random() * profile.backgroundImages.length);
      const selectedImage = profile.backgroundImages[randomIndex];
      setBackgroundUrl(selectedImage?.url || "");
    } else if (profile?.backgroundImages?.url) {
      // 単一オブジェクトの場合（フォールバック）
      setBackgroundUrl(profile.backgroundImages.url);
    } else if (profile?.backgroundImage?.url) {
      // 以前のシングル画像フィールド（後方互換性用フォールバック）
      setBackgroundUrl(profile.backgroundImage.url);
    }
  }, [profile]);

  console.log('Works in Layout:', works); // デバッグ用ログ
  console.log('Profile in Layout:', profile); // デバッグ用ログ

  return (
    <div 
      className="relative flex flex-col"
      style={{
        '--bg-url': backgroundUrl ? `url(${backgroundUrl})` : "none",
      }}
    >
      <div className="flex  flex-col">
        <main className="relative z-10 flex-1 grid grid-cols-[auto_1fr_auto] w-full">
          <div className="col-span-1 min-h-0 border-border-primary">
            <div className="frame w-[15px] md:w-[60px] h-full bg-black"></div>
          </div>
          <div className="col-span-1 min-h-0 border-border-primary mx-4 rounded-lg my-8">
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

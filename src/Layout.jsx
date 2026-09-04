import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import List from './list'
import Nav from './Nav'
import useWorkStore from './Store/getWorks'
import Footer from './Footer'
import Body from './Body'
import Header from './Header'
import useProfileStore from './Store/getProfile'

const faces = [
  "/assets/gif/Face1.gif",
  "/assets/gif/Face2.gif",
  "/assets/gif/Face3.gif",
  "/assets/gif/Face4.gif"
];

const Layout = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();
  const { profile, fetchProfile } = useProfileStore();
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);

  useEffect(() => {
    fetchWorks();
    fetchProfile();
  }, [fetchWorks, fetchProfile]);

  // Disable automatic face cycling to avoid causing re-renders that interrupt embedded media.
  // Face remains static using initial `currentFaceIndex`.

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

  // Removed verbose debug logs to avoid console activity during media playback

  return (
    <div className="flex overflow-x-hidden">
      <div className="w-[35px] md:w-[50px] shrink-0 sticky top-4 h-fit ml-2 md:ml-4">
        <Nav />
        <Link to="/">
          <img
            className="w-[30px] md:w-[50px] mt-[2px] md:mt-2"
            src={faces[currentFaceIndex]}
            alt=""
          />
        </Link>
      </div>

      <div className="flex-1 ml-2 md:ml-6">
        <Body />
      </div>
    </div>
  )}

export default Layout

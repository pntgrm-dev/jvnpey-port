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

  useEffect(() => {
    let timeoutId;

    const changeFace = () => {
      setCurrentFaceIndex((prev) => (prev + 1) % faces.length);
      const nextDelay = Math.floor(Math.random() * (8000 - 6000 + 1)) + 2000;
      timeoutId = setTimeout(changeFace, nextDelay);
    };

    const delay = Math.floor(Math.random() * (8000 - 6000 + 1)) + 2000;
    timeoutId = setTimeout(changeFace, delay);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

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
    <div className="flex">
      <div className="w-[50px] shrink-0 sticky top-4 h-fit ml-4">
        <Nav />
        <Link to="/">
          <img
            className="w-full mt-[5px]"
            src={faces[currentFaceIndex]}
            alt=""
          />
        </Link>
      </div>

      <div className="flex-1 ml-8">
        <Body />
      </div>
    </div>
  )}

export default Layout

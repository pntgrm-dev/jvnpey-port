import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useProfileStore from './Store/getProfile'

const Header = () => {
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <header className='sticky top-0 left-0 right-0 z-50 section-border-bottom  bg-black text-white'>
      <div className="title text-[10px] font-bold mx-2 ">
        <Link to="/">
          {profile?.logo?.url && (
            <img src={profile.logo.url} alt="" className='w-auto h-8 my-2' />
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header
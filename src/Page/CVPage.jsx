import React, { useEffect } from 'react'
import PageComponent from '../PageComponent'
import useProfileStore from '../Store/getProfile'

const CVPage = () => {
    const { profile, fetchProfile, isLoading, error } = useProfileStore();

    useEffect(() => {
        if (!profile) fetchProfile();
    }, [fetchProfile, profile]);

  return (
    <PageComponent title="CV">
      <div className="p-4">
        {isLoading && (
          <div className="text-white p-4 text-center">Loading...</div>
        )}
        {error && (
          <div className="text-red-500 p-4 text-center">Error: {error}</div>
        )}
        {!isLoading && !error && profile && (
          <div className="space-y-1 text-[10px] w-[200px]">
            <div className="flex justify-start">
              <img src={profile.icon.url} alt="" className="logo w-20 h-20" />
            </div>
            <div className="">{profile.Name}</div>
            <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: profile.Biography }} />
            <div className="" dangerouslySetInnerHTML={{ __html: profile.Contact }} />
          </div>
        )}
      </div>
    </PageComponent>
  )
}

export default CVPage
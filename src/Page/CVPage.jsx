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
          <div className="space-y-6">
              <div className="text-white text-xl font-bold border-b border-gray-400 pb-2">{profile.Name}</div>
              <div className="text-gray-200 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: profile.Biography }} />
              <div className="text-gray-300 text-sm border-t border-gray-500 pt-4" dangerouslySetInnerHTML={{ __html: profile.Contact }} />
          </div>
        )}
      </div>
    </PageComponent>
  )
}

export default CVPage
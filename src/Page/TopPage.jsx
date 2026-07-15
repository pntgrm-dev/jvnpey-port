import React, { useEffect } from 'react'
import useWorkStore from '../Store/getWorks'
import useProfileStore from '../Store/getProfile'
import PageComponent from '../PageComponent'

const TopPage = () => {
  const { works, isLoading, error } = useWorkStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [fetchProfile, profile]);

  return (
    <PageComponent title="Home">
      <div className="space-y-1 px-2">
        {profile?.Home && (
          <div
            className="prose prose-sm max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: profile.Home }}
          />
        )}
      </div>
    </PageComponent>
  );
}

export default TopPage
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
          <div className="space-y-1 text-[10px] w-[300px]">
            <div className="flex flex-row gap-1 flex-wrap justify-start">
              {Array.isArray(profile.icons)
                ? profile.icons.map((icon, i) => (
                    <img key={i} src={icon.url} alt="" className="logo w-20 h-20 object-cover" />
                  ))
                : profile.icons?.url && (
                    <img src={profile.icons.url} alt="" className="logo w-20 h-20 object-cover" />
                  )
              }
            </div>
            <div className="">{profile.Name}</div>
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: profile.Biography }}
            />
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: profile.Contact }}
            />
            <div className="mail">
              <a
                href={`mailto:${profile.Mail || profile.Email || "jvnpey@email.com"}`}
                className="hover:underline cursor-pointer py-1 inline-block text-[#6E00E1]"
              >
                jvnpey@email.com
              </a>
            </div>
          </div>
        )}
      </div>
    </PageComponent>
  );
}

export default CVPage
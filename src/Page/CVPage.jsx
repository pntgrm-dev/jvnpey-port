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
          <div className="space-y-1 text-xxs w-auto">
            <div className="flex flex-row gap-1 flex-wrap justify-start">
              {Array.isArray(profile.icons)
                ? profile.icons.map((icon, i) => (
                    <img key={i} src={icon.url} alt="" className="logo w-auto h-45" />
                  ))
                : profile.icons?.url && (
                    <img src={profile.icons.url} alt="" className="logo w-auto h-20" />
                  )
              }
            </div>
            <div className="">{profile.Name}</div>
              <div
                className="leading-relaxed [&_a]:no-underline [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: profile.Biography }}
              />
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: profile.Contact }}
            />
            <div className="mail">
              <a
                href={`mailto:${profile.Mail || profile.Email || "jvnpey@gmail.com"}`}
                className="hover:underline cursor-pointer py-1 inline-block text-[#0000FF]"
              >
                jvnpey@gmail.com
              </a>
            </div>
          </div>
        )}
      </div>
    </PageComponent>
  );
}

export default CVPage
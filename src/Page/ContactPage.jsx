import React from 'react'
import PageComponent from '../PageComponent'
import useProfileStore from '../Store/getProfile'

const ContactPage = () => {
  const { profile, fetchProfile } = useProfileStore();
  return (
    <PageComponent title="Contact">
      <div className="p-4" dangerouslySetInnerHTML={{ __html: profile?.Contact }}>
      </div>
    </PageComponent>
  )
}

export default ContactPage
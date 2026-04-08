import React from 'react'
import { Routes, Route } from 'react-router'
import TopPage from './Page/TopPage'
import WorksPage from './Page/WorksPage'
import ContactPage from './Page/ContactPage'
import MemoPage from './Page/MemoPage'
import CVPage from './Page/CVPage'

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:category" element={<WorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/memo" element={<MemoPage />} />
        <Route path="/CV" element={<CVPage />} />
      </Routes>
    </div>
  )
}

export default Body
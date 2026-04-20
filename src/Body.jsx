import React from 'react'
import { Routes, Route } from 'react-router'
import TopPage from './Page/TopPage'
import WorksPage from './Page/WorksPage'
import ContactPage from './Page/ContactPage'
import MemoPage from './Page/MemoPage'
import CVPage from './Page/CVPage'
import DetailPage from './Page/DetailPage'

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/:category" element={<WorksPage />} />
        <Route path="/:category/:id" element={<DetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/memo" element={<MemoPage />} />
        <Route path="/CV" element={<CVPage />} />
      </Routes>
    </div>
  );
}

export default Body
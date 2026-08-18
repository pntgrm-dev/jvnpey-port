import React from "react";
import { Routes, Route } from "react-router";
import TopPage from "./Page/TopPage";
import ContactPage from "./Page/ContactPage";
import CVPage from "./Page/CVPage";
import DetailPage from "./Page/DetailPage";
import PublishPage from "./Page/PublishPage";
import WorksListPage from "./Page/WorksListPage";
import ArchivePage from "./Page/ArchivePage";
import MusicPage from "./Page/MusicPage";
import VideoPage from "./Page/VideoPage";
import ViewPage from "./Page/ViewPage";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/CV" element={<CVPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/works" element={<WorksListPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/:category/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default Body;


import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme';

import './styles/general/fonts.css';
import './styles/general/common.css';

import Homepage from './pages/home';
import ProjectsPage from './pages/projects';
import ResumePage from './pages/resume';
import ExperiencePage from './pages/experience';
import { useEffect } from 'react';

import {A} from './a';

const Main = () => {

  useEffect(()=>A.b(),[]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* <Route path="/art" element={<ArtPage />} /> RIP :( */}
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default Main;
import { Route, Routes, useParams } from 'react-router-dom'
import SiteLayout from './layout/SiteLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PipelinePage from './pages/PipelinePage'
import CampusPage from './pages/CampusPage'
import EventsPage from './pages/EventsPage'
import PartnersPage from './pages/PartnersPage'
import PrivacyPage from './pages/PrivacyPage'
import JoinGateway from './join/components/JoinGateway'
import JoinFormPage from './join/components/JoinFormPage'

function InviteFormPage() {
  const { code } = useParams()
  return <JoinFormPage formType="invite" inviteCode={code} />
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="campus" element={<CampusPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="join" element={<JoinGateway />} />
        <Route path="join/student" element={<JoinFormPage formType="student" />} />
        <Route path="join/team" element={<JoinFormPage formType="team" />} />
        <Route path="join/team/invite" element={<JoinFormPage formType="invite" />} />
        <Route path="join/team/invite/:code" element={<InviteFormPage />} />
        <Route path="join/mentor" element={<JoinFormPage formType="mentor" />} />
        <Route path="join/partner" element={<JoinFormPage formType="partner" />} />
        <Route path="join/sponsor" element={<JoinFormPage formType="sponsor" />} />
        <Route path="join/campus" element={<JoinFormPage formType="campus" />} />
      </Route>
    </Routes>
  )
}

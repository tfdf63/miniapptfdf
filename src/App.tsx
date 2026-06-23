import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from '@/components/SiteLayout'
import { HomePage } from '@/pages/HomePage'
import { EventsListPage } from '@/pages/EventsListPage'
import { EventPage } from '@/pages/EventPage'
import { PlayerPage } from '@/pages/PlayerPage'
import { StagePage } from '@/pages/StagePage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/:slug" element={<EventPage />} />
        <Route path="/events/:slug/stage/:stageNumber" element={<StagePage />} />
        <Route path="/events/:slug/player/:userId" element={<PlayerPage />} />
      </Route>
    </Routes>
  )
}

export default App

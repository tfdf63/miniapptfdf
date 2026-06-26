import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from '@/components/SiteLayout'
import { HomePage } from '@/pages/HomePage'
import { EventsListPage } from '@/pages/EventsListPage'
import { EventPage } from '@/pages/EventPage'
import { PlayerPage } from '@/pages/PlayerPage'
import { StagePage } from '@/pages/StagePage'
import { PlayersPage } from '@/pages/PlayersPage'
import { ParkH3Page } from '@/pages/ParkH3Page'
import { BingoPage } from '@/pages/BingoPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="parkh3" element={<ParkH3Page />} />
        <Route path="events" element={<EventsListPage />} />
        <Route path="bingo" element={<BingoPage />} />
        <Route path="events/:slug" element={<EventPage />} />
        <Route path="events/:slug/stage/:stageNumber" element={<StagePage />} />
        <Route path="events/:slug/player/:userId" element={<PlayerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

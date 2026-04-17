import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GrowthPage from './pages/GrowthPage'
import QuestPage from './pages/QuestPage'
import RankingPage from './pages/RankingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/growth" element={<GrowthPage />} />
        <Route path="/quests" element={<QuestPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/not-found'
import Main from './pages/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

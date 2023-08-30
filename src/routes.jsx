import { Routes, Route } from 'react-router-dom'
// import { App } from './App'
// import { About } from './pages/about'
import Main from './pages/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  )
}

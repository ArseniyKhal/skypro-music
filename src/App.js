import './App.css'
import { useState } from 'react'
import Nav from './components/nav'
import Sidebar from './components/sidebar'
import Centerblock from './components/centerblock'
import Bar from './components/bar'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  // Загрузка 5 сек
  setTimeout(() => {
    setIsLoading(false)
  }, 5000)

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Centerblock isLoading={isLoading} />
          <Sidebar isLoading={isLoading} />
        </main>
        <Bar isLoading={isLoading} />
        <footer className="footer" />
      </div>
    </div>
  )
}

export default App

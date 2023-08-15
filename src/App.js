import './App.css'
import Nav from './components/nav'
import Sidebar from './components/sidebar'
import Centerblock from './components/centerblock'
import Bar from './components/bar'

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  )
}

export default App

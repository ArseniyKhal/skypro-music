import './App.css'
import Nav from './components/nav'
import Sidebar from './components/sidebar'
import Centerblock from './components/centerblock'
import Bar from './components/bar'

function App() {
  return (
    // не знаю нужен ли в данном случае div "App"?
    <div className="App">
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
    </div>
  )
}

export default App

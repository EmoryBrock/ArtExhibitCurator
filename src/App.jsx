import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Results from './components/Results'
import ArtworkListCard from './components/ArtworkListCard'


function App() {

  return (
    <>
      <Header />
      <main>
      <Hero />
      {/* <ArtworkListCard /> */}
      {/* <Results /> */}
      <About />
      </main>
    </>
  )
}

export default App

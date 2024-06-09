import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Results from './components/Results'
import ArtworkListCard from './components/ArtworkListCard'
import Search from './components/Search'

function App() {

  return (
    <>
      <Header />
      <main>
      {/* <Hero /> */}
      {/* <ArtworkListCard /> */}
      {/* <Results /> */}
      <Search />
      <About />
      </main>
    </>
  )
}

export default App

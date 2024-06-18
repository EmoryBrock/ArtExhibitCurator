import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search/SearchPage'
import UserProfile from './components/UserProfile'
import ArtworkDetailPage from './components/ArtworkDetailPage'
import {Route, Routes} from 'react-router-dom'
import TestPage from './components/TestPage'

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path='/artwork/:sourceId' element={<ArtworkDetailPage />}/>
          <Route path="/test/:sourceId" element={<TestPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App

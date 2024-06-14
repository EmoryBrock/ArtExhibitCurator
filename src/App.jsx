import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search'
import UserProfile from './components/UserProfile'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/user' element={<UserProfile />} />
        </Routes>
      </main>
    </>
  )
}

export default App

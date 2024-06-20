import './App.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search/SearchPage'
import UserProfile from './components/UserProfile'
import ArtworkDetailPage from './components/ArtworkDetailPage'
import Collection from './components/Collection'
import SignIn from './components/auth/SignIn'
import NewAccount from './components/auth/NewAccount'
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
          <Route path='/collection' element={<Collection />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<NewAccount />}/>
          <Route path='testpage' element={<TestPage />}/>
        </Routes>
      </main>
    </>
  )
 }

export default App

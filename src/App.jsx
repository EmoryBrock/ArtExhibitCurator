import './index.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Search from './pages/Search/'
// import UserProfile from './components/UserProfile'
import ArtworkDetailPage from './components/ArtworkDetailPage'
import Collection from './components/Collection'
import SignIn from './components/auth/SignIn'
import NewAccount from './components/auth/NewAccount'
import LandingPage from './pages/Home/LandingPage'

 function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/search' element={<Search />} />
          {/* <Route path='/user' element={<UserProfile />} /> */}
          <Route path='/artwork/:sourceId' element={<ArtworkDetailPage />}/>
          <Route path='/collection/:collectionOwner' element={<Collection />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<NewAccount />}/>
        </Routes>
      </main>
    </>
  )
 }

export default App

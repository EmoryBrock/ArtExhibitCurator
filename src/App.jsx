import './index.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header.jsx'
import Search from './pages/Search/SearchPage.jsx'
// import UserProfile from './components/UserProfile'
import ArtworkDetailPage from './pages/ArtworkDetail/ArtworkDetailPage.jsx'
import Collection from './pages/Collection/Collection.jsx'
import SignIn from './pages/Login/SignIn.jsx'
import NewAccount from './pages/Signup/NewAccount.jsx'
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

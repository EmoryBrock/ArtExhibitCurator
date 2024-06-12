import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Results from './components/Results'
import ArtworkListCard from './components/ArtworkListCard'
import SignIn from './components/auth/SignIn'
import NewUserRegister from './components/auth/NewUserRegister'
import AuthDetails from './components/AuthDetails'


 function App() {
  return (
    <>
      <Header />
      <main>
      {/* <Hero /> */}
      {/* <ArtworkListCard /> */}
      {/* <Results /> */}
      <SignIn />
      <NewUserRegister />
      <AuthDetails />
      <About />
      </main>
    </>
  )
 }

export default App

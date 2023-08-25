// import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Container from './components/Container'
import UserProfile from './components/UserProfile'
import Howcontainer from './components/Howcontainer'
import Footer from './components/Footer'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header /> 
      <Howcontainer />
      <Container />
      <UserProfile/>
      <Footer />
    </div>
  )
}

export default App

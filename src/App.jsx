// import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Container from './components/Container'
import Footer from './components/Footer'
import Howtoplay  from './components/Howtoplay'
import Howtoplaycard  from './components/Howtoplaycard'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Container />
      <Howtoplay />
      <Howtoplaycard />
      <Footer />
    </div>
  )
}

export default App

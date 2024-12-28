import './App.css'
import Hero from './components/Hero'
import QuizSection from './components/QuizSection';
import {useState} from 'react'
function App() {

  const [isStarted, setisStarted] = useState(false);
  return (
    <main>
      {!isStarted && <Hero setisStarted={setisStarted}/>}
      {isStarted && <QuizSection/>}
    </main>
  )
}

export default App

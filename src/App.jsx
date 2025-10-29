import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'

const App = () => {

// App komponentin tilamääritykset
// Laskuri 
const [showLaskuri, setShowLaskuri] = useState(false)
// Message
const [showMessage, setShowMessage] = useState(false)
const [messageText, setMessageText] = useState("")
const [isPositiveMessage, setIsPositiveMessage] = useState(true)

const huomio = () => {
  alert("Huomio!")
} 

  return (
    <div className="App">
        <h1>Hello from React! -  Deployed!</h1>

        { showMessage && (
          <Message message={messageText} isPositive={isPositiveMessage} />
        )}

        <Posts />

        <CustomerList setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText} />

        {showLaskuri && <Laskuri huomio={huomio} />}

        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}


        <Viesti teksti="tervehdys app komponentista" />
        
    </div>
  )
}

export default App
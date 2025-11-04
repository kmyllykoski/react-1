import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'

import { Navbar } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">NWApp</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/laskuri">Laskuri</Nav.Link>
          </Nav>
        </Navbar>

        

        <Routes>
          <Route path="/" element={
            <div style={{ padding: '1rem' }}>
              <h2>Welcome to Northwind Corporation</h2>
              <h3>Use the menu to view customers, posts and tools.</h3>
            </div>
          } />

          <Route path="/customers" element={
            <CustomerList setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText} />
          } />

          <Route path="/users" element={
            <UserList setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText} />
          } />

          <Route path="/posts" element={
            <Posts info="Select social media posts from Northwind customers." />
          } />

          <Route path="/laskuri" element={
            <Laskuri />
          } />      

        </Routes>

      </Router>  

      { showMessage && (
          <Message message={messageText} isPositive={isPositiveMessage} />
        )
      } 

    </div>
  )
}

export default App
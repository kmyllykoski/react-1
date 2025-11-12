import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'
import Login from './Login'

import { Navbar } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

const App = () => {

  // App komponentin tilamääritykset
  // Laskuri 
  const [showLaskuri, setShowLaskuri] = useState(false)
  // Message
  const [showMessage, setShowMessage] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [isPositiveMessage, setIsPositiveMessage] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [accesslevelId, setAccesslevelId] = useState(null)
  const [showLogin, setShowLogin] = useState(true)
  const [logoutRequested, setLogoutRequested] = useState(false)

  const huomio = () => {
    alert("Huomio!")
  } 

  // small inline component to perform logout side-effects and show message
  const Logout = () => {
    // Immediately hide the login UI and clear auth state. AuthWatcher
    // (rendered inside the Router) will detect this change and perform
    // the user-visible side-effects (message + redirect) so the UI can
    // update before those side-effects run.
    React.useEffect(() => {
      setShowLogin(false);
      setLoggedInUser(null);
      setAccesslevelId(null);
      setLogoutRequested(true);
      localStorage.clear();
    }, []);

    return null;
  };

  // Watch for login -> logout transition and show the logout message
  // then navigate to home. AuthWatcher must be rendered inside Router so
  // it can use useNavigate.
  const AuthWatcher = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!logoutRequested) return;

      setIsPositiveMessage(true);
      setMessageText('User logged out successfully.');
      setShowMessage(true);

      const t = setTimeout(() => {
        setShowMessage(false);
        // make sure the login form is shown on the home page after redirect
        setShowLogin(true);
        setLogoutRequested(false);
        navigate('/', { replace: true });
      }, 3200);

      return () => clearTimeout(t);
    }, [logoutRequested, navigate]);

    return null;
  };

  return (
    <div className="App">

      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">NWApp</Navbar.Brand>
          <Nav className="mr-auto">
           {loggedInUser && <Nav.Link href="/customers">Customers</Nav.Link>}
           {loggedInUser && <Nav.Link href="/users">Users</Nav.Link>}
           {loggedInUser && <Nav.Link href="/posts">Posts</Nav.Link>}
           {loggedInUser && <Nav.Link href="/laskuri">Laskuri</Nav.Link>}
           {loggedInUser && <Nav.Link href="/logout">Logout</Nav.Link>}          
          </Nav>
        </Navbar>

        {/* AuthWatcher must be inside Router so it can use navigate */}
        <AuthWatcher />

        <Routes>
          <Route
            path="/"
            element={
              !logoutRequested ? (
                <div style={{ padding: '1rem' }}>
                  <h2>Welcome to Northwind Corporation</h2>
                  {loggedInUser && <h3>Use the menu to view customers, posts and tools.</h3>}
                  {!loggedInUser && showLogin && (
                    <>
                      <h3>Please log in to access the application features.</h3>
                      <Login
                        setIsPositiveMessage={setIsPositiveMessage}
                        setShowMessage={setShowMessage}
                        setMessageText={setMessageText}
                        setLoggedInUser={setLoggedInUser}
                        setAccesslevelId={setAccesslevelId}
                      />
                    </>
                  )}
                </div>
              ) : null
            }
          />

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
          <Route path="/logout" element={<Logout />} />
        </Routes>

      </Router>  

      {/* {!loggedInUser && showLogin &&  <Login setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText}
            setLoggedInUser={setLoggedInUser} setAccesslevelId={setAccesslevelId} />} */}

      { showMessage && (
          <Message message={messageText} isPositive={isPositiveMessage} />
        )
      } 

    </div>
  )
}

export default App
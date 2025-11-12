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

import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom'

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

  // check cookies for existing login
  const checkLogin = () => {
    const username = localStorage.getItem("username");
    const accesslevelId = localStorage.getItem("accesslevelId");
    console.log('Found login from localStorage:', username, accesslevelId);
    if (username && accesslevelId) {
      setLoggedInUser(username);
      setAccesslevelId(accesslevelId);
    }
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  // small inline component to perform logout side-effects and show message
  const Logout = () => {
    const navigate = useNavigate();
    if (!logoutRequested) {
      return null; // do nothing if logout not requested
    }

    React.useEffect(() => {
      // clear auth immediately
      setLoggedInUser(null);
      setAccesslevelId(null);
      localStorage.clear();

      // show logout message
      setIsPositiveMessage(true);
      setMessageText('User has successfully logged out.');
      setShowMessage(true);

      // hide message and navigate after 3s
      const t = setTimeout(() => {
        setShowMessage(false);
        setShowLogin(true); // ensure login form is visible on home
        navigate('/', { replace: true });
        setLogoutRequested(false); // reset flag
        console.log('User logged out.');
      }, 3000);

      return () => clearTimeout(t);
    }, [navigate]);

    return null;
  };

  return (
    <div className="App">

      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">NWApp</Navbar.Brand>

          {/* left-side nav */}
          <Nav className="me-auto">
            {loggedInUser && <Nav.Link as={Link} to="/customers">Customers</Nav.Link>}
            {loggedInUser && <Nav.Link as={Link} to="/users">Users</Nav.Link>}
            {loggedInUser && <Nav.Link as={Link} to="/posts">Posts</Nav.Link>}
            {<Nav.Link as={Link} to="/laskuri">Laskuri</Nav.Link>}
          </Nav>

          {/* right-side nav */}
          <Nav className="ms-auto align-items-center">
            {loggedInUser && (
              <>
                {/* display username */}
                <Navbar.Text className="me-3">Logged in as: {loggedInUser}</Navbar.Text>

                <Nav.Link
                  as={Link}
                  to="/logout"
                  onClick={() => setLogoutRequested(true)}
                >
                  Logout
                </Nav.Link>
              </>
            )}
            {!loggedInUser && (
              <Nav.Link as={Link} to="/">Login</Nav.Link>
            )}
          </Nav>

        </Navbar>

        {/* Logout must be inside Router so it can use navigate */}
        <Logout />

        <Routes>
          <Route
            path="/"
            element={
              
                <div style={{ padding: '1rem' }}>
                  <h2>Welcome to Northwind Corporation</h2>
                  {loggedInUser && <h3>Use the menu to view customers, posts and tools.</h3>}
                  {!loggedInUser && showLogin && (
                    <>
                      <h3>Please log in to access all the application features.</h3>
                      <h4>Without logging in you can still use our wonderful Laskuri tool.</h4>
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
              }
            />
          

          <Route path="/customers" element={
            <CustomerList setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText} />
          } />

          <Route path="/users" element={
            <UserList setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText} accesslevelId={accesslevelId} />
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
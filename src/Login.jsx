import './App.css'
import React, { useState } from 'react'
import AxAuth from './services/AxAuth'
import md5 from 'md5'

/* 
{
    [Key]
    public int UserId { get; set; }

    [StringLength(30)]
    public string Firstname { get; set; } = null!;

    [StringLength(30)]
    public string Lastname { get; set; } = null!;

    [StringLength(50)]
    public string? Email { get; set; }

    [StringLength(20)]
    public string Username { get; set; } = null!;

    [StringLength(200)]
    public string Password { get; set; } = null!;

    public int AccesslevelId { get; set; }
}
*/

const Login = ({setIsPositiveMessage, setShowMessage, setMessageText, setLoggedInUser, setAccesslevelId}) => {

  // Komponentin tilan määritys
  // const [newUserId, setNewUserId] = useState('');
  
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const authUser = {
      username: authUsername,
      password: md5(authPassword),
    };

    console.log('Authenticating user:', authUser);

    AxAuth.authenticate(authUser)
      .then(response => {
        // Handle successful authentication
        console.log('User authenticated with data:', response);
        localStorage.setItem('username', response.username);
        localStorage.setItem('accesslevelId', response.accesslevelId);
        localStorage.setItem('token', response.token);
        setLoggedInUser(response.username);
        setAccesslevelId(response.accesslevelId);
        setIsPositiveMessage(true);
        // response should contain created user (with userId)
        // const createdId = response?.userId ?? response?.UserId ?? '';
        setMessageText(`User ${authUser.username} logged in successfully.`);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        
      })
      .catch(error => {
        console.error('Error authenticating user:', error);
        setIsPositiveMessage(false);
        setMessageText(`Failed to authenticate user ${authUser.username}: ${error.message}`);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      });
  }

  // Clear form fields  
  const clearForm = () => {
    setAuthUsername('');
    setAuthPassword('');
  }

  return (
      <div className='loginFormDiv'>
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>
        <table className="table table-borderless login-form-table">
          <tbody>
            <tr>
              <th><label htmlFor="Username">Username</label></th>
              <td>
                <input id="username" type="text" className="form-control" value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)} placeholder="Username" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="Password">Password</label></th>
              <td>
                <input id="password" type="password" className="form-control" value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)} placeholder="Password" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
          <button type="submit" className="btn btn-primary me-2">Login</button>
          <button type="button" className="btn btn-secondary" onClick={() => clearForm()}>Clear</button>
        </div>
      </form>
      </div>
  );
}
  
export default Login
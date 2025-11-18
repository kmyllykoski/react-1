import './App.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AxUsers from './services/AxUsers'
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

const UserAdd = ({setAddUser, setIsPositiveMessage, setShowMessage, setMessageText, 
                setShowUsers, reloadUsers, setReloadUsers, accesslevelId, showTemporaryMessage}) => {

  const location = useLocation();

  // Komponentin tilan määritys
  // const [newUserId, setNewUserId] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newAccesslevelId, setNewAccesslevelId] = useState(2); // Default access level
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Check permission to add users. AccesslevelId should be 1 to have access.
  // This check is not needed since accessing the UserAdd component is already restricted in UserList
  // but kept here for future reference if more refined control is needed.
  useEffect(() => {
    if (accesslevelId == null) return; // wait until prop is available
    if (accesslevelId !== 1) {
      setIsAuthorized(false);
      console.log(`User with accesslevelId ${accesslevelId} tried to add a new user without permission.`);
      setIsPositiveMessage(false);
      setMessageText(`You do not have permission to add new users. Accesslevel is ${accesslevelId}, required is 1.`);
      setShowMessage(true);

      const t = setTimeout(() => {
        setShowMessage(false);
        setShowUsers(true);
        setAddUser(false);
      }, 3000);

      return () => clearTimeout(t);
    }
  }, [accesslevelId, setIsPositiveMessage, setMessageText, setShowMessage, setShowUsers, setAddUser]);

  // Validate that Password and Confirm Password match
  useEffect(() => {   
    const textMismatch = 'Password and Confirm Password do not match.';
    const textMatch = 'Password and Confirm Password match.';
    const textPrompt = 'Please type Confirm Password to validate.';

    // If the user hasn't typed anything into Confirm Password yet,
    // show a persistent prompt asking them to confirm the password.
    if (!newPasswordConfirm) {
      if (typeof showTemporaryMessage === 'function') {
        showTemporaryMessage(textPrompt, false, 0, location.pathname);
      } else {
        setIsPositiveMessage(false);
        setMessageText(textPrompt);
        setShowMessage(true);
      }
      return;
    }

    const confirmLength = newPasswordConfirm.length;
    const passwordStart = newPassword.substring(0, confirmLength);
    if (passwordStart !== newPasswordConfirm) {
      if (typeof showTemporaryMessage === 'function') {
        showTemporaryMessage(textMismatch, false, 0, location.pathname);
      } else {
        setIsPositiveMessage(false);
        setMessageText(textMismatch);
        setShowMessage(true);
      }
    } else {
      if (typeof showTemporaryMessage === 'function') {
        showTemporaryMessage(textMatch, true, 0, location.pathname);
      } else {
        setIsPositiveMessage(true);
        setMessageText(textMatch);
        setShowMessage(true);
      }
    }
  }, [newPassword, newPasswordConfirm, setIsPositiveMessage, setMessageText, setShowMessage, showTemporaryMessage, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      // userId: newUserId,
      firstname: newFirstName,
      lastname: newLastName,
      email: newEmail,
      username: newUsername,
      password: md5(newPassword),
      accesslevelId: Number(newAccesslevelId)
    };

    console.log('Adding user:', newUser);

    AxUsers.create(newUser)
      .then(response => {
        console.log('User added:', response);
        setIsPositiveMessage(true);
        // response should contain created user (with userId)
        const createdId = response?.userId ?? response?.UserId ?? '';
        setMessageText(`User added: userId: ${createdId} ${newUser.firstname} ${newUser.lastname}`);
        setShowMessage(true);
        setReloadUsers(!reloadUsers); // Trigger reload of users in parent component
        setTimeout(() => {
          setShowMessage(false);
          setAddUser(false);
          setShowUsers(true);
        }, 5000);
        
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setIsPositiveMessage(false);
        setMessageText(`Failed to add user ${newUser.firstname} ${newUser.lastname}: ${error.message}`);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 7000);
      });
  }

  if (!isAuthorized) return null;

  return (
    
      <div className='customerFormDiv'>
      <h3>Add New User</h3>

      <form onSubmit={handleSubmit}>
        <table className="customer-form-table">
          <tbody>
            <tr>
              <th><label htmlFor="newFirstName">First Name</label></th>
              <td>
                <input id="firstName" type="text" value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)} placeholder="First Name" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="newLastName">Last Name</label></th>
              <td>
                <input id="lastName" type="text" value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)} placeholder="Last Name" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="newEmail">Email</label></th>
              <td>
                <input id="email" type="email" value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)} placeholder="Email" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="newUsername">Username</label></th>
              <td>
                <input id="username" type="text" value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)} placeholder="Username" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="newPassword">Password</label></th>
              <td>
                <input id="password" type="password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} placeholder="Password" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="newPasswordConfirm">Confirm Password</label></th>
              <td>
                <input id="passwordConfirm" type="password" value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)} placeholder="Confirm Password" />
              </td>
            </tr>

            <tr>
              <th><label htmlFor="newAccesslevelId">Access Level</label></th>
              <td>
                <input id="accesslevelId" type="number" value={newAccesslevelId}
                  onChange={(e) => setNewAccesslevelId(e.target.value)} placeholder="Access Level" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => {setShowMessage(false); setAddUser(false); setShowUsers(true);}}>Cancel</button>
        </div>
      </form>
      </div>
    
  );
}
  
export default UserAdd
import './App.css'
import React, { useState } from 'react'
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

const UserAdd = ({setAddUser, setIsPositiveMessage, setShowMessage, setMessageText, setShowUsers, reloadUsers, setReloadUsers}) => {

  // Komponentin tilan määritys
  // const [newUserId, setNewUserId] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAccesslevelId, setNewAccesslevelId] = useState(2); // Default access level

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
              <th><label htmlFor="newAccesslevelId">Access Level</label></th>
              <td>
                <input id="accesslevelId" type="number" value={newAccesslevelId}
                  onChange={(e) => setNewAccesslevelId(e.target.value)} placeholder="Access Level" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="form-buttons">
          <button type="submit" className='button'>Save</button>
          <button type="button" className='button' onClick={() => {setAddUser(false); setShowUsers(true);}}>Cancel</button>
        </div>
      </form>
      </div>
  );
}
  
export default UserAdd
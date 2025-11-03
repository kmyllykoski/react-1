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

const UserEdit = ({setIsPositiveMessage, setShowMessage, setMessageText, setShowUsers, setEditMode, userToEdit, reloadUsers, setReloadUsers }) => {

  // Local state for editing user details
  const [newFirstName, setNewFirstName] = useState(userToEdit.firstname);
  const [newLastName, setNewLastName] = useState(userToEdit.lastname);
  const [newEmail, setNewEmail] = useState(userToEdit.email ?? '');
  const [newUsername, setNewUsername] = useState(userToEdit.username);
  const [newAccesslevelId, setNewAccesslevelId] = useState(userToEdit.accesslevelId);

  // Password change state
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Submit updated user details (not password)
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: userToEdit.userId ?? userToEdit.userId,
      firstname: newFirstName,
      lastname: newLastName,
      email: newEmail,
      username: newUsername,
      password: userToEdit.password,
      accesslevelId: parseInt(newAccesslevelId)
    };

    console.log('Modifying user:', updatedUser);

    AxUsers.update(updatedUser)
      .then(response => {
        console.log('User modified:', response);
        setIsPositiveMessage(true);
        setMessageText(`User modified: ${updatedUser.firstname} ${updatedUser.lastname}`);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setReloadUsers(!reloadUsers);
          setShowUsers(true);
        }, 3000);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error modifying user:', error);
        setIsPositiveMessage(false);
        setMessageText(`Failed to modify user: ${error.message}`);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
      });
  };

  // Submit new password only (shows only when changePasswordMode === true)
  const handleSubmitOfNewPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setIsPositiveMessage(false);
      setMessageText('Password and Confirm Password do not match.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      return;
    }

    const hashed = md5(newPassword);
    const updatedUser = {
      ...userToEdit,
      password: hashed
    };

    console.log(`Changing password for user ${userToEdit.firstname} ${userToEdit.lastname}`);

    AxUsers.update(updatedUser)
      .then(response => {
        console.log('Password changed:', response);
        setIsPositiveMessage(true);
        setMessageText(`Password changed for user ${userToEdit.firstname} ${userToEdit.lastname}.`);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setChangePasswordMode(false);
          setReloadUsers(!reloadUsers);
          setShowUsers(true);
          setEditMode(false);
        }, 3000);
      })
      .catch(error => {
        console.error('Error changing password:', error);
        setIsPositiveMessage(false);
        setMessageText(`Failed to change password: ${error.message}`);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
      });
  };

  
  // (state variables are declared earlier)

  if (changePasswordMode) {
    return (
      <div className='customerFormDiv'>
        <h3>Change Password for {userToEdit.firstname} {userToEdit.lastname}</h3>
        <form onSubmit={handleSubmitOfNewPassword}>
          <table className="customer-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="newPassword">New Password</label></th>
                <td>
                  <input id="newPassword" type="password" value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                </td>
              </tr>
              <tr>
                <th><label htmlFor="confirmPassword">Confirm Password</label></th>
                <td>
                  <input id="confirmPassword" type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="form-buttons">
            <button type="submit" className='button'>Save</button>
            <button type="button" className='button' onClick={() => {setChangePasswordMode(false)}}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <table className="user-form-table">
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
          <button type="button" className='button' onClick={() => {setChangePasswordMode(true)}}>Change Password</button>
          <button type="button" className='button' onClick={() => {setEditMode(false); setShowUsers(true);}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
  
export default UserEdit
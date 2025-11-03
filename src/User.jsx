import './App.css'
import React, { useState } from 'react'
import UserService from './services/AxUsers'

// Propsina asiakasobjekti
const User = ({user, users, editUser, setMessageText, setShowMessage, setIsPositiveMessage, setUsers, detailUser, setDetailUser}) => {

// Komponentin tilan määritys
// const [showDetails, setShowDetails] = useState(false)

const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete user: ${user.firstname} ${user.lastname}?`)) {

    UserService.remove(user.userId)
    .then(response => {

        console.log('User deleted:', response.status);
        if (response.status === 204) {
            setIsPositiveMessage(true);
            setMessageText(`User deleted: ${user.firstname} ${user.lastname} with response status: ${response.status}`);
            setShowMessage(true);
            // Scroll to top to see the message
            window.scrollTo(0, 0);
            setTimeout(() => {
                setShowMessage(false);
                setUsers(users.filter(c => c.userId !== user.userId));
            }, 7000);
        }
        
        })
    .catch(error => {
        console.error('Error deleting user:', error);
        setIsPositiveMessage(false);

        // Prefer error.response when using axios (server replied with non-2xx)
        // const serverMsg = error?.response?.data ?? error?.message ?? String(error);
        const serverMsg = error?.response?.data
            ? (typeof error.response.data === 'string'
                ? error.response.data.slice(0, 200)
                : JSON.stringify(error.response.data).slice(0, 200))
            : (error?.message ?? String(error)).slice(0, 200);

        setMessageText(`Failed to delete User ${user.firstname} ${user.lastname}: ${serverMsg}`);
        setShowMessage(true);
        // Scroll to top to see the message
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowMessage(false);
        }, 7000);
    });
    }
    else {
        console.log('Deletion cancelled');
        setIsPositiveMessage(false);
        setMessageText(`Deletion cancelled for user ${user.firstname} ${user.lastname}.`);
        setShowMessage(true);
        // Scroll to top to see the message
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowMessage(false);
        }, 7000);
    }
}

  return (
    <div className='customerDiv'>
        {detailUser !== user.userId && <h4 onClick={() => setDetailUser(user.userId)}>{user.firstname} {user.lastname} {user.email} {user.accesslevel}</h4>}

        {detailUser === user.userId && 
          <div className='userDetails'>
            <h3>{user.firstname} {user.lastname}</h3>
            <div className='buttonRow'>
            <button className='buttondelete' onClick={() => handleDelete(user)}>Delete</button>
            <button className='buttonedit' onClick={() => editUser(user)}>Edit</button>
            <button className='buttonclose' onClick={() => setDetailUser(null)}>Close</button>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.accesslevel}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        }
    </div>
  )
}

export default User
import './App.css'
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import AxUsers from './services/AxUsers'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({ setIsPositiveMessage, setShowMessage, setMessageText, accesslevelId, showTemporaryMessage }) => {

// Komponentin tilan määritys
const [users, setUsers] = useState([])
const [showUsers, setShowUsers] = useState(true)
const [addUser, setAddUser] = useState(false)
const [editMode, setEditMode] = useState(false)
const [userToEdit, setUserToEdit] = useState(null)
const [reloadUsers, setReloadUsers] = useState(false)
// const [detailUser, setDetailUser] = useState(null)
const [search, setSearch] = useState("")
const [isAuthorized, setIsAuthorized] = useState(false);

// Check permission to view users. AccesslevelId should be 1 to have permission.
// UserAdd.jsx has similar check for adding users if more refined control is needed.
  const location = useLocation();
  useEffect(() => {
    if (accesslevelId == null) return; // wait until prop is available
    if (accesslevelId !== 1) {
      setIsAuthorized(false);
      console.log(`User with accesslevelId ${accesslevelId} tried to view users without permission.`);
      const text = `You do not have permission to view users. Your accesslevel is ${accesslevelId}, required is 1.`;
      if (typeof showTemporaryMessage === 'function') {
        // pass the origin path so the message will persist while the user
        // remains on this route but will be cleared immediately if they
        // navigate away before the timeout expires.
        showTemporaryMessage(text, false, 3000, location.pathname);
      } else {
        setIsPositiveMessage(false);
        setMessageText(text);
        setShowMessage(true);
        const t = setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        return () => clearTimeout(t);
      }
    }
    else {
      setIsAuthorized(true);
    }
  }, [accesslevelId, location.key, setIsPositiveMessage, setMessageText, setShowMessage, setShowUsers, setAddUser]);

useEffect(() => {
  AxUsers.getUsers()
    .then(users => {
      setUsers(users)
    })
},[reloadUsers]  // reload when users are added or deleted
)

const editUser = (user) => {
    setUserToEdit(user);
    setEditMode(true);
    // setDetailUser("");
}

const deleteUser = (userId) => {
    if (window.confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
      AxUsers.remove(userId)
        .then(() => {
          setUsers(users.filter(u => u.userId !== userId));
          setIsPositiveMessage(true);
          setMessageText(`User with ID: ${userId} deleted successfully.`);
        })
        .catch(error => {
          setShowMessage(true);
          setIsPositiveMessage(false);
          setMessageText(`Error deleting user with ID: ${userId}.`);
        });
    }
}

const handleSearchChange = (e) => {
  setSearch(e.target.value);           // keep raw value in state
  // setShowUsers(true);
}

// safe filtered array (always returns all users when search empty/whitespace)
const filteredUsers = (users || []).filter(u => {
  const lastname = (u?.lastname || '').toLowerCase();
  const q = (search || '').trim().toLowerCase();
  return q === '' || lastname.includes(q);
});
  if (!isAuthorized) return null;
  return (
    <>
        {!addUser && !editMode &&
        <h4>
          Users from MSSQLExpress with Axios
          <span className='user-count'> (Count: {filteredUsers.length})</span>
        </h4>
        }
        
        <div className="controls">
            {!addUser && !editMode &&
            <button
                className='btn btn-success btn-sm'
                onClick={(e) => { e.stopPropagation(); setAddUser(true); }}
            >Add User
            </button>
            }
        </div>
        
        <div className="controls">
            {!addUser && !editMode &&
                <input
                type="text"
                className="search-input"
                placeholder="Search Users by lastname..."
                value={search}
                onChange={handleSearchChange}
                // onFocus={() => setShowUsers(true)}   /* show list on focus only */
                // onClick={(e) => e.stopPropagation()}     /* prevent header click from toggling list */
                />
            }
        </div>

        {addUser && <UserAdd setAddUser={setAddUser} setIsPositiveMessage={setIsPositiveMessage}
        setShowMessage={setShowMessage} setMessageText={setMessageText} setShowUsers={setShowUsers} 
        reloadUsers={reloadUsers} setReloadUsers={setReloadUsers} accesslevelId={accesslevelId} />}

        {editMode && <UserEdit setEditMode={setEditMode} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage}
         setMessageText={setMessageText} userToEdit={userToEdit} setUserToEdit={setUserToEdit} reloadUsers={reloadUsers} setReloadUsers={setReloadUsers} 
         setShowUsers={setShowUsers} />}

        

        {showUsers && !editMode && !addUser && filteredUsers.length > 0 && (
          <div className="table-responsive mb-3">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Accesslevel</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.userId}>
                    <td>{u.userId}</td>
                    <td>{u.firstname}</td>
                    <td>{u.lastname}</td>
                    <td>{u.email}</td>
                    <td>{u.accesslevelId}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" title="Edit" aria-label={`Edit ${u.firstname} ${u.lastname}`} onClick={() => editUser(u)}>
                          <i className="bi bi-pencil" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Delete" aria-label={`Delete ${u.firstname} ${u.lastname}`} onClick={() => deleteUser(u.userId)}>
                          <i className="bi bi-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  )
}

export default UserList
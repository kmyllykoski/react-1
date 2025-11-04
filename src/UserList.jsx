import './App.css'
import React, {useState, useEffect} from 'react'
import AxUsers from './services/AxUsers'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({ setIsPositiveMessage, setShowMessage, setMessageText }) => {

// Komponentin tilan määritys
const [users, setUsers] = useState([])
const [showUsers, setShowUsers] = useState(true)
const [addUser, setAddUser] = useState(false)
const [editMode, setEditMode] = useState(false)
const [userToEdit, setUserToEdit] = useState(null)
const [reloadUsers, setReloadUsers] = useState(false)
// const [detailUser, setDetailUser] = useState(null)
const [search, setSearch] = useState("")

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
      AxUsers.deleteUser(userId)
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

  return (
    <>
        <h4>
          Users from MSSQLExpress with Axios
          <span className='user-count'> (Count: {filteredUsers.length})</span>
        </h4>
        
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
        reloadUsers={reloadUsers} setReloadUsers={setReloadUsers} />}

        {editMode && <UserEdit setEditMode={setEditMode} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage}
         setMessageText={setMessageText} userToEdit={userToEdit} reloadUsers={reloadUsers} setReloadUsers={setReloadUsers} 
         setShowUsers={setShowUsers} />}

        

        {showUsers && !editMode && !addUser && filteredUsers.length > 0 && (
          <div className="table-responsive">
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
                      <button className="btn btn-sm btn-primary me-2" onClick={() => editUser(u)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u.userId)}>Delete</button>
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
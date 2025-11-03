import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/AxUsers'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({ setIsPositiveMessage, setShowMessage, setMessageText }) => {

// Komponentin tilan määritys
const [users, setUsers] = useState([])
const [showUsers, setShowUsers] = useState(false)
const [addUser, setAddUser] = useState(false)
const [editMode, setEditMode] = useState(false)
const [userToEdit, setUserToEdit] = useState(null)
// const [reloadUsers, setReloadUsers] = useState(false)
const [detailUser, setDetailUser] = useState(null)
const [search, setSearch] = useState("")

useEffect(() => {
  UserService.getUsers()
    .then(users => {
      setUsers(users)
    })
},[addUser]
)

const editUser = (user) => {
    setUserToEdit(user);
    setEditMode(true);
    setDetailUser("");
}

const handleSearchChange = (e) => {
  setSearch(e.target.value);           // keep raw value in state
  setShowUsers(true);
}

// safe filtered array (always returns all users when search empty/whitespace)
const filteredUsers = (users || []).filter(u => {
  const name = (u?.name || '').toLowerCase();
  const q = (search || '').trim().toLowerCase();
  return q === '' || name.includes(q);
});

  return (
    <>
        <h4>
          Users from MSSQLExpress with Axios
          <span className='user-count'> (Count: {filteredUsers.length})</span>
        </h4>
        
        <div className="controls">
            <button
            className='btn btn-outline-primary btn-sm btn-toggle'
            onClick={(e) => { e.stopPropagation(); setShowUsers(!showUsers); }}
            >
            {showUsers ? 'Hide' : 'Show'} Users
            </button>

            {!addUser && !editMode &&
            <button
                className='btn btn-success btn-sm'
                onClick={(e) => { e.stopPropagation(); setAddUser(true); }}
            >
                Add User
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
                onFocus={() => setShowUsers(true)}   /* show list on focus only */
                onClick={(e) => e.stopPropagation()}     /* prevent header click from toggling list */
                />
            }
        </div>

        {addUser && <UserAdd setAddUser={setAddUser} setIsPositiveMessage={setIsPositiveMessage}
        setShowMessage={setShowMessage} setMessageText={setMessageText} setShowUsers={setShowUsers} setDetailUser={setDetailUser} />}

        {editMode && <UserEdit setEditMode={setEditMode} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage}
         setMessageText={setMessageText} userToEdit={userToEdit} users={users} setUsers={setUsers} />}

        {showUsers && !editMode && !addUser && filteredUsers.map(u =>
           <User key={u.userId} user={u} editUser={editUser} users={users} setMessageText={setMessageText}
           setShowMessage={setShowMessage} setIsPositiveMessage={setIsPositiveMessage} setUsers={setUsers}
           detailUser={detailUser} setDetailUser={setDetailUser} />
        )}
    </>
  )
}

export default UserList
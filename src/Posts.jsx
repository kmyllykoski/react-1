import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Viestit'

const Posts = ({ info }) => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
  CustomerService.getPosts()
    .then(posts => {
      setPosts(posts)
    })
},[]
)

  return (
    <>  <h2>{info}</h2>

        {posts.map(p =>

            <div className='posts' key={p.id}>

            <h3>{p.title}</h3>
            
             <div className="post-meta">
              <span className="post-id">Post ID: {p.id}</span>
              <span className="user-id">User ID: {p.userId}</span>
            </div>
            
            <p>{p.body}</p>
            
            </div>
            )
        }

    </>
  )
}

export default Posts
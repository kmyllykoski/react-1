import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muutetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
        <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2>

        {showPosts && posts && posts.map(p =>

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
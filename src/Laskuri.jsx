import './App.css'
import React, {useState} from 'react'

// Propsi otettu vastaan suoraan nimellä
const Laskuri = () => {

// Komponentin tilan määritys
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>{luku}</h3>

        <button onClick={() => setLuku(luku + 1)}>+</button>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <button onClick={() => setLuku(0)}>Reset</button>

    </>
  )
}

export default Laskuri
import './App.css'
import React, {useState} from 'react'

// Propsi otettu vastaan suoraan nimellä
const Laskuri = () => {

// Komponentin tilan määritys
const [luku, setLuku] = useState(0)

// return JSX

  return (
    <>
        <h4 className="mb-3 text-center">{luku}</h4>

        <div className="d-flex gap-2 justify-content-center">
          <button type="button" className="btn btn-success btn-eq" onClick={() => setLuku(luku + 1)}>+</button>
          <button type="button" className="btn btn-danger btn-eq" onClick={() => setLuku(luku - 1)}>-</button>
          <button type="button" className="btn btn-secondary" onClick={() => setLuku(0)}>Reset</button>
        </div>

    </>
  )
}

export default Laskuri
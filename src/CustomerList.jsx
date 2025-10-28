import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customers'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = () => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [addCustomer, setAddCustomer] = useState(false)

useEffect(() => {
  CustomerService.getCustomers()
    .then(customers => {
      setCustomers(customers)
    })
},[addCustomer]
)

  return (
    <>
        <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers from MSSQLExpress with Axios

        {!addCustomer && <button className='button' onClick={() => setAddCustomer(true)}>Add Customer</button> }</h2>

        {addCustomer && <CustomerAdd setAddCustomer={setAddCustomer} />}

        {showCustomers && customers && customers.map(c =>

           <Customer key={c.customerId} customer={c} />
        )
        }

    </>
  )
}

export default CustomerList
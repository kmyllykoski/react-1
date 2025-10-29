import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customers'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({ setIsPositiveMessage, setShowMessage, setMessageText }) => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [addCustomer, setAddCustomer] = useState(false)
const [reloadCustomers, setReloadCustomers] = useState(false)

useEffect(() => {
  CustomerService.getCustomers()
    .then(customers => {
      setCustomers(customers)
    })
},[addCustomer, reloadCustomers]
)

  return (
    <>
        <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers from MSSQLExpress with Axios

        {!addCustomer && <button className='button' onClick={() => setAddCustomer(true)}>Add Customer</button> }</h2>

        {addCustomer && <CustomerAdd setAddCustomer={setAddCustomer} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage} setMessageText={setMessageText} />}

        {showCustomers && customers && customers.map(c =>

           <Customer key={c.customerId} customer={c} customers={customers} setMessageText={setMessageText} setShowMessage={setShowMessage} setIsPositiveMessage={setIsPositiveMessage} setCustomers={setCustomers} />
        )
        }

    </>
  )
}

export default CustomerList
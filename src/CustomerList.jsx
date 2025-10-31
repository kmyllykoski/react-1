import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customers'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({ setIsPositiveMessage, setShowMessage, setMessageText }) => {

// Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [addCustomer, setAddCustomer] = useState(false)
const [editMode, setEditMode] = useState(false)
const [customerToEdit, setCustomerToEdit] = useState(null)
// const [reloadCustomers, setReloadCustomers] = useState(false)
const [detailCustomer, setDetailCustomer] = useState(null)

useEffect(() => {
  CustomerService.getCustomers()
    .then(customers => {
      setCustomers(customers)
    })
},[addCustomer]
)

const editCustomer = (customer) => {
    setCustomerToEdit(customer);
    setEditMode(true);
}

  return (
    <>
        <h2 onClick={() => setShowCustomers(!showCustomers)}>Customers from MSSQLExpress with Axios

        {!addCustomer && <button className='button' onClick={() => setAddCustomer(true)}>Add Customer</button> }</h2>

        {addCustomer && <CustomerAdd setAddCustomer={setAddCustomer} setIsPositiveMessage={setIsPositiveMessage} 
        setShowMessage={setShowMessage} setMessageText={setMessageText} />}

        {editMode && <CustomerEdit setEditMode={setEditMode} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage}
         setMessageText={setMessageText} customerToEdit={customerToEdit} customers={customers} setCustomers={setCustomers} />}

        {showCustomers && customers && customers.map(c =>

           <Customer key={c.customerId} customer={c} editCustomer={editCustomer} customers={customers} setMessageText={setMessageText} 
           setShowMessage={setShowMessage} setIsPositiveMessage={setIsPositiveMessage} setCustomers={setCustomers}
           detailCustomer={detailCustomer} setDetailCustomer={setDetailCustomer} />
        )
        }

    </>
  )
}

export default CustomerList
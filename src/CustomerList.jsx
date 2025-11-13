import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/AxCustomers'
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
const [search, setSearch] = useState("")

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
    setDetailCustomer("");
}

const handleSearchChange = (e) => {
  setSearch(e.target.value);           // keep raw value in state
  setShowCustomers(true);
}

// safe filtered array (always returns all customers when search empty/whitespace)
const filteredCustomers = (customers || []).filter(c => {
  const name = (c?.companyName || '').toLowerCase();
  const q = (search || '').trim().toLowerCase();
  return q === '' || name.includes(q);
});

  return (
    <>
        <h4>
          Northwind Customers
          <span className='customer-count'> (Count: {filteredCustomers.length})</span>
        </h4>
        
        <div className="controls">
          {!addCustomer && !editMode &&
            <button
            className='btn btn-outline-primary btn-sm btn-toggle'
            onClick={(e) => { e.stopPropagation(); setShowCustomers(!showCustomers); }}
            >
            {showCustomers ? 'Hide' : 'Show'} Customers
            </button>
            }
            
            {!addCustomer && !editMode &&
            <button
                className='btn btn-success btn-sm'
                onClick={(e) => { e.stopPropagation(); setAddCustomer(true); }}
            >
                Add Customer
            </button>
            }
        </div>
        
        <div className="controls">
            {!addCustomer && !editMode &&
                <input
                type="text"
                className="search-input"
                placeholder="Search customers by name..."
                value={search}
                onChange={handleSearchChange}
                onFocus={() => setShowCustomers(true)}   /* show list on focus only */
                onClick={(e) => e.stopPropagation()}     /* prevent header click from toggling list */
                />
            }
        </div>

        {addCustomer && <CustomerAdd setAddCustomer={setAddCustomer} setIsPositiveMessage={setIsPositiveMessage} 
        setShowMessage={setShowMessage} setMessageText={setMessageText} setShowCustomers={setShowCustomers} setDetailCustomer={setDetailCustomer} />}

        {editMode && <CustomerEdit setEditMode={setEditMode} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage}
         setMessageText={setMessageText} customerToEdit={customerToEdit} customers={customers} setCustomers={setCustomers} />}

        {showCustomers && !editMode && !addCustomer && filteredCustomers.map(c =>
           <Customer key={c.customerId} customer={c} editCustomer={editCustomer} customers={customers} setMessageText={setMessageText}
           setShowMessage={setShowMessage} setIsPositiveMessage={setIsPositiveMessage} setCustomers={setCustomers}
           detailCustomer={detailCustomer} setDetailCustomer={setDetailCustomer} setShowCustomers={setShowCustomers} />
        )}
    </>
  )
}

export default CustomerList
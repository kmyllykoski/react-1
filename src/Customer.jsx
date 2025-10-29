import './App.css'
import React, { useState } from 'react'
import CustomerService from './services/Customers'

// Propsina asiakasobjekti
const Customer = ({customer, customers, setMessageText, setShowMessage, setIsPositiveMessage, setCustomers}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const handleDelete = (customer) => {
    if (window.confirm(`Are you sure you want to delete customer: ${customer.companyName}?`)) {

    CustomerService.remove(customer.customerId)
    .then(response => {
        
        console.log('Customer deleted:', response.status);
        if (response.status === 204) {
            setIsPositiveMessage(true);
            setMessageText(`Customer deleted: ${customer.companyName} with response status: ${response.status}`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setCustomers(customers.filter(c => c.customerId !== customer.customerId));
            }, 7000);
        }
        // alert(`Customer deleted: ${customer.companyName} with response status: ${response.status}`);
        // Update customer list in parent component
        // You might need to lift the state up or use a state management solution
        
        })
    .catch(error => {
        console.error('Error deleting customer:', error);
        setIsPositiveMessage(false);

        // Prefer error.response when using axios (server replied with non-2xx)
        // const serverMsg = error?.response?.data ?? error?.message ?? String(error);
        const serverMsg = error?.response?.data
            ? (typeof error.response.data === 'string'
                ? error.response.data.slice(0, 200)
                : JSON.stringify(error.response.data).slice(0, 200))
            : (error?.message ?? String(error)).slice(0, 200);

        setMessageText(`Failed to delete customer ${customer.companyName}: ${serverMsg}`);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 7000);
    });
    }
    else {
        console.log('Deletion cancelled');
        setIsPositiveMessage(false);
        setMessageText(`Deletion cancelled for customer ${customer.companyName}.`);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    }
}

  return (
    <div className='customerDiv'>
        <h4 onClick={() => setShowDetails(!showDetails)}>{customer.companyName}</h4>

        {showDetails && 
          <div className='customerDetails'>
            <h3>{customer.companyName}</h3>
            <button className='buttondelete' onClick={() => handleDelete(customer)}>Delete</button>
            <button className='buttonedit' onClick={() => alert(`Editing customer: ${customer.companyName}`)}>Edit</button>
            <button className='buttonclose' onClick={() => setShowDetails(false)}>Close</button>
            <table>
                <thead>
                    <tr>
                    <th>Contact Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{customer.contactName}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>{customer.city}</td>
                    <td>{customer.country}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        }
    </div>
  )
}

export default Customer
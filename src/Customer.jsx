import './App.css'
import React, { useState } from 'react'
import CustomerService from './services/AxCustomers'

// Propsina asiakasobjekti
const Customer = ({customer, customers, editCustomer, setMessageText, setShowMessage, setIsPositiveMessage,
                 setCustomers, detailCustomer, setDetailCustomer, setShowCustomers}) => {

// Komponentin tilan määritys
// const [showDetails, setShowDetails] = useState(false)

const handleDelete = (customer) => {
    if (window.confirm(`Are you sure you want to delete customer: ${customer.companyName}?`)) {

    CustomerService.remove(customer.customerId)
    .then(response => {
        
        console.log('Customer deleted:', response.status);
        if (response.status === 204) {
            setShowCustomers(false);
            window.scrollTo(0, 0);
            setIsPositiveMessage(true);
            setMessageText(`Customer deleted: ${customer.companyName} with response status: ${response.status}`);
            setShowMessage(true);
           
            setTimeout(() => {
                setShowMessage(false);
                setCustomers(customers.filter(c => c.customerId !== customer.customerId));
                setShowCustomers(true);
            }, 7000);
        }
        // alert(`Customer deleted: ${customer.companyName} with response status: ${response.status}`);
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
        // Scroll to top to see the message
        window.scrollTo(0, 0);
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
        // Scroll to top to see the message
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowMessage(false);
        }, 7000);
    }
}

    return (
        <div className='customerDiv mb-3'>
                {detailCustomer !== customer.customerId && (
                    <h4 className="mb-2" style={{cursor: 'pointer'}} onClick={() => setDetailCustomer(customer.customerId)}>{customer.companyName}</h4>
                )}

                {detailCustomer === customer.customerId && (
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                    <h5 className="card-title">{customer.companyName}</h5>
                                </div>
                            </div>

                            <div className="table-responsive mt-3">
                                <table className="table table-striped table-sm mb-0">
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

                            <div className="d-flex gap-2 justify-content-end mt-3">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => editCustomer(customer)} title="Edit" aria-label={`Edit ${customer.companyName}`}>
                                    <i className="bi bi-pencil" aria-hidden="true"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(customer)} title="Delete" aria-label={`Delete ${customer.companyName}`}>
                                    <i className="bi bi-trash" aria-hidden="true"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setDetailCustomer(null)} title="Close" aria-label="Close details">
                                    <i className="bi bi-x-lg" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Customer
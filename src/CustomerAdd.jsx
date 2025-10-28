import './App.css'
import React, { useState } from 'react'
import CustomerService from './services/Customers'

/* 
public partial class Customer
    [Key]
    [Column("CustomerID")]
    [StringLength(5)]
    public string CustomerId { get; set; } = null!;

    [StringLength(40)]
    public string CompanyName { get; set; } = null!;

    [StringLength(30)]
    public string? ContactName { get; set; }

    [StringLength(30)]
    public string? ContactTitle { get; set; }

    [StringLength(60)]
    public string? Address { get; set; }

    [StringLength(15)]
    public string? City { get; set; }

    [StringLength(15)]
    public string? Region { get; set; }

    [StringLength(10)]
    public string? PostalCode { get; set; }

    [StringLength(15)]
    public string? Country { get; set; }

    [StringLength(24)]
    public string? Phone { get; set; }

    [StringLength(24)]
    public string? Fax { get; set; }
*/

const CustomerAdd = ({setAddCustomer}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalCode: newPostalCode,
            country: newCountry,
            phone: newPhone,
            fax: newFax
        };
        
        CustomerService.create(newCustomer)
        .then(response => {
        console.log('Customer added:', response);
        alert(`Customer added: ${newCustomer.customerId}`);
        setAddCustomer(false);
        })
        .catch(error => {
        console.error('Error adding customer:', error);
        alert('Failed to add customer.');
        });
    }
    
    // Komponentin tilan määritys
    const [newCustomerId, setNewCustomerId] = useState('');
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newContactName, setNewContactName] = useState('');
    const [newContactTitle, setNewContactTitle] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newRegion, setNewRegion] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newFax, setNewFax] = useState('');

    return (
        <div className='customerAddDiv'>
        <h3>Add New Customer</h3>

        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newCustomerId} 
                onChange={(e) => setNewCustomerId(e.target.value)} placeholder="ID with 5 capital letters" maxLength={5} minLength={5} /><br />
            </div>
            <div>
                <input type="text" value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} placeholder="Company Name" /><br />
            </div>
            <div>
                <input type="text" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} placeholder="Contact Name" /><br />
            </div>
            <div>
            <input type="text" value={newContactTitle} onChange={(e) => setNewContactTitle(e.target.value)} placeholder="Contact Title" /><br />
            </div>
            <div>
                <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Address" /><br />
            </div>
            <div>
                <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="City" /><br />
            </div>
            <div>
                <input type="text" value={newRegion} onChange={(e) => setNewRegion(e.target.value)} placeholder="Region" /><br />
            </div>
            <div>
                <input type="text" value={newPostalCode} onChange={(e) => setNewPostalCode(e.target.value)} placeholder="Postal Code" /><br />
            </div>
            <div>
                <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} placeholder="Country" /><br />
            </div>
            <div>
                <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="Phone" /><br />
            </div>
            <div>
                <input type="text" value={newFax} onChange={(e) => setNewFax(e.target.value)} placeholder="Fax" /><br />
            </div>
            <div>
                <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="City" /><br />
            </div>
            <div>
                <input type="text" value={newRegion} onChange={(e) => setNewRegion(e.target.value)} placeholder="Region" /><br />
            </div>
            <div>
                <input type="text" value={newPostalCode} onChange={(e) => setNewPostalCode(e.target.value)} placeholder="Postal Code" /><br />
            </div>
            <div>
                <input type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} placeholder="Country" /><br />
            </div>
            <div>
                <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="Phone" /><br />
            </div>
            <div>
                <input type="text" value={newFax} onChange={(e) => setNewFax(e.target.value)} placeholder="Fax" /><br />
            </div>
            <button type="submit" className='button'>Add Customer</button>
            <button type="button" className='button' onClick={() => setAddCustomer(false)}>Cancel</button>
        </form>
        </div>
    )
}

export default CustomerAdd
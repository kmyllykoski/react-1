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

const CustomerEdit = ({setEditMode, setIsPositiveMessage, setShowMessage, setMessageText, customerToEdit, customers, setCustomers}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedCustomer = {
            customerId: updatedCustomerId,
            companyName: updatedCompanyName,
            contactName: updatedContactName,
            contactTitle: updatedContactTitle,
            address: updatedAddress,
            city: updatedCity,
            region: updatedRegion,
            postalCode: updatedPostalCode,
            country: updatedCountry,
            phone: updatedPhone,
            fax: updatedFax
        };

        CustomerService.update(updatedCustomer)
        .then(response => {
            console.log('Customer updated:', response);
            // alert(`Customer added: ${newCustomer.customerId}`);
            // update customer list in parent component
            setCustomers(customers.map(c => c.customerId === updatedCustomer.customerId ? updatedCustomer : c));

            setIsPositiveMessage(true);
            setMessageText(`Customer updated: ${updatedCustomer.customerId}`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            setEditMode(false);
            })
            
        .catch(error => {
            console.error('Error updating customer:', error);
            setIsPositiveMessage(false);
            setMessageText(`Failed to update customer ${updatedCustomer.customerId}.`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 7000);
            });
        }
    // Komponentin tilan määritys
    const [updatedCustomerId, setUpdatedCustomerId] = useState(customerToEdit.customerId);
    const [updatedCompanyName, setUpdatedCompanyName] = useState(customerToEdit.companyName);
    const [updatedContactName, setUpdatedContactName] = useState(customerToEdit.contactName);
    const [updatedContactTitle, setUpdatedContactTitle] = useState(customerToEdit.contactTitle);
    const [updatedAddress, setUpdatedAddress] = useState(customerToEdit.address);
    const [updatedCity, setUpdatedCity] = useState(customerToEdit.city);
    const [updatedRegion, setUpdatedRegion] = useState(customerToEdit.region);
    const [updatedPostalCode, setUpdatedPostalCode] = useState(customerToEdit.postalCode);
    const [updatedCountry, setUpdatedCountry] = useState(customerToEdit.country);
    const [updatedPhone, setUpdatedPhone] = useState(customerToEdit.phone);
    const [updatedFax, setUpdatedFax] = useState(customerToEdit.fax);

    return (
        <div className='customerFormDiv'>
        <h3>Edit Customer</h3>

        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={updatedCustomerId} disabled /><br />
            </div>
            <div>
                <input type="text" value={updatedCompanyName} onChange={(e) => setUpdatedCompanyName(e.target.value)} placeholder="Company Name" /><br />
            </div>
            <div>
                <input type="text" value={updatedContactName} onChange={(e) => setUpdatedContactName(e.target.value)} placeholder="Contact Name" /><br />
            </div>
            <div>
            <input type="text" value={updatedContactTitle} onChange={(e) => setUpdatedContactTitle(e.target.value)} placeholder="Contact Title" /><br />
            </div>
            <div>
                <input type="text" value={updatedAddress} onChange={(e) => setUpdatedAddress(e.target.value)} placeholder="Address" /><br />
            </div>
            <div>
                <input type="text" value={updatedCity} onChange={(e) => setUpdatedCity(e.target.value)} placeholder="City" /><br />
            </div>
            <div>
                <input type="text" value={updatedRegion} onChange={(e) => setUpdatedRegion(e.target.value)} placeholder="Region" /><br />
            </div>
            <div>
                <input type="text" value={updatedPostalCode} onChange={(e) => setUpdatedPostalCode(e.target.value)} placeholder="Postal Code" /><br />
            </div>
            <div>
                <input type="text" value={updatedCountry} onChange={(e) => setUpdatedCountry(e.target.value)} placeholder="Country" /><br />
            </div>
            <div>
                <input type="text" value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} placeholder="Phone" /><br />
            </div>
            <div>
                <input type="text" value={updatedFax} onChange={(e) => setUpdatedFax(e.target.value)} placeholder="Fax" /><br />
            </div>
            <div>
                <input type="text" value={updatedCity} onChange={(e) => setUpdatedCity(e.target.value)} placeholder="City" /><br />
            </div>
            <div>
                <input type="text" value={updatedRegion} onChange={(e) => setUpdatedRegion(e.target.value)} placeholder="Region" /><br />
            </div>
            <div>
                <input type="text" value={updatedPostalCode} onChange={(e) => setUpdatedPostalCode(e.target.value)} placeholder="Postal Code" /><br />
            </div>
            <div>
                <input type="text" value={updatedCountry} onChange={(e) => setUpdatedCountry(e.target.value)} placeholder="Country" /><br />
            </div>
            <div>
                <input type="text" value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} placeholder="Phone" /><br />
            </div>
            <div>
                <input type="text" value={updatedFax} onChange={(e) => setUpdatedFax(e.target.value)} placeholder="Fax" /><br />
            </div>
            <button type="submit" className='button'>Save Customer</button>
            <button type="button" className='button' onClick={() => setEditMode(false)}>Cancel</button>
        </form>
        </div>
    )
}

export default CustomerEdit
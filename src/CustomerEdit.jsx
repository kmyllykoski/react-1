import './App.css'
import React, { useState } from 'react'
import CustomerService from './services/AxCustomers'

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

    // Scroll to top when component loads
    window.scrollTo(0, 0);

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
    const [updatedRegion, setUpdatedRegion] = useState(customerToEdit.region || '');
    const [updatedPostalCode, setUpdatedPostalCode] = useState(customerToEdit.postalCode);
    const [updatedCountry, setUpdatedCountry] = useState(customerToEdit.country);
    const [updatedPhone, setUpdatedPhone] = useState(customerToEdit.phone);
    const [updatedFax, setUpdatedFax] = useState(customerToEdit.fax);

    return (
        <div className='customerFormDiv card my-3'>
          <div className="card-body">
            <h3 className="card-title">Edit Customer</h3>

            <form onSubmit={handleSubmit}>
              <table className="table table-borderless customer-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="customerId">ID</label></th>
                <td>
                  <input id="customerId" type="text" className="form-control" value={updatedCustomerId} disabled />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="companyName">Company</label></th>
                <td>
                  <input id="companyName" type="text" className="form-control" value={updatedCompanyName}
                    onChange={(e) => setUpdatedCompanyName(e.target.value)} placeholder="Company Name" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="contactName">Contact</label></th>
                <td>
                  <input id="contactName" type="text" className="form-control" value={updatedContactName}
                    onChange={(e) => setUpdatedContactName(e.target.value)} placeholder="Contact Name" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="contactTitle">Title</label></th>
                <td>
                  <input id="contactTitle" type="text" className="form-control" value={updatedContactTitle}
                    onChange={(e) => setUpdatedContactTitle(e.target.value)} placeholder="Contact Title" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="address">Address</label></th>
                <td>
                  <input id="address" type="text" className="form-control" value={updatedAddress}
                    onChange={(e) => setUpdatedAddress(e.target.value)} placeholder="Address" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="city">City</label></th>
                <td>
                  <input id="city" type="text" className="form-control" value={updatedCity}
                    onChange={(e) => setUpdatedCity(e.target.value)} placeholder="City" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="region">Region</label></th>
                <td>
                  <input id="region" type="text" className="form-control" value={updatedRegion}
                    onChange={(e) => setUpdatedRegion(e.target.value)} placeholder="Region" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="postalCode">Postal Code</label></th>
                <td>
                  <input id="postalCode" type="text" className="form-control" value={updatedPostalCode}
                    onChange={(e) => setUpdatedPostalCode(e.target.value)} placeholder="Postal Code" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="country">Country</label></th>
                <td>
                  <input id="country" type="text" className="form-control" value={updatedCountry}
                    onChange={(e) => setUpdatedCountry(e.target.value)} placeholder="Country" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="phone">Phone</label></th>
                <td>
                  <input id="phone" type="text" className="form-control" value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)} placeholder="Phone" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="fax">Fax</label></th>
                <td>
                  <input id="fax" type="text" className="form-control" value={updatedFax}
                    onChange={(e) => setUpdatedFax(e.target.value)} placeholder="Fax" />
                </td>
              </tr>
            </tbody>
              </table>

              <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
                <button type="submit" className="btn btn-sm btn-outline-primary" title="Save" aria-label="Save customer">
                  <i className="bi bi-check-lg" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" title="Cancel" aria-label="Cancel edit" onClick={() => setEditMode(false)}>
                  <i className="bi bi-x-lg" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default CustomerEdit
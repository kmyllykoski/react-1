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

const CustomerAdd = ({setAddCustomer, setIsPositiveMessage, setShowMessage, setMessageText, setShowCustomers, setDetailCustomer}) => {

     // Scroll to top when component loads
    window.scrollTo(0, 0);

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
            // alert(`Customer added: ${newCustomer.customerId}`);
            setIsPositiveMessage(true);
            setMessageText(`Customer added: ${newCustomer.customerId}`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setShowCustomers(true);
            }, 5000);
            setAddCustomer(false);
            setDetailCustomer("");   
            })
            
        .catch(error => {
            console.error('Error adding customer:', error);
            setIsPositiveMessage(false);
            setMessageText(`Failed to add customer ${newCustomer.customerId}.`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 7000);
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
        <div className='customerFormDiv card my-3'>
          <div className="card-body">
            <h3 className="card-title">Add New Customer</h3>

            <form onSubmit={handleSubmit}>
              <table className="table table-borderless customer-form-table">
                <tbody>
                  <tr>
                    <th><label htmlFor="customerId">ID</label></th>
                    <td>
                      <input id="customerId" type="text" className="form-control" value={newCustomerId}
                        onChange={(e) => setNewCustomerId(e.target.value)}
                        placeholder="ID with 5 capital letters" maxLength={5} minLength={5} />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="companyName">Company</label></th>
                    <td>
                      <input id="companyName" type="text" className="form-control" value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)} placeholder="Company Name" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="contactName">Contact</label></th>
                    <td>
                      <input id="contactName" type="text" className="form-control" value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)} placeholder="Contact Name" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="contactTitle">Title</label></th>
                    <td>
                      <input id="contactTitle" type="text" className="form-control" value={newContactTitle}
                        onChange={(e) => setNewContactTitle(e.target.value)} placeholder="Contact Title" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="address">Address</label></th>
                    <td>
                      <input id="address" type="text" className="form-control" value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)} placeholder="Address" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="city">City</label></th>
                    <td>
                      <input id="city" type="text" className="form-control" value={newCity}
                        onChange={(e) => setNewCity(e.target.value)} placeholder="City" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="region">Region</label></th>
                    <td>
                      <input id="region" type="text" className="form-control" value={newRegion}
                        onChange={(e) => setNewRegion(e.target.value)} placeholder="Region" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="postalCode">Postal Code</label></th>
                    <td>
                      <input id="postalCode" type="text" className="form-control" value={newPostalCode}
                        onChange={(e) => setNewPostalCode(e.target.value)} placeholder="Postal Code" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="country">Country</label></th>
                    <td>
                      <input id="country" type="text" className="form-control" value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)} placeholder="Country" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="phone">Phone</label></th>
                    <td>
                      <input id="phone" type="text" className="form-control" value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)} placeholder="Phone" />
                    </td>
                  </tr>

                  <tr>
                    <th><label htmlFor="fax">Fax</label></th>
                    <td>
                      <input id="fax" type="text" className="form-control" value={newFax}
                        onChange={(e) => setNewFax(e.target.value)} placeholder="Fax" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
                <button type="submit" className="btn btn-sm btn-outline-success" title="Add customer" aria-label="Add customer">
                  <i className="bi bi-plus-lg" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" title="Cancel" aria-label="Cancel" onClick={() => {setAddCustomer(false); setDetailCustomer(null); setShowCustomers(true);}}>
                  <i className="bi bi-x-lg" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default CustomerAdd
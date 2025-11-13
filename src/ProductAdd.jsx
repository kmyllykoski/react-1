import './App.css'
import React, { useState } from 'react'
import ProductService from './services/AxProducts'

// {
//     "productId": 1,
//     "productName": "Chai",
//     "supplierId": 1,
//     "categoryId": 1,
//     "quantityPerUnit": "10 boxes x 20 bags",
//     "unitPrice": 18,
//     "unitsInStock": 39,
//     "unitsOnOrder": 0,
//     "reorderLevel": 10,
//     "discontinued": false,
//     "rpaprocessed": "X",
//     "category": null,
//     "orderDetails": [],
//     "supplier": null
//  }

const ProductAdd = ({setAddProduct, setIsPositiveMessage, setShowMessage, setMessageText, setShowProducts, setDetailProduct}) => {

     // Scroll to top when component loads
    window.scrollTo(0, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            // productId: newProductId,  // ProductID is identity column in database, no need to set it here
            productName: newProductName,
            supplierId: 1,  // Default supplierId
            categoryId: 1,  // Default categoryId
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: 0,  // Default value
            reorderLevel: newUnitsInStock > 10 ? 10 : newUnitsInStock + 5, // Default value
            discontinued: false,  // Default value
            rpaprocessed: "X",  // Default value
            category: null,   // Default value
            orderDetails: [], // Default value
            supplier: null  // Default value
        };
        
        ProductService.create(newProduct)
        .then(response => {
            console.log('Product added:', response);
            // alert(`Product added: ${newProduct.productId}`);
            setIsPositiveMessage(true);
            setMessageText(`Product added: ${newProduct.productName}`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setShowProducts(true);
            }, 5000);
            setAddProduct(false);
            setDetailProduct("");   
            })
            
        .catch(error => {
            console.error('Error adding product:', error);
            setIsPositiveMessage(false);
            setMessageText(`Failed to add product ${newProduct.productName}.`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 7000);
            });
        }
    // Komponentin tilan määritys
    // const [newProductId, setNewProductId] = useState(''); // ProductID is identity column in database, no need to set it here
    const [newProductName, setNewProductName] = useState('');
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('');
    const [newUnitPrice, setNewUnitPrice] = useState('');
    const [newUnitsInStock, setNewUnitsInStock] = useState('');
    
    return (
        <div className='productFormDiv card my-3'>
          <div className="card-body">
            <h3 className="card-title">Add New Product</h3>

            <form onSubmit={handleSubmit}>
              <table className="table table-borderless product-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="productName">Product name</label></th>
                <td>
                  <input id="productName" type="text" className="form-control" value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Product name" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="quantityPerUnit">Quantity Per Unit</label></th>
                <td>
                  <input id="quantityPerUnit" type="text" className="form-control" value={newQuantityPerUnit}
                    onChange={(e) => setNewQuantityPerUnit(e.target.value)} placeholder="Quantity Per Unit" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="unitPrice">Unit Price</label></th>
                <td>
                  <input id="unitPrice" type="text" className="form-control" value={newUnitPrice}
                    onChange={(e) => setNewUnitPrice(e.target.value)} placeholder="Unit Price" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="unitsInStock">Units In Stock</label></th>
                <td>
                  <input id="unitsInStock" type="text" className="form-control" value={newUnitsInStock}
                    onChange={(e) => setNewUnitsInStock(e.target.value)} placeholder="Units In Stock" />
                </td>
              </tr>
            </tbody>
              </table>

              <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
                <button type="submit" className="btn btn-sm btn-outline-success" title="Add product" aria-label="Add product">
                  <i className="bi bi-plus-lg" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" title="Cancel" aria-label="Cancel" onClick={() => {setAddProduct(false); setDetailProduct(null); setShowProducts(true);}}>
                  <i className="bi bi-x-lg" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default ProductAdd
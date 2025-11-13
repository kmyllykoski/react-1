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

const ProductEdit = ({setEditMode, setIsPositiveMessage, setShowMessage, setMessageText, productToEdit, products, setProducts}) => {

    // Scroll to top when component loads
    window.scrollTo(0, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId: productToEdit.productId,  // ProductID is identity column in database, no need to update it here
            productName: updatedProductName,
            supplierId: 1,  // Default supplierId
            categoryId: 1,  // Default categoryId
            quantityPerUnit: updatedQuantityPerUnit,
            unitPrice: updatedUnitPrice,
            unitsInStock: updatedUnitsInStock,
            unitsOnOrder: 0,  // Default value
            reorderLevel: updatedUnitsInStock > 10 ? 10 : updatedUnitsInStock + 5, // Default value
            discontinued: false,  // Default value
            rpaprocessed: "X",  // Default value
            category: null,   // Default value
            orderDetails: [], // Default value
            supplier: null  // Default value
        };

        ProductService.update(updatedProduct)
        .then(response => {
            console.log('Product updated:', response);
            setProducts(products.map(p => p.productId === updatedProduct.productId ? updatedProduct : p));

            setIsPositiveMessage(true);
            setMessageText(`Product updated: ${updatedProduct.productName}`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            setEditMode(false);
            })
            
        .catch(error => {
            console.error('Error updating product:', error);
            setIsPositiveMessage(false);
            setMessageText(`Failed to update product ${updatedProduct.productName}.`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 7000);
            });
        }
    // Komponentin tilan määritys
    // const [updatedProductId, setUpdatedProductId] = useState(productToEdit.productId); // ProductID is not editable
    const [updatedProductName, setUpdatedProductName] = useState(productToEdit.productName);
    const [updatedQuantityPerUnit, setUpdatedQuantityPerUnit] = useState(productToEdit.quantityPerUnit);
    const [updatedUnitPrice, setUpdatedUnitPrice] = useState(productToEdit.unitPrice);
    const [updatedUnitsInStock, setUpdatedUnitsInStock] = useState(productToEdit.unitsInStock);

    return (
        <div className='productFormDiv card my-3'>
          <div className="card-body">
            <h3 className="card-title">Edit Product</h3>

            <form onSubmit={handleSubmit}>
              <table className="table table-borderless product-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="productName">Name</label></th>
                <td>
                  <input id="productName" type="text" className="form-control" value={updatedProductName} onChange={(e) => setUpdatedProductName(e.target.value)} />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="QuantityPerUnit">Quantity Per Unit</label></th>
                <td>
                  <input id="quantityPerUnit" type="text" className="form-control" value={updatedQuantityPerUnit}
                    onChange={(e) => setUpdatedQuantityPerUnit(e.target.value)} placeholder="Quantity Per Unit" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="unitPrice">Unit Price</label></th>
                <td>
                  <input id="unitPrice" type="text" className="form-control" value={updatedUnitPrice}
                    onChange={(e) => setUpdatedUnitPrice(e.target.value)} placeholder="Unit Price" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="unitsInStock">Units In Stock</label></th>
                <td>
                  <input id="unitsInStock" type="text" className="form-control" value={updatedUnitsInStock}
                    onChange={(e) => setUpdatedUnitsInStock(e.target.value)} placeholder="Units In Stock" />
                </td>
              </tr>
            </tbody>
              </table>

              <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
                <button type="submit" className="btn btn-sm btn-outline-primary" title="Save" aria-label="Save product">
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

export default ProductEdit
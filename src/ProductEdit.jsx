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
            productId: updatedProductId,  // ProductID is identity column in database, no need to set it here
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
        <div className='productFormDiv'>
        <h3>Edit Product</h3>

        <form onSubmit={handleSubmit}>
          <table className="product-form-table">
            <tbody>
              <tr>
                <th><label htmlFor="productName">Name</label></th>
                <td>
                  <input id="productName" type="text" value={updatedProductName} onChange={(e) => setUpdatedProductName(e.target.value)} />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="QuantityPerUnit">Quantity Per Unit</label></th>
                <td>
                  <input id="quantityPerUnit" type="text" value={updatedQuantityPerUnit}
                    onChange={(e) => setUpdatedQuantityPerUnit(e.target.value)} placeholder="Quantity Per Unit" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="unitPrice">Unit Price</label></th>
                <td>
                  <input id="unitPrice" type="text" value={updatedUnitPrice}
                    onChange={(e) => setUpdatedUnitPrice(e.target.value)} placeholder="Unit Price" />
                </td>
              </tr>

              <tr>
                <th><label htmlFor="unitsInStock">Units In Stock</label></th>
                <td>
                  <input id="unitsInStock" type="text" value={updatedUnitsInStock}
                    onChange={(e) => setUpdatedUnitsInStock(e.target.value)} placeholder="Units In Stock" />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex gap-2 justify-content-center flex-wrap my-3">
            <button type="submit" className="btn btn-primary me-2">Save Product</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
        </div>
    )
}

export default ProductEdit
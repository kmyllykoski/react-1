import './App.css'
import React, { useState } from 'react'
import ProductService from './services/AxProducts'

// Propsina tuoteobjekti
const Product = ({product, products, editProduct, setMessageText, setShowMessage, setIsPositiveMessage,
                 setProducts, detailProduct, setDetailProduct, setShowProducts}) => {

// Komponentin tilan määritys
// const [showDetails, setShowDetails] = useState(false)

const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete product: ${product.productName}?`)) {

    ProductService.remove(product.productId)
    .then(response => {
        
        console.log('Product deleted:', response.status);
        if (response.status === 204) {
            setShowProducts(false);
            window.scrollTo(0, 0);
            setIsPositiveMessage(true);
            setMessageText(`Product deleted: ${product.productName} with response status: ${response.status}`);
            setShowMessage(true);
           
            setTimeout(() => {
                setShowMessage(false);
                setProducts(products.filter(p => p.productId !== product.productId));
                setShowProducts(true);
            }, 7000);
        }
        
        })
    .catch(error => {
        console.error('Error deleting product:', error);
        setIsPositiveMessage(false);

        // Prefer error.response when using axios (server replied with non-2xx)
        // const serverMsg = error?.response?.data ?? error?.message ?? String(error);
        const serverMsg = error?.response?.data
            ? (typeof error.response.data === 'string'
                ? error.response.data.slice(0, 200)
                : JSON.stringify(error.response.data).slice(0, 200))
            : (error?.message ?? String(error)).slice(0, 200);

        setMessageText(`Failed to delete product ${product.productName}: ${serverMsg}`);
        setShowMessage(true);
        // Scroll to top to see the message
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowMessage(false);
        }, 6000);
    });
    }
    else {
        console.log('Deletion cancelled');
        setIsPositiveMessage(false);
        setMessageText(`Deletion cancelled for product ${product.productName}.`);
        setShowMessage(true);
        // Scroll to top to see the message
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowMessage(false);
        }, 7000);
    }
}

  return (
    <div className='productDiv'>
        {detailProduct !== product.productId && <h4 onClick={() => setDetailProduct(product.productId)}>{product.productName}</h4>}

        {detailProduct === product.productId && 
          <div className='productDetails'>
            <h3>{product.productName}</h3>
            <div className='buttonRow'>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product)}>Delete</button>
            <button className="btn btn-sm btn-primary" onClick={() => editProduct(product)}>Edit</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setDetailProduct(null)}>Close</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity per unit</th>
                        <th>Unit price</th>
                        <th>Units in stock</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.productName}</td>
                        <td>{product.quantityPerUnit}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.unitsInStock}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        }
    </div>
  )
}

export default Product
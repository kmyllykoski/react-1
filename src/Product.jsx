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
        <div className='productDiv mb-3'>
            {detailProduct !== product.productId && (
                <h5 className="mb-2" style={{cursor: 'pointer'}} onClick={() => setDetailProduct(product.productId)}>
                    {product.productName}
                </h5>
            )}

            {detailProduct === product.productId && (
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                                <h4 className="card-title">{product.productName}</h4>
                            </div>
                        </div>

                        <div className="table-responsive mt-3">
                            <table className="table table-striped table-sm mb-0">
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

                        <div className="d-flex gap-2 justify-content-end mt-3">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => editProduct(product)} title="Edit" aria-label={`Edit ${product.productName}`}>
                                <i className="bi bi-pencil" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product)} title="Delete" aria-label={`Delete ${product.productName}`}>
                                <i className="bi bi-trash" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => setDetailProduct(null)} title="Close" aria-label="Close details">
                                <i className="bi bi-x-lg" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product
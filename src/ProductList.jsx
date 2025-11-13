import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/AxProducts'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({ setIsPositiveMessage, setShowMessage, setMessageText }) => {

// Komponentin tilan määritys
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [addProduct, setAddProduct] = useState(false)
const [editMode, setEditMode] = useState(false)
const [productToEdit, setProductToEdit] = useState(null)
// const [reloadCustomers, setReloadCustomers] = useState(false)
const [detailProduct, setDetailProduct] = useState(null)
const [search, setSearch] = useState("")

useEffect(() => {
  CustomerService.getProducts()
    .then(products => {
      setProducts(products)
    })
},[addProduct]
)

const editProduct = (product) => {
    setProductToEdit(product);
    setEditMode(true);
    setDetailProduct("");
}

const handleSearchChange = (e) => {
  setSearch(e.target.value);           // keep raw value in state
  setShowProducts(true);
}

// safe filtered array (always returns all customers when search empty/whitespace)
const filteredProducts = (products || []).filter(p => {
  const name = (p?.productName || '').toLowerCase();
  const q = (search || '').trim().toLowerCase();
  return q === '' || name.includes(q);
});

  return (
    <>
        <h4>
          Products from MSSQLExpress with Axios
          <span className='product-count'> (Count: {filteredProducts.length})</span>
        </h4>
        
        <div className="controls">
          {!addProduct && !editMode &&
            <button
            className='btn btn-outline-primary btn-sm btn-toggle'
            onClick={(e) => { e.stopPropagation(); setShowProducts(!showProducts); }}
            >
            {showProducts ? 'Hide' : 'Show'} Products
            </button>
            }
            
            {!addProduct && !editMode &&
            <button
                className='btn btn-success btn-sm'
                onClick={(e) => { e.stopPropagation(); setAddProduct(true); }}
            >
                Add Product
            </button>
            }
        </div>
        
        <div className="controls">
            {!addProduct && !editMode &&
                <input
                type="text"
                className="search-input"
                placeholder="Search products by name..."
                value={search}
                onChange={handleSearchChange}
                onFocus={() => setShowProducts(true)}   /* show list on focus only */
                onClick={(e) => e.stopPropagation()}     /* prevent header click from toggling list */
                />
            }
        </div>

        {addProduct && <ProductAdd setAddProduct={setAddProduct} setIsPositiveMessage={setIsPositiveMessage} 
        setShowMessage={setShowMessage} setMessageText={setMessageText} setShowProducts={setShowProducts} setDetailProduct={setDetailProduct} />}

        {editMode && <ProductEdit setEditMode={setEditMode} setIsPositiveMessage={setIsPositiveMessage} setShowMessage={setShowMessage}
         setMessageText={setMessageText} productToEdit={productToEdit} products={products} setProducts={setProducts} />}
        {showProducts && !editMode && !addProduct && filteredProducts.map(p =>
           <Product key={p.productId} product={p} editProduct={editProduct} products={products} setMessageText={setMessageText}
           setShowMessage={setShowMessage} setIsPositiveMessage={setIsPositiveMessage} setProducts={setProducts}
           detailProduct={detailProduct} setDetailProduct={setDetailProduct} setShowProducts={setShowProducts} />
        )}
    </>
  )
}

export default ProductList
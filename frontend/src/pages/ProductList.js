import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../redux/productsSlice';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    return (
        <div>
            <h1>Product Listing</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import "../styles/ProductList.css"

type ProductListProps = {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
            {products.map(product => (
                <ProductCard product={product} />
            ))}
        </div>
  )
}

export default ProductList;

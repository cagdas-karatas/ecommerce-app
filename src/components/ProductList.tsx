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
      {products.length > 0 ? products.map(product => (
        <ProductCard product={product} />
      )) : "Getirilecek ürün bulunamadı"}
    </div>
  )
}

export default ProductList;

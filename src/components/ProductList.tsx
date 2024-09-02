import React, { useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import "../styles/ProductList.css"
import ProductCardForStore from './ProductCardForStore';
import { useNavigate } from 'react-router-dom';

type ProductListProps = {
  products: Product[];
  fetchForSeller: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, fetchForSeller }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? products.map(product => (
        fetchForSeller ? <ProductCardForStore product={product}/> : <ProductCard product={product} />
      )) : "Getirilecek ürün bulunamadı"}
    </div>
  )
}

export default ProductList;

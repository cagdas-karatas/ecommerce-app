import React from 'react';
import { Product } from '../types';
import "../styles/ProductCard.css";

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <div className="image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-page-content">
                <h3>{product.title}</h3>
                <p className='description'>{product.description}</p>
                <p className='price'>Price: ${product.price}</p>
                <p className='rating'>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
        </div>
    );
}

export default ProductCard;
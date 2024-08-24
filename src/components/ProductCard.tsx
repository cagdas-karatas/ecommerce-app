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
                <img src={"http://localhost:5212/Images/" + product.imageUrl} alt={product.productName} />
            </div>
            <div className="product-page-content">
                <h3>{product.productName}</h3>
                <p className='description'>{product.productDescription}</p>
                <p className='price'>Price: ₺{product.price}</p>
                {product.rate ?
                <p className='rating'>Rating: {product.rate} ({product.countOfReviews} reviews)</p> : 
                <p className='rating'>Henüz yorum yapılmadı</p>}
                
            </div>
        </div>
    );
}

export default ProductCard;
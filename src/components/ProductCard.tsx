import React from 'react';
import { Product } from '../types';
import "../styles/ProductCard.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product-details`, { state: { product } });
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="image">
                <img src={"http://localhost:5212/images/" + product.imageName} alt={product.productName} />
            </div>
            <div className="product-page-content">
                <h3>{product.productName}</h3>
                <p className='price'>Price: ₺{product.price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
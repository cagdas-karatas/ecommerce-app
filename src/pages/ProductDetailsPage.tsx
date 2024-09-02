import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(location && location.state)
    {
        setLoading(false);
    }
  }, [location]);

  if(loading)
  {
    return <div>Ürün bulunamadı</div>
  }

  const { product } = location.state as { product: Product };

  return (
    <div className="product-details-page-wrapper">
      <div className="image">
        <img src={"http://localhost:5212/images/" + product.imageName} alt={product.productName} />
      </div>
      <div className="details-content">
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        <p>Price: ₺{product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
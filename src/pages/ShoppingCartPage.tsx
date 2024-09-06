import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/ShoppingCartPage.css";
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Product } from '../types';

const ShoppingCartPage: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    if (user && user.user) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5212/api/ShoppingCart?u_id=" + user.user.userId)
      .then(
        response => {
          setProductData(response.data);
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
  }, [loading]);

  const handleDelete = (productId: number) => {
    axios.delete(`http://localhost:5212/api/ShoppingCart/clear?p_id=${productId}&u_id=${user.user.userId}`)
    .then(
      response => {
        alert("Ürün sepetinizden silindi");
        setProductData(productData.filter(product => product.productId !== productId));
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }

  const handleClearCart = () => {
    axios.delete("http://localhost:5212/api/ShoppingCart/clear?u_id=" + user.user.userId)
    .then(
      response => {
        alert("Sepet başarıyla temizlendi");
        setProductData([]);
      }
    )
    .catch(
      err => {
        console.log(err);
      }
    );
  }

  if (loading) {
    return <div>Yükleniyor</div>;
  }

  return (
    <div className='shopping-cart-page-wrapper'>
      <div className="row">
        <h2>Sepetim</h2>
        <button className='delete-button' onClick={handleClearCart}>
          <DeleteIcon />
        </button>
      </div>
      <div className="product-list">
        {
          productData.length > 0
            ? productData.map((product, index) => (
              <div className="product-row">
                <img src={`http://localhost:5212/images/${product.imageName}`} />
                <div className="product-name">{product.productName}</div>
                <div className="price">{product.price} ₺</div>
                <div className="delete-button" onClick={()=>handleDelete(product.productId)}>
                  <DeleteIcon />
                </div>
              </div>
            ))
            : <div className="product-row">Sepetiniz boş</div>
        }
      </div>
    </div>
  );
}

export default ShoppingCartPage;

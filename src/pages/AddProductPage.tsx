import React, { useState } from 'react';
import "../styles/AddProductPage.css"
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { error } from 'console';

const AddProductPage: React.FC = () => {
  const { user } = useUser();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0.00);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = () => {
    const productData = {
      productName: productName,
      sellerName: user.userName,
      productDescription: description,
      productCategory: category,
      price: price,
      imageUrl: imageUrl,
    }

    axios.post("http://localhost:5212/api/Product", productData).then(
      response => {
        alert("ürün başarıyla eklendi");
      }
    ).catch(
      err => {
        if (err.response?.data?.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat();
          const combinedErrors = errorMessages.join('\n');
          alert(combinedErrors);
        } else {
          alert(err.response?.data || 'An error occurred');
        }
      }
    );
  }

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" onChange={(e) => { setProductName(e.target.value) }} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Product Category</label>
          <input type="text" onChange={(e) => { setCategory(e.target.value) }} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" onChange={(e) => { setPrice(parseFloat(e.target.value)) }} />
        </div>
      </div>
      <div className="form-group">
        <label>Product Description</label>
        <textarea rows={4} onChange={(e) => { setDescription(e.target.value) }} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" onChange={(e) => { setImageUrl(e.target.value) }} />
        </div>
      </div>
      <button className="submit-btn" onClick={() => handleSave()}>Add Product</button>
    </div>
  );
};

export default AddProductPage;

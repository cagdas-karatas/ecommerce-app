import React from 'react';
import "../styles/AddProductPage.css"
import { useUser } from '../contexts/UserContext';

const AddProductPage: React.FC = () => {
  const { user } = useUser();

  const handleSave = ()=>{}

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Product Category</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" step="0.01" />
        </div>
      </div>
      <div className="form-group">
        <label>Product Description</label>
        <textarea rows={4}></textarea>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" />
        </div>
      </div>
      <button className="submit-btn">Add Product</button>
    </div>
  );
};

export default AddProductPage;

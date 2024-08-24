import React, { useState } from 'react';
import "../styles/AddProductPage.css"
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { error } from 'console';

const AddProductPage: React.FC = () => {
  const { user } = useUser();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null | undefined>();
  const [file, setFile] = useState<File>();

  const handleSave = () => {
    if(imageUrl == ""){
      alert("Ürün görseli seçiniz");
    } else {
      const productData = new FormData();
    productData.append('productName', productName);
    productData.append('sellerName', user.userName);
    productData.append('productDescription', description);
    productData.append('productCategory', category);
    productData.append('price', price.toString());
    productData.append('imageUrl', imageUrl);
    if (file) {
      productData.append('imageFile', file);
    }

    axios.post("http://localhost:5212/api/Product", productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(
      response => {
        alert("ürün başarıyla eklendi");
      }
    ).catch(
      err => {
        if (err.response?.data?.errors) {
          const errorMessages = Object.values(err.response.data.errors);
          const combinedErrors = errorMessages.join('\n');
          alert(combinedErrors);
        } else {
          console.log(err);
        }
      }
    );
    }
  }

  const showPreview = (file: File | undefined) => {
    if(file)
    {
      const reader = new FileReader();
      reader.onload = x => {
        setFile(file);
        setImageUrl(file.name);
        setImageSrc(x.target?.result);
      }
      reader.readAsDataURL(file);
    }
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
          <input type="file" id="uploader" accept="image/*" onChange={(e) => showPreview(e.target.files?.[0])} />
          <label htmlFor='uploader' id='uploadButton'>Upload Image</label>
        </div>
        <div className="form-group">
          <a>{imageUrl == "" ? "Dosya seçilmedi" : imageUrl}</a>
        </div>
      </div>
      <button className="submit-btn" onClick={() => handleSave()}>Add Product</button>
      <img src={imageSrc as (string | undefined)} alt="selected" />
    </div>
  );
};

export default AddProductPage;

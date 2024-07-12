import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProd = () => {
  const navigate = useNavigate(); // Move this to the top level
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    ProductName: '',
    TargetPestType: 'General',
    ProductUnitPrice: '',
  });

  const {ProductID} = useParams();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('ProdImage', image);
    formData.append('ProductName', data.ProductName);
    formData.append('TargetPestType', data.TargetPestType);
    formData.append('ProductUnitPrice', Number(data.ProductUnitPrice));

    try {
      const response = await axios.put('http://localhost:8081/updateprod/'+ProductID, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setData({
          ProductName: '',
          TargetPestType: 'General',
          ProductUnitPrice: ''
        });
        setImage(null);
        toast.success('Product updated successfully!');
        navigate('/products'); // Use navigate here
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='add'>
      <h2>Update Product</h2>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.ProductName}
            type="text"
            name="ProductName"
            placeholder="Type Here"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Target Pest Type</p>
            <select
              onChange={onChangeHandler}
              name="TargetPestType"
              value={data.TargetPestType}
            >
              <option value="General">General</option>
              <option value="Insect">Insect</option>
              <option value="Rodent">Rodent</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Unit Price</p>
            <input
              onChange={onChangeHandler}
              value={data.ProductUnitPrice}
              type="number"
              name="ProductUnitPrice"
              placeholder="PHP00.00"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">UPDATE</button>
      </form>
    </div>
  );
};

export default UpdateProd;

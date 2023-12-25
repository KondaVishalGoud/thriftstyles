import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";

import API_URL from "../constants";
import './AddProduct.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const handleApi = () => {
        if (!pname || !pdesc || !price || !category || !pimage || !pimage2) {
            // If any field is empty, display "Enter all fields" toast
            toast.error('Please enter all fields.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            return;
          }
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2);
            formData.append('userId', localStorage.getItem('userId'));
    
            const url = API_URL + '/add-product';
            axios.post(url, formData)
            .then((res) => {
              if (res.data.message) {
                // Success toast for successful product addition
                toast.success('Product added for sale', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 1500,
                });
                // navigate('/');
              }
            })
            .catch((err) => {
              console.error('Server error:', err);
              // Error toast for server error during product addition
              toast.error('Server error. Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
              });
            });
        });
    }
    
    

    return (
        <div  >
            <Header />
            <div className="container d-flex align-items-center vh-50">
      <div className="form-container mx-auto">
        <h2>SELL PRODUCT HERE</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={pname}
              onChange={(e) => setpname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Product Description
            </label>
            <input
              type="text"
              className="form-control"
              id="productDescription"
              value={pdesc}
              onChange={(e) => setpdesc(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Product Price
            </label>
            <input
              type="text"
              className="form-control"
              id="productPrice"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Product Category
            </label>
            <select
              className="form-control"
              id="productCategory"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="productImage"
              onChange={(e) => setpimage(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productSecondImage" className="form-label">
              Product Second Image
            </label>
            <input
              type="file"
              className="form-control"
              id="productSecondImage"
              onChange={(e) => setpimage2(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <button type="button" onClick={handleApi} className="btn btn-primary">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
            <Footer />
        </div>
    )
}

export default AddProduct;

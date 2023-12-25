// LikedProducts.jsx

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LikedProducts() {
    const navigate = useNavigate()
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);
    

    useEffect(() => {
        const url = API_URL + '/liked-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
        // Check if search is empty
        if (!search.trim()) {
            // Display a toast error message
            toast.error('Enter an item to find.', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
    
        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                // Display a toast error message for server errors
                toast.error('Server Error. Please try again later.', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
            });
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category === value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }
    
   // ...

   const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      // Display toast message for login requirement
      toast.warning('Please Login/Signup first!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      return;
    }

    const url = `${API_URL}/cart-product`;
    const data = { userId, productId };

    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          // Display toast message
          toast.success('Added to Cart!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500});
        }
      })
      .catch((err) => {
        console.error('Server Err.', err);
        alert('Server Err.');
      });
  };

// ...


const handleRemoveItem = (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('userId');

    if (!userId) {
        // Display toast message for login requirement
        toast.warning('Please Login/Signup first!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
        return;
    }

    // Make a request to the server to remove the product
    axios.post(API_URL + '/delete', { userId, productId })
        .then((res) => {
            // If the server removal is successful, update the state with the new cart data
            window.location.reload();
            setproducts(res.data.products);
            navigate('/');

            // Notify the user of successful removal
            toast.success('Item Removed from Database');
        })
        .catch((err) => {
            console.error('Error removing item from database:', err);

            // Check if there's a response from the server with an error message
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(`Failed to remove item from database. ${err.response.data.message}`);
            } else {
                toast.error('Failed to remove item from database. Please try again.');
            }
        });

    // Update the client-side state to immediately reflect the removal
    const updatedProducts = cproducts.filter(item => item._id !== productId);
    setcproducts(updatedProducts);

    // Notify the user of immediate removal (optional)
    toast.success('Item Removed');
};



    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3 ">
                                {/* <button style={{ width: '50px' }} onClick={(e) => handleRemoveItem(item._id,e)} className="icon-con">
              <FaTrashAlt size={20} className="icons" />
            </button> */}

                                <img width="350px" height="350px" src={API_URL + '/' + item.pimage} />
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                {/* <p className="m-2 text-success"> {item.pdesc} </p> */}
                                <button style={{ width: '50px' }} onClick={(e) => handleAddToCart(item._id, e)} className="icons-con">
                                    <FaCartPlus size={20} className="icon" />
                                </button>
                            </div>
                        )
                    })}
            </div>

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3 ">
                                {/* <button style={{ width: '50px' }} onClick={(e) => handleRemoveItem(item._id,e)} className="icon-con">
              <FaTrashAlt size={20} className="icons" />
            </button> */}

                                <img width="350px" height="350px" src={API_URL + '/' + item.pimage} />
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                {/* <p className="m-2 text-success"> {item.pdesc} </p> */}
                                <button style={{ width: '50px' }} onClick={(e) => handleAddToCart(item._id, e)} className="icons-con">
                                    <FaCartPlus size={20} className="icon" />
                                </button>
                            </div>
                        )
                    })}
            </div>

            <ToastContainer />
            {/* <div className="d-flex justify-content-center">
                <h2>Total Cost: Rs.{calculateTotalPrice()}/-</h2>
            </div> */}
            {/* Checkout Button */}
            {/* <div className="d-flex justify-content-center">
                <Link to="/check-out">
                    <button className="chk-btn">Checkout</button>
                </Link>
            </div> */}
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default LikedProducts;

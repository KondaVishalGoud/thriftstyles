import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import './Header.css'
import './Footer.css'
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart,FaCartPlus } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryPage() {
    

    const navigate = useNavigate()

    const param = useParams()
    console.log(param);

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/get-products?catName=' + param.catName;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [param])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
      // Check if search is empty
      // if (!search.trim()) {
          // Display a toast error message
      //     toast.error('Enter an item to find.', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      //     return;
      // }
  
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

        // let filteredProducts = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        //         item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        //         item.category.toLowerCase().includes(search.toLowerCase())) {
        //         return item;
        //     }
        // })
        // setcproducts(filteredProducts)

    

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId, e) => {
        e.stopPropagation();
        const userId = localStorage.getItem('userId');
    
        if (!userId) {
          // Display toast message for login requirement
          toast.warning('Please Login/Signup first!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
          return;
        }
    
        const url = `${API_URL}/like-product`;
        const data = { userId, productId };
    
        axios.post(url, data)
          .then((res) => {
            if (res.data.message) {
              // Display toast message
              toast.success('Liked!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500});
            }
          })
          .catch((err) => {
            console.error('Server Err.', err);
            alert('Server Err.');
          });
      };
    
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

    const handleProduct = (id) => {
        navigate('/product/' + id)
    }

    return (
        
        <div >        
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts &&
                <h5> SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
                </h5>}
                

                {issearch && <div className="d-flex justify-content-center flex-wrap">
        {cproducts && products.length > 0 &&
          cproducts.map((item, index) => {
            return (
              <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
               
                {/* <div onClick={(e) => handleAddToCart(item._id, e)} className="icon-con">
                  <FaCartPlus className="icons" />
                </div> */}
                <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                  <FaHeart className="icons"  />
                </div>
                <img width="350px" height="350px" src={API_URL + '/' + item.pimage} />
                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                <p className="m-2"> {item.pname}  | {item.category} </p>
                {/* <p className="m-2 text-success"> {item.pdesc} </p> */}
                <button style={{ width: '50px' }} onClick={(e) => handleAddToCart(item._id, e)} className="icons-con">
                    <FaCartPlus size={20} className="icon" />
                </button>
              </div>
            )
          })}
      </div>}

      {!issearch && <div className="d-flex justify-content-center flex-wrap">
        {products && products.length > 0 &&
          products.map((item, index) => {
            return (
              <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                
                {/* <div onClick={(e) => handleAddToCart(item._id, e)} className="icon-con">
                  <FaCartPlus className="icons" />
                </div> */}
               <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
                  <FaHeart className="icons"  />
                </div>
                <img width="350px" height="350px" src={API_URL + '/' + item.pimage} />
                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                <p className="m-2"> {item.pname}  | {item.category} </p>
                {/* <p className="m-2 text-success"> {item.pdesc} </p> */}
                <button style={{ width: '50px' }} onClick={(e) => handleAddToCart(item._id, e)}className="icons-con">
                    <FaCartPlus size={20} className="icon" />
                </button>
              </div>
            )
          })}
      </div>}
      <ToastContainer />
      <Footer />
        </div>
    )
}

export default CategoryPage;
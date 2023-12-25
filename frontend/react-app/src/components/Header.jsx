import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useState } from 'react';

function Header(props) {
  const [showOver, setshowOver] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };
  

  return (
    <div className="m-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">  <img
          src="/6.png"
          alt=""
          style={{
            width: "300px",
            height: "60px",
          }}
        /></Link>
         <div className="search-container d-flex ">
        <input
          className="search form-control"
          type="text"
          placeholder="Find your style"
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => props.handleClick && props.handleClick()}
        >
          <FaSearch style={{ color: "#000000" }} size={22} />
        </button>
      </div>

      {/* <button  type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"> */}
            {/* <span className="navbar-toggler-icon"></span>  */}
            {/* <FaUser size={30} /> */}
          {/* </button> */}

          <div className="navbar-nav ms-auto" >
              <div className="nav-item dropdown" >
                <div
                  onClick={() => {
                    setshowOver(!showOver);
                  }}
                  className="nav-link dropdown-toggle user-icon"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUser size={30} />
                </div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    background: '#eee',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: 1,
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#778899',
                    borderRadius: '7px'
                }}>
                     {!!localStorage.getItem("token") && (
                <Link to="/add-product" >
                <button className="logout-btn"> SELL </button>
                </Link>
            )}
                     <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn"> MY PRODUCTS  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> WISHLIST  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/carted-products">
                                <button className="logout-btn"> CART </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/check-out">
                                <button className="logout-btn"> CHECKOUT </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-profile">
                                <button className="logout-btn"> MY PROFILE  </button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login">  LOGIN </Link> :
                            <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
                            </div>
                            </div>
                  
                
                }
                
              </div>
            </div>
          
          {/* <div className="collapse navbar-collapse" id="navbarCollapse"> */}
            {/* <div className="navbar-nav"> */}
              {/* <Link to="/" className="nav-item nav-link active">HOME</Link>
              <Link to="/my-profile" className="nav-item nav-link">PROFILE</Link>
              <Link to="/liked-products" className="nav-item nav-link">WISHLIST</Link>
              <Link to="/carted-products" className="nav-item nav-link">WISHLIST</Link> */}
              {/* <Link to="/reports" className="nav-item nav-link disabled" tabIndex="-1">Reports</Link> */}
            {/* </div> */}
            
            {/* Sell button */}
           
{/* 
            <div className="navbar-nav ms-auto" >
              <div className="nav-item dropdown" >
                <div
                  onClick={() => {
                    setshowOver(!showOver);
                  }}
                  className="nav-link dropdown-toggle user-icon"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUser size={30} />
                </div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    background: '#eee',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: 1,
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#778899',
                    borderRadius: '7px'
                }}>
                     {!!localStorage.getItem("token") && (
                <Link to="/add-product" >
                <button className="logout-btn"> SELL </button>
                </Link>
            )}
                     <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn"> MY PRODUCTS  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> WISHLIST  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/carted-products">
                                <button className="logout-btn"> CART </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/check-out">
                                <button className="logout-btn"> CHECKOUT </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-profile">
                                <button className="logout-btn"> MY PROFILE  </button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login">  LOGIN </Link> :
                            <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
                            </div>
                            </div>
                  
                
                }
                
              </div>
            </div> */}
            
          {/* </div> */}
        </div>
      </nav>
    </div>
  );
}

export default Header;

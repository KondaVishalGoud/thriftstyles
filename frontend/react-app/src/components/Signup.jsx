import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../constants';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

function Signup() {
  const navigate = useNavigate();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleApi = () => {
    if (!username || !password || !email || !mobile) {
      setError('Error: Please fill in all the fields.');
      setTimeout(() => {
        setError(null); // Clear the error after 1.5 seconds
      }, 2000);
      return;
    }

    const url = API_URL + '/signup';
    const data = { username, password, mobile, email };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          setSuccessMessage('Signed up successfully! Redirecting to login page...');
          setTimeout(() => {
            navigate('/login');
          }, 2000); // Redirect after 3 seconds
        }
      })
      .catch((err) => {
        setError('Error: Server error. Please try again later.')
        setTimeout(() => {
          setError(null); // Clear the error after 1.5 seconds
        }, 2000);
        
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('./signup2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container className="p-3 m-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Welcome to ThriftStyle</h3>

        {error && <Alert color="danger">{error}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}

        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" id="username" className="form-control" value={username} onChange={(e) => setusername(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="mobile">Mobile</Label>
            <Input type="text" id="mobile" className="form-control" value={mobile} onChange={(e) => setmobile(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" id="email" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id="password" className="form-control" value={password} onChange={(e) => setpassword(e.target.value)} />
          </FormGroup>

          <Button color="primary" className="mr-3" onClick={handleApi}>
            SIGNUP
          </Button>

          <Link className="m-3" to="/login">
            Existing User? Log in
          </Link>

          {/* <Link className="m-3" to="/login">
            Admin
          </Link> */}
        </Form>
      </Container>
    </div>
  );
}

export default Signup;

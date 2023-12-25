import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../constants';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleApi = () => {
    if (!username || !password) {
      setError('Error: Please enter both username and password.');
      setTimeout(() => {
        setError(null); // Clear the error after 1.5 seconds
      }, 2000);
      return;
    }

    const url = API_URL + '/login';
    const data = { username, password };

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            setError(null); // Clear any previous error
            navigate('/'); // Redirect to the home page
          } else {
            setError('Error: Wrong credentials. Please check your username and password.');
            setTimeout(() => {
              setError(null); // Clear the error after 1.5 seconds
            }, 2000);
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError('Error: Credentials not found in the database. Please check your credentials.');
        } else {
          setError('Error: Server error. Please try again later.');
          setTimeout(() => {
            setError(null); // Clear the error after 1.5 seconds
          }, 2000);
        }
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('./login2.jpg')`, // Add your desired background color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container className="p-3 m-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '20px', maxWidth: '350px' }}>
        <h3 className="text-center mb-4">Welcome to ThriftStyle</h3>

        {error && <Alert color="danger">{error}</Alert>}

        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>

          <Button color="primary" className="mr-3" onClick={handleApi}>
            Login
          </Button>

          <div style={{ marginTop: '1em' }}>
            <Link to="/signup">New to ThriftStyle? Create an Account</Link>
          </div>

         
        </Form>
      </Container>
    </div>
  );
}

export default Login;

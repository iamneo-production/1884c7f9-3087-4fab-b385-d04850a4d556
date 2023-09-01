import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Route, Navigate } from 'react-router-dom'; // Import necessary router components
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import MainNavbar from '../navbars/MainNavbar';

const AuthenticationPage = () => {
  return (
    <div>
        <MainNavbar/>
        <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col md={12}>
          <LoginForm />
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Col>
        {/* <Col md={6}>
          
          <Route path="/register" element={<RegistrationForm />} />
        </Col> */}
      </Row>
    </Container>

    </div>
    
  );
};

export default AuthenticationPage;

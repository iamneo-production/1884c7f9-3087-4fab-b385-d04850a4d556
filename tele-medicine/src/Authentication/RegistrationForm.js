import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import MainNavbar from '../navbars/MainNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newUser = {
        ...values,
        role: 'patient'
      };

      const response = await axios.post('/users', newUser);

      if (response.status === 201) {
        console.log('User registered:', newUser.email);
        toast.success('Registration successful');
        setRegistrationSuccess(true);
        resetForm(); // Clear the input fields
        setTimeout(() => {
          setRegistrationSuccess(false);
          navigate('/'); // Navigate to login page
        }, 2000); // Delay before navigating
      } else {
        console.log('User registration failed');
        toast.error('User registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <MainNavbar />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-12 col-md-6 border p-4">
          <p className="text-center">REGISTRATION</p>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormGroup>
                <label>Username:</label>
                <Field type="text" name="username" className="form-control" />
              </FormGroup>
              <FormGroup>
                <label>Email:</label>
                <Field type="email" name="email" className="form-control" />
              </FormGroup>
              <FormGroup>
                <label>Password:</label>
                <Field type="password" name="password" className="form-control" />
              </FormGroup>
              <Button className="m-3" type="submit">
                Register
              </Button>
            </Form>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

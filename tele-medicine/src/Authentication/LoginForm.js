import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuthContext } from '../globalHandler/AuthProvider'; // Adjust the path as needed
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../navbars/MainNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const { setUser } = useAuthContext();

    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const response = await axios.get('/users'); // Assuming you fetch the user data here
            const users = response.data;
            console.log(response.data);
            console.log(users);
            const user = users.find(
                (u) =>
                    u.email === values.email && u.password === values.password
            );

            if (user) {
                setUser(user); // Set the user in the context
                toast.success('Login successful');
                if (user.role === "admin") {
                    navigate('/admin')
                }
                else if (user.role === "doctor") {
                    navigate("/doctor");
                }
                else {
                    navigate("/patient");
                }
            } else {
                console.log('Invalid email or password');
                toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-90">
                <div className="col-12 border p-4 m-8">
                    <p className='text-center'>LOGIN</p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <FormGroup>
                                <label>Email:</label>
                                <Field type="email" name="email" className="form-control" />
                            </FormGroup>
                            <FormGroup>
                                <label>Password:</label>
                                <Field type="password" name="password" className="form-control" />
                            </FormGroup>
                            <Button type="submit" className='m-2'>Login</Button>
                        </Form>
                    </Formik>
                    <ToastContainer/>
                </div>
            </div>
        </div>

    );
};

export default LoginForm;

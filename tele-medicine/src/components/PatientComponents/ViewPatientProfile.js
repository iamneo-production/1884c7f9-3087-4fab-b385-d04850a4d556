import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../globalHandler/AuthProvider';
import PatientNavbar from '../../navbars/PatientNavbar';
import { Form, Button, Card, Container } from 'react-bootstrap';

const ViewPatientProfile = () => {
    const { user } = useAuthContext();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setUserName(user.username);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdateProfile = async (event) => {
        event.preventDefault();

        try {
            // Update user's details in the backend
            await axios.put(`/users/${user.id}`, {
                username: userName,
                email: email,
                password: password,
                role: "patient"
            });

            // You might want to update the user context with the new details
            // updateUserContext({ id: user.id, username: userName, email: email });

            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <PatientNavbar />

            <div className="d-flex justify-content-center mt-3 vh-100">
                <div className="col-12 col-md-6 border p-4">
                    <h3 className="mb-4 text-center">Edit Patient Details</h3>
                    <Container className="mt-4">
                       
                        <Form onSubmit={handleUpdateProfile}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button className='mt-3' type="submit">Update Profile</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default ViewPatientProfile;

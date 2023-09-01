import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../globalHandler/AuthProvider';
import { Form, Button, Col } from 'react-bootstrap';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorNavbar from '../../navbars/DoctorNavbar';

const ViewDoctorProfile = () => {
  const { user } = useAuthContext();
  const [doctorProfile, setDoctorProfile] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(`/users?id=${user.id}`);
        const doctor = response.data[0];
        setDoctorProfile({
          id: doctor.id,
          username: doctor.username,
          email: doctor.email,
          password: doctor.password,
          role: doctor.role,
        });
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, [user.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctorProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/users/${user.id}`, doctorProfile);
      toast.success('Doctor profile updated successfully');
    } catch (error) {
      console.error('Error updating doctor profile:', error);
    }
  };

  return (
    <div>
        <DoctorNavbar/>
        <div className="d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-6 p-4 border">
        <h2 className="mb-4 text-center mt-4">Doctor Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='p-2'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={doctorProfile.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='p-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={doctorProfile.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='p-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={doctorProfile.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button className='p-2' type="submit">Save updated Profile</Button>
        </Form>
        <ToastContainer/>
      </div>
    </div>
    </div>
    
  );
};

export default ViewDoctorProfile;

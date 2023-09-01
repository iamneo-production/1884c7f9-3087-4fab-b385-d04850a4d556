import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDoctorForm from './AddDoctorForm';
import AdminNavbar from '../../navbars/AdminNavbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        // Fetch specialties and update state
        axios.get('/specialties')
            .then(response => setSpecialties(response.data))
            .catch(error => console.error('Error fetching specialties:', error));

        // Fetch users and update state
        axios.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));

        // Fetch doctors and update state
        axios.get('/doctors')
            .then(response => {
                setDoctors(response.data);
                //setLoading(false); // Mark loading as false after fetching
            })
            .catch(error => console.error('Error fetching doctors:', error));
    }, []); // Empty dependency array to run only on mount

    return (
        <div>
            <AdminNavbar/>
            <h3 className='text-center m-3'>Add Doctor to the Records</h3>
            <AddDoctorForm specialties={specialties} users={users} doctors={doctors} setDoctors={setDoctors} />
            <ToastContainer />
        </div>
    );
};


export default AddDoctor;

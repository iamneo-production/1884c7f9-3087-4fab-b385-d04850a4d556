import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminNavbar from '../../navbars/AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewAllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [users, setUsers] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        // Fetch doctors, specialties, users, and time slots
        axios.get('/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));

        axios.get('/specialties')
            .then(response => setSpecialties(response.data))
            .catch(error => console.error('Error fetching specialties:', error));

        axios.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axios.get('/timeSlots')
            .then(response => setTimeSlots(response.data))
            .catch(error => console.error('Error fetching time slots:', error));
    }, []);

    const getSpecializationName = (specialtyId) => {
        const specialty = specialties.find(specialty => specialty.id === specialtyId);
        return specialty ? specialty.name : 'Specialization Not Found';
    };

    const getNumberOfAppointments = (doctorId) => {
        const appointmentsCount = timeSlots.filter(slot => slot.doctorId === doctorId).length;
        return appointmentsCount;
    };

    const getUsername = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? `${user.username} ` : 'User Not Found';
    };
    const getEmail = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? `${user.email} ` : 'User Not Found';
    }
    const handleDelete = (doctorId, userId) => {
        // Send a delete request to the backend to delete the doctor
        axios.delete(`/doctors/${doctorId}`)
          .then(response => {
            console.log('Doctor deleted successfully:', response.data);
            // Remove the doctor from the state
            setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      
            // Send a delete request to the backend to delete the user
            axios.delete(`/users/${userId}`)
              .then(userResponse => {
                console.log('User deleted successfully:', userResponse.data);
                // Remove the user from the state
                setUsers(users.filter(user => user.id !== userId));
              })
              .catch(error => {
                console.error('Error deleting user:', error);
              });
          })
          .catch(error => {
            console.error('Error deleting doctor:', error);
          });
      };
      

      return (
        <div>
          <AdminNavbar />
          <div className="container mt-4">
            <h2 className="text-center">Doctor List</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Email</th>
                  <th>Specialization</th>
                  <th>Number of Appointments</th>
                  <th>Action</th> {/* Add a column for the delete action */}
                </tr>
              </thead>
              <tbody>
                {doctors.map(doctor => (
                  <tr key={doctor.id}>
                    <td>{getUsername(doctor.userId)}</td>
                    <td>{getEmail(doctor.userId)}</td>
                    <td>{getSpecializationName(doctor.specialtyId)}</td>
                    <td>{getNumberOfAppointments(doctor.id)}</td>
                    <td>
                      <button className="btn btn-link text-danger" onClick={() => handleDelete(doctor.id,doctor.userId)}>
                      <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
};

export default ViewAllDoctors;

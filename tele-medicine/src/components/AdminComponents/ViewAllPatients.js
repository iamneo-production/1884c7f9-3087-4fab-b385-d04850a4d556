// ViewAllPatients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import AdminNavbar from '../../navbars/AdminNavbar';
import './ViewAllPatients.css'; // Import your custom CSS for styling

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Fetch patients, appointments, and users
    axios.get('/users?role=patient')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));

    axios.get('/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));

    axios.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const viewAppointments = (patientId) => {
    const patient = patients.find(patient => patient.id === patientId);
    setSelectedPatient(patient);
    toggleModal();
  };

  const getDoctorName = (doctorId) => {
    const doctorAppointment = appointments.find(appointment => appointment.doctorId === doctorId);
    const doctorUser = users.find(user => user.id === doctorAppointment.doctorId);
    return doctorUser ? doctorUser.username : 'Doctor Not Found';
  };
  const getDoctorEmail = (doctorId) => {
    const doctorAppointment = appointments.find(appointment => appointment.doctorId === doctorId);
    const doctorUser = users.find(user => user.id === doctorAppointment.doctorId);
    return doctorUser ? doctorUser.email : 'Doctor Not Found';
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="text-center">All Patients</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Number of Appointments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.username}</td>
                <td>{patient.email}</td>
                <td>{appointments.filter(appointment => appointment.patientId === patient.id).length}</td>
                <td>
                  <Button color="primary" onClick={() => viewAppointments(patient.id)}>View Appointments</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal} className="custom-modal">
        <ModalHeader toggle={toggleModal} className="modal-header">Appointments for {selectedPatient?.username}</ModalHeader>
        <ModalBody>
          {selectedPatient && (
            <div>
              <ul className="appointment-list">
                {appointments.filter(appointment => appointment.patientId === selectedPatient.id).map(appointment => (
                  <li key={appointment.id} className="appointment-item">
                    <p className="appointment-details"><strong>Doctor Name:</strong> {getDoctorName(appointment.doctorId)}</p>
                    <p className="appointment-details"><strong>Doctor Email:</strong> {getDoctorEmail(appointment.doctorId)}</p>
                    <p className="appointment-details"><strong>Starting Time:</strong> {appointment.startTime}</p>
                    <p className="appointment-details"><strong>Ending Time:</strong> {appointment.endTime}</p>
                    <p className="appointment-details"><strong>Status:</strong> {appointment.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewAllPatients;

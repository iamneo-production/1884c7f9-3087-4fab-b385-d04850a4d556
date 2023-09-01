import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Alert } from 'react-bootstrap';
import { useAuthContext } from '../../globalHandler/AuthProvider';
import DoctorNavbar from '../../navbars/DoctorNavbar';

const DoctorAppointments = () => {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState([]);
  const [showNoAppointmentsAlert, setShowNoAppointmentsAlert] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments data:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchAppointments();
    fetchUsers();
  }, []);

  const doctorAppointments = appointments.filter(
    (appointment) =>
      appointment.doctorId === user.id && appointment.status === 'pending'
  );

  useEffect(() => {
    setShowNoAppointmentsAlert(doctorAppointments.length === 0);
  }, [doctorAppointments]);

  const getPatientName = (patientId) => {
    const patient = users.find(user => user.id === patientId);
    return patient ? patient.username : 'Unknown';
  };
  const handleApprove = async (appointmentId) => {
    try {
      const appointmentToUpdate = doctorAppointments.find(
        (appointment) => appointment.id === appointmentId
      );

      const updatedAppointment = {
        ...appointmentToUpdate,
        status: 'approved'
      };

      const response = await axios.put(
        `/appointments/${appointmentId}`,
        updatedAppointment
      );

      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId ? updatedAppointment : appointment
          )
        );
        console.log('Appointment approved');
      } else {
        console.log('Failed to approve appointment');
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      const appointmentToUpdate = doctorAppointments.find(
        (appointment) => appointment.id === appointmentId
      );

      const updatedAppointment = {
        ...appointmentToUpdate,
        status: 'rejected'
      };

      const response = await axios.put(
        `/appointments/${appointmentId}`,
        updatedAppointment
      );

      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId ? updatedAppointment : appointment
          )
        );
        console.log('Appointment rejected');
      } else {
        console.log('Failed to reject appointment');
      }
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };


  return (
    <div>
      <DoctorNavbar/>
      <div>
      {showNoAppointmentsAlert && (
        <div>
        
        <Alert variant="warning" className='text-center'>
          No appointments for you, {user.username}.
        </Alert>
        </div>
      )}
      {!showNoAppointmentsAlert && (
        <div>
          <h3 className='text-center'>Pending Appointments</h3>
        <Table striped bordered hover style={{ width: '100vw', margin: '20px' }}>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Starting Time</th>
              <th>Ending Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{getPatientName(appointment.patientId)}</td>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.status}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleApprove(appointment.id)}
                    disabled={appointment.status !== 'pending'}
                  >
                    Approve
                  </Button>
                  {' '}
                  <Button
                    variant="danger"
                    onClick={() => handleReject(appointment.id)}
                    disabled={appointment.status !== 'pending'}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default DoctorAppointments;


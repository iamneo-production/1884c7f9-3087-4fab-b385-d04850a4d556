import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../globalHandler/AuthProvider';
import { Table, Container } from 'react-bootstrap';
import PatientNavbar from '../../navbars/PatientNavbar';

const ViewPatientAppointments = () => {
    const { user } = useAuthContext();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Fetch appointments for the logged-in user
                const response = await axios.get(`/appointments?patientId=${user.id}`);
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [user]);

    return (
        <div>
            <PatientNavbar />
            <Container className="d-flex justify-content-center tm-3 vh-100">
                <div className="w-75">
                    <h3 className="mb-4 text-center">Your Appointments</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Appointment ID</th>
                                <th>Doctor ID</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.doctorId}</td>
                                    <td>{appointment.startTime}</td>
                                    <td>{appointment.endTime}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default ViewPatientAppointments;

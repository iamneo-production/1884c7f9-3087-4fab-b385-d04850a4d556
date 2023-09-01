import React from 'react';
import PatientNavbar from '../../navbars/PatientNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import '../AdminComponents/AdminHome.css';
import { useNavigate } from 'react-router-dom';
import MyImage from '../../Image/logo.jpg';

function PatientHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container vh-100">
      <PatientNavbar />
      <img src={MyImage} alt="My Image" className="admin-home-background-image" crop="fill" />
      <Container className="admin-home-content">
        <Row>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/slotBooking")}>
            <div className="admin-home-action">
             Slot Booking 
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewPatientProfile")}>
            <div className="admin-home-action">
              View Patient Profile
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewPatientAppointments")}>
            <div className="admin-home-action">
             View Patient Appointments
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default PatientHome
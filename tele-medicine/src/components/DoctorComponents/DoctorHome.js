import React from 'react';
import DoctorNavbar from '../../navbars/DoctorNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import '../AdminComponents/AdminHome.css';
import { useNavigate } from 'react-router-dom';
import MyImage from '../../Image/logo.jpg';

function DoctorHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container vh-100">
      <DoctorNavbar />
      <img src={MyImage} alt="My Image" className="admin-home-background-image" crop="fill" />
      <Container className="admin-home-content">
        <Row>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewAllAppointments")}>
            <div className="admin-home-action">
             View All Appointments 
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewDoctorProfile")}>
            <div className="admin-home-action">
              ViewDoctorProfile
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default DoctorHome
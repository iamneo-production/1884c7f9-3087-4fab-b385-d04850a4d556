import React from 'react';
import AdminNavbar from '../../navbars/AdminNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';
import MyImage from '../../Image/logo.jpg';

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container vh-100">
      <AdminNavbar />
      <img src={MyImage} alt="My Image" className="admin-home-background-image" crop="fill" />
      <Container className="admin-home-content">
        <Row>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/addDoctor")}>
            <div className="admin-home-action">
              Add Doctor 
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="admin-home-col" onClick={() => navigate("/viewAllDoctors")}>
            <div className="admin-home-action">
              View All Doctors
            </div>
          </Col>
          <Col xs={12} md={6} lg={6} className="admin-home-col" onClick={() => navigate("/viewAllPatients")}>
            <div className="admin-home-action">
              View all patients
            </div>
          </Col>
          <Col xs={12} md={6} lg={6} className="admin-home-col" onClick={() => navigate("/timeSlotManagement")}>
            <div className="admin-home-action">
            TimeSlotManagement
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default AdminHome
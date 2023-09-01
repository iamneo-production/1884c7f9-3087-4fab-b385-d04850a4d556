import React from 'react'
import {Routes,Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import AdminHome from './components/AdminComponents/AdminHome'
import PatientHome from './components/PatientComponents/PatientHome'
import DoctorHome from './components/DoctorComponents/DoctorHome'
import AddDoctor from './components/AdminComponents/AddDoctor';
import ViewAllDoctors from './components/AdminComponents/ViewAllDoctors';
import ViewAllPatients from './components/AdminComponents/ViewAllPatients';
import TimeSlotManagement from './components/AdminComponents/TimeSlotManagement';
import ViewAllAppointments from './components/DoctorComponents/DoctorAppointments';
import AuthenticationPage from './Authentication/AuthenticationPage';
import RegistrationForm from './Authentication/RegistrationForm';
import ViewDoctorProfile from './components/DoctorComponents/ViewDoctorProfile';
import SlotBooking from './components/PatientComponents/SlotBooking';
import ViewPatientProfile from './components/PatientComponents/ViewPatientProfile';
import ViewPatientAppointments from './components/PatientComponents/ViewPatientAppointments';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={AuthenticationPage}></Route>
          <Route path="/register" Component={RegistrationForm}></Route>
          <Route path='/admin' Component={AdminHome}></Route>
          <Route path="/patient" Component={PatientHome}></Route>
          <Route path="/doctor" Component={DoctorHome}></Route>

          <Route path="/addDoctor" Component={AddDoctor}></Route>
          <Route path="/viewAllDoctors" Component={ViewAllDoctors}></Route>
          <Route path="/viewAllPatients" Component={ViewAllPatients}></Route>
          <Route path="/timeSlotManagement" Component={TimeSlotManagement}></Route>

          <Route path="/viewAllAppointments" Component={ViewAllAppointments}></Route>
          <Route path="/viewDoctorProfile" Component={ViewDoctorProfile}></Route>

          <Route path='/slotBooking' Component={SlotBooking}></Route>
          <Route path='/viewPatientProfile' Component={ViewPatientProfile}></Route>
          <Route path="/viewPatientAppointments" Component={ViewPatientAppointments}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
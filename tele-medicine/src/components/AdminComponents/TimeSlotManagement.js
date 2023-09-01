import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../navbars/AdminNavbar';

const TimeSlotManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [users, setUsers] = useState([]);
  const [creatingSlot, setCreatingSlot] = useState(false);
  const [newSlotStartTime, setNewSlotStartTime] = useState('');
  const [newSlotEndTime, setNewSlotEndTime] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    // Fetch doctors, time slots, and users
    axios.get('/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));

    axios.get('/timeSlots')
      .then(response => setTimeSlots(response.data))
      .catch(error => console.error('Error fetching time slots:', error));

    axios.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const getDoctorUsername = (doctorId) => {
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    const doctorUser = users.find(user => user.id === doctor.userId && user.role === 'doctor');
    return doctorUser ? doctorUser.username : 'Doctor Not Found';
  };

  const getTimeSlotCount = (doctorId) => {
    return timeSlots.filter(slot => slot.doctorId === doctorId).length;
  };

  const createNewTimeSlot = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setCreatingSlot(true);
  };

  const saveNewTimeSlot = () => {
    // Create the new slot object
    const newSlot = {
      id: timeSlots.length + 1,
      doctorId: selectedDoctorId,
      startTime: newSlotStartTime,
      endTime: newSlotEndTime
    };
  
    // Send a POST request to save the new time slot
    axios.post('/timeSlots', newSlot)
      .then(response => {
        // Update the timeSlots state with the new slot
        setTimeSlots([...timeSlots, response.data]);
  
        // Reset the form and state
        setNewSlotStartTime('');
        setNewSlotEndTime('');
        setCreatingSlot(false);
        setSelectedDoctorId(null);
      })
      .catch(error => {
        console.error('Error saving time slot:', error);
      });
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="text-center">Time Slot Management</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Time Slot Count</th>
              <th>Create Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id}>
                <td>{getDoctorUsername(doctor.id)}</td>
                <td>{getTimeSlotCount(doctor.id)}</td>
                <td>
                  {creatingSlot && selectedDoctorId === doctor.id ? (
                    <div>
                      <input
                        type="datetime-local"
                        value={newSlotStartTime}
                        onChange={(e) => setNewSlotStartTime(e.target.value)}
                      />
                      <input
                        type="datetime-local"
                        value={newSlotEndTime}
                        onChange={(e) => setNewSlotEndTime(e.target.value)}
                      />
                      <button
                        className="btn btn-success"
                        onClick={saveNewTimeSlot}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => createNewTimeSlot(doctor.id)}
                    >
                      Create Time Slot
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSlotManagement;

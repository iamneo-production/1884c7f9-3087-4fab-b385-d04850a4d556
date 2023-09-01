import React, { createContext, useContext, useState } from 'react';

// Create a context
export const AppointmentsContext = createContext();

// Create a provider component
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Function to update appointment status
  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments(prevAppointments => prevAppointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status };
      }
      return appointment;
    }));
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, updateAppointmentStatus }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom hook to use the AppointmentsContext
export const useAppointmentsContext = () => useContext(AppointmentsContext);

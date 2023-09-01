import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../globalHandler/AuthProvider';
import { Form, Button, Card, Container } from 'react-bootstrap';
import PatientNavbar from '../../navbars/PatientNavbar';
const SlotBooking = () => {
    const { user } = useAuthContext();
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctorSlots, setDoctorSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null);
    const [updatedTimeSlots, setUpdatedTimeSlots] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);

    // Fetch time slots initially
    useEffect(() => {
        const fetchTimeSlots = async () => {
            try {
                const response = await axios.get('/timeSlots');
                setTimeSlots(response.data);
            } catch (error) {
                console.error('Error fetching time slots:', error);
            }
        };

        fetchTimeSlots();
    }, []);
    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await axios.get('/specialties');
                setSpecialities(response.data);
            } catch (error) {
                console.error('Error fetching specialities:', error);
            }
        };

        fetchSpecialities();
    }, []);

    useEffect(() => {
        const fetchDoctorsBySpeciality = async () => {
            try {
                if (selectedSpeciality) {
                    const response = await axios.get(`/doctors?specialtyId=${selectedSpeciality}`);
                    setDoctors(response.data);
                }
            } catch (error) {
                console.error('Error fetching doctors by speciality:', error);
            }
        };

        fetchDoctorsBySpeciality();
    }, [selectedSpeciality]);

    useEffect(() => {
        const fetchDoctorSlots = async () => {
            try {
                if (selectedDoctor) {
                    const response = await axios.get(`/timeSlots?doctorId=${selectedDoctor}`);
                    setDoctorSlots(response.data);
                }
            } catch (error) {
                console.error('Error fetching doctor slots:', error);
            }
        };

        fetchDoctorSlots();
    }, [selectedDoctor]);

    useEffect(() => {
        const fetchSelectedDoctorDetails = async () => {
            //console.log("called");
            try {
                if (selectedDoctor) {
                    //console.log(selectedDoctor);
                    //console.log("Doctors",doctors);
                    const doctor = doctors.find((doc) => doc.userId == selectedDoctor);
                    // console.log("Before if ",doctor);
                    if (doctor) {
                        //console.log(doctor);
                        const response = await axios.get(`/users?id=${doctor.userId}`);
                        setSelectedDoctorDetails(response.data[0]);
                        //console.log(response.data);
                        console.log(response.data[0]) // Select the first user from the response
                    } else {
                        setSelectedDoctorDetails(null);
                    }
                }
            } catch (error) {
                console.error('Error fetching selected doctor details:', error);
            }
        };

        fetchSelectedDoctorDetails();
    }, [selectedDoctor, doctors]);


    const handleSpecialityChange = (event) => {
        const newSelectedSpeciality = event.target.value;
        setSelectedSpeciality(newSelectedSpeciality);
        setSelectedDoctor('');
        setSelectedSlot('');
        console.log("Selected speciality:", newSelectedSpeciality);
    };


    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
        setSelectedSlot('');
    };

    const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
    };

    // useEffect(() => {
    //     // Send a PUT or PATCH request to update the timeSlots list in the backend
    //     const updateTimeSlotsInBackend = async () => {
    //         try {
    //             // Delete all existing time slots
    //             await axios.delete('/timeSlots');

    //             // Make the POST request to update the time slots
    //             await axios.post('/timeSlots', { timeSlots: updatedTimeSlots });

    //             console.log('Time slots updated in the backend');
    //         } catch (error) {
    //             console.error('Error updating time slots in the backend:', error);
    //         }
    //     };

    //     if (updatedTimeSlots.length > 0) {
    //         updateTimeSlotsInBackend();
    //     }
    // }, [updatedTimeSlots]);

    const handleSlotBooking = async () => {
        if (selectedSlot) {
            console.log("selected slot", selectedSlot);
            try {
                await axios.post('/appointments', {
                    patientId: user.id,
                    doctorId: parseInt(selectedDoctor),
                    startTime: selectedSlot,
                    endTime: selectedSlot,
                    status: 'pending',
                });
                console.log('Appointment booked successfully');
                setSelectedSlot('');

                // Update the time slots list by filtering out the booked slot
                const updatedSlots = timeSlots.filter(slot => slot.startTime !== selectedSlot);
                setUpdatedTimeSlots(updatedSlots);
            } catch (error) {
                console.error('Error booking appointment:', error);
            }
        }
    };

    return (
        <div>
            <PatientNavbar />

            <Container className="mt-4 border p-4">
                <div>
                    <h2 className='text-center'>Book an Appointment</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Select Speciality</Form.Label>
                            <Form.Control as="select" onChange={handleSpecialityChange}>
                                <option value="">Select Speciality</option>
                                {specialities.map((speciality) => (
                                    <option key={speciality.id} value={speciality.id}>
                                        {speciality.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {selectedSpeciality && (
                            <Form.Group>
                                <Form.Label>Select Doctor</Form.Label>
                                <Form.Control as="select" onChange={handleDoctorChange}>
                                    <option value="">Select Doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.userId}>
                                            {doctor.userId}
                                        </option>
                                    ))}

                                </Form.Control>
                            </Form.Group>
                        )}

                        {selectedDoctor && (
                            <div>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Doctor Details</Card.Title>
                                        {selectedDoctorDetails && (
                                            <div>
                                                <p>Doctor Name: {selectedDoctorDetails.username}</p>
                                                <p>Slots Available: {doctorSlots.length}</p>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                                <Form.Group>
                                    <Form.Label>Select Slot</Form.Label>
                                    <Form.Control as="select" onChange={handleSlotChange}>
                                        <option value="">Select Slot</option>
                                        {doctorSlots.map((slot) => (
                                            <option key={slot.id} value={slot.startTime}>
                                                {slot.startTime} - {slot.endTime}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        )}

                        {selectedSlot && (
                            <Button className='mt-3' onClick={handleSlotBooking}>Book Slot</Button>
                        )}
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default SlotBooking;

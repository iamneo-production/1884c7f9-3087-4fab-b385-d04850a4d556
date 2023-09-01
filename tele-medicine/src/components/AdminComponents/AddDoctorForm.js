import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
const AddDoctorForm = ({ specialties, users, doctors, setDoctors }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    specialtyId: ''
  };

  const showSuccessNotification = () => {
    toast.success('Doctor added successfully!', {
      position: 'top-center',
      autoClose: 3000, // Notification will automatically close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorNotification = (errorMessage) => {
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    specialtyId: Yup.string().required('Required')
  });

  const onSubmit = (values, { resetForm }) => {
    const newUserId = users.length + 1;
    const newDoctorId = doctors.length + 1;

    const newUser = {
      id: newUserId,
      username: values.username,
      email: values.email,
      password: values.password,
      role: 'doctor'
    };

    const specialtyIdAsInteger = parseInt(values.specialtyId, 10);

    const newDoctor = {
      id: newDoctorId,
      userId: newUserId,
      specialtyId: specialtyIdAsInteger // Store it as an integer
    };

    setDoctors([...doctors, newDoctor]);

    // Reset the form
    resetForm();

    axios.post('/users', newUser)
      .then(userResponse => {
        console.log('User data saved successfully:', userResponse.data);
        // After saving the user, post the doctor data
        axios.post('/doctors', newDoctor)
          .then(doctorResponse => {
            console.log('Doctor data saved successfully:', doctorResponse.data);
            // Update the local state with the new doctor data
            setDoctors([...doctors, doctorResponse.data]);
            // Reset the form
            showSuccessNotification();
            resetForm();
          })
          .catch(error => {
            showErrorNotification('Error saving doctor data.');
            console.error('Error saving doctor data:', error);
          });
      })
      .catch(error => {
        showErrorNotification('Error saving user data.');
        console.error('Error saving user data:', error);
      });

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" id="username" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="specialtyId" className="form-label">Specialty</label>
                <Field as="select" id="specialtyId" name="specialtyId" className="form-select">
                  <option value="" label="Select a specialty" />
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.id} label={specialty.name} />
                  ))}
                </Field>
                <ErrorMessage name="specialtyId" component="div" className="error" />
              </div>

              <button type="submit" className="btn btn-primary">Add Doctor</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;

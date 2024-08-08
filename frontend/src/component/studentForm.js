import React, { useState } from 'react';
import styles from './StudentForm.module.css'; // Import CSS module
import { createStudent } from '../services/studentService'; // Import createStudent function

const StudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = { first_name:firstName,last_name: lastName, dob, email, password };
      await createStudent(studentData); // Call the API service
      setSuccessMessage('Student registered successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Register Student</h2>

        <label className={styles.required}>First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          required
        />

        <label className={styles.required}>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          required
        />

        <label className={styles.required}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={handleChange}
          required
        />

        <label className={styles.required}>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label className={styles.required}>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default StudentForm;

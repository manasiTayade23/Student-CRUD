import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent, updateStudent } from '../services/studentService'; // Added updateStudent
import styles from './StudentList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    getStudents()
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDifference = new Date().getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && new Date().getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleDelete = async (id) => {
    setStudentToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteStudent(studentToDelete);
      setStudents(students.filter(student => student.id !== studentToDelete));
      setShowConfirm(false);
      setStudentToDelete(null);
    } catch (error) {
      setError('Failed to delete student');
      setShowConfirm(false);
    }
  };

  const handleSearch = () => {
    getStudents(1, 10) // Assuming page and limit are static for simplicity
      .then(response => {
        const filteredStudents = response.data.filter(student => student.id.toString().includes(searchId));
        setStudents(filteredStudents);
      })
      .catch(err => setError('Failed to fetch students'));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have fields in the form to capture updated student data
    try {
      await updateStudent(editStudent.id, { ...editStudent });
      setStudents(students.map(student =>
        student.id === editStudent.id ? editStudent : student
      ));
      setShowEditForm(false);
      setEditStudent(null);
    } catch (error) {
      setError('Failed to update student');
    }
  };

  const handleInputChange = (e) => {
    setEditStudent({
      ...editStudent,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by ID"
          className={styles.searchInput}
        />
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>

      <table className={styles.studentTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id} className={index % 2 === 0 ? styles.whiteRow : styles.grayRow}>
                <td>{student.id}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{calculateAge(student.dob)}</td>
                <td>{student.email}</td>
                <td>{student.marks ? student.marks.join(', ') : 'No marks'}</td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => {
                      setEditStudent(student);
                      setShowEditForm(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} title="Edit" />
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(student.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} title="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No students available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showConfirm && (
        <div className={styles.confirmDialog}>
          <div className={styles.warningIcon}>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          <p>Are you sure you want to delete this student?</p>
          <div className={styles.confirmButtons}>
            <button className={styles.noButton} onClick={() => setShowConfirm(false)}>No</button>
            <button className={styles.yesButton} onClick={confirmDelete}>Yes</button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className={styles.editForm}>
          <h3>Edit Student</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={editStudent.first_name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={editStudent.last_name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={editStudent.dob}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editStudent.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Marks:
              <input
                type="text"
                name="marks"
                value={editStudent.marks ? editStudent.marks.join(', ') : ''}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentList;

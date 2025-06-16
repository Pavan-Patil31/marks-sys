import React from 'react';
import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mark1: '',
    mark2: '',
    mark3: '',
    mark4: '',
    mark5: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      // Update existing student
      const updatedStudents = [...students];
      updatedStudents[editIndex] = formData;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      // Add new student
      setStudents([...students, formData]);
    }
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      mark1: '',
      mark2: '',
      mark3: '',
      mark4: '',
      mark5: ''
    });
  };

  const handleClear = () => {
    setFormData({
      name: '',
      age: '',
      mark1: '',
      mark2: '',
      mark3: '',
      mark4: '',
      mark5: ''
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
      
      if (editIndex === index) {
        handleClear();
      } else if (editIndex !== null && editIndex > index) {
        setEditIndex(editIndex - 1);
      }
    }
  };

  return (
    <div className="app-container">
      <StudentForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        editIndex={editIndex}
      />
      <StudentTable 
        students={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
import React from 'react';
import { FaUser, FaCalendarAlt, FaBook, FaPaperPlane, FaEraser } from 'react-icons/fa';

const StudentForm = ({ formData, handleInputChange, handleSubmit, handleClear, editIndex }) => {
  return (
    <div className="form-container">
      <h2 className="form-title"><FaUser /> Student Marks Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><FaUser /> Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age"><FaCalendarAlt /> Student Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleInputChange}
            min="5"
            max="30"
            required
          />
        </div>
        
        <h4 className="form-title"><FaBook /> Marks</h4>
        
        {[1, 2, 3, 4, 5].map((num) => (
          <div className="form-group" key={`mark${num}`}>
            <label htmlFor={`mark${num}`}>Subject {num}</label>
            <input
              type="number"
              id={`mark${num}`}
              name={`mark${num}`}
              className="form-control"
              value={formData[`mark${num}`]}
              onChange={handleInputChange}
              min="0"
              max="100"
              required
            />
          </div>
        ))}
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            <FaPaperPlane /> {editIndex !== null ? 'Update' : 'Submit'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>
            <FaEraser /> Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
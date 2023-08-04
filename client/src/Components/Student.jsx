import React, { useState } from 'react';
import axios from 'axios';

const Student = () => {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '',
    rollno: '',
    marks: '',
    placement: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const data = {
        clg: formData.college.toLowerCase(),
        branch: formData.branch.toLowerCase(),
        rollno: formData.rollno.toLowerCase(),
        studname: formData.name.toLowerCase(),
        marks: formData.marks.toLowerCase(),
        placement: formData.placement.toLowerCase(),
      };

      console.log(data);

      const response = await axios.post('http://localhost:5000/students', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert("student added")
      setFormData({
        name: '',
        college: '',
        branch: '',
        rollno: '',
        marks: '',
        placement: ''
      });

    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className='flex justify-center'>
      <div className='mt-10 ml-10 w-1/2 bg-blue shadow-md rounded-lg p-6 bg-opacity-20 bg-blue-500 backdrop-blur-lg rounded-lg'>
        <h2 className='pl-50 text-4xl text-back font-bold mb-4'>
          Add Student
        </h2>
        <form>
        <div className="mb4">
                     <label htmlFor="name" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter Student Name:</label>
                     <input type="text" id='name'  className='p-2 w-full border' onChange={handleChange} value={formData.name} name='name'/>
                     <label htmlFor="rollno" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter RollNO:</label>
                     <input type="text" id='rollno' className='p-2 w-full border' onChange={handleChange} value={formData.rollno} name='rollno'/>
                     <label htmlFor="branch" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter Branch:</label>
                     <input type="text" id='branch' className='p-2 w-full border' onChange={handleChange} value={formData.branch} name='branch'/>
                     <label htmlFor="marks" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter Marks:</label>
                     <input type="text" id='marks' className='p-2 w-full border' onChange={handleChange} value={formData.marks} name='marks'/>
                     <label htmlFor="placement" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Placement:</label>
                     <input type="text" id='placement'  className='p-2 w-full border' onChange={handleChange} value={formData.placement} name='placement'/>
                     <label htmlFor="college" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter College:</label>
                    <input type="text" id='college'  className='p-2 w-full border' onChange={handleChange} value={formData.college} name='college'/>
          <button
          onClick={handleAddStudent}
            type='submit'
            className='p-4 text-2xl font-bold bg-black text-white rounded-lg w-1/2 mt-6'
          >
            Add Student
          </button>
          </div>
        </form>
      </div>
      <div className='h-20 pt-6 ml-40 font-bold text-2xl p-4 bg-gray-700 text-white rounded-lg mt-10 justify-center items-center'><a href="/">Go back</a></div>
    </div>
  )
}

export default Student;

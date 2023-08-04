import React, { useState } from 'react'
import { BrowserRouter, Routes, Link,Route } from 'react-router-dom';
import axios from 'axios'
const Search = () => {
    const [formData, setFormData] = useState({
        college: '',
        branch: '',
        rollno: '',
      });
    const [fdata,setfData] = useState([])
    const [ren,setRen] = useState(true)
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
    };
    const [editedData, setEditedData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const handleEditClick = (d) => {
        setEditedData({ ...d });
    };

    const handleDeleteClick = async (d)=>{
        try {
            const data = {
                "clg":d.college.toLowerCase(),
                "branch":d.branch.toLowerCase(),
                "rollno":d.rollno.toLowerCase(),
                "studname":d.name.toLowerCase(),
                "marks":d.marks.toLowerCase(),
                "placement":d.placement.toLowerCase(),
            }
            console.log(data)
            await axios.post('http://localhost:5000/deletestudent', JSON.stringify(data) , {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                await fet()
                setDeleteData(null)
        } catch (error) {
            console.log(error);
        }
    }

    const fet = async ()=> {
        const data = {
            "clg":(formData.college).toLowerCase(),
            "branch":formData.branch.toLowerCase(),
            "rollno":formData.rollno.toLowerCase()
        }
        const response = await axios.post('http://localhost:5000/studentdetails', JSON.stringify(data) , {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        setfData(response.data.student)
    }
    const handleSaveClick =async (e) => {
        e.preventDefault();
        try {
            // console.log(editedData)
            const data = {
                "clg":editedData.college.toLowerCase(),
                "branch":editedData.branch.toLowerCase(),
                "rollno":editedData.rollno.toLowerCase(),
                "studname":editedData.name.toLowerCase(),
                "marks":editedData.marks.toLowerCase(),
                "placement":editedData.placement.toLowerCase(),
            }
            const response = await axios.post('http://localhost:5000/students', JSON.stringify(data) , {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            await fet()
            setEditedData(null)
        }
        catch (error) {
            console.error('Error submitting data:', error);
            }
        };
    const handleClick = async (e) => {
    e.preventDefault();
    try {
        await fet()
        setRen(!ren)
        // console.log(response.data)
    } 
    catch (error) {
        console.error('Error submitting data:', error);
        }
    };
    return (
        <div>
        {
            ren ?
            <div className='flex justify-center items-center h-screen'>
                <div className='w-1/2 bg-blue shadow-md rounded-lg p-6 mb-40 bg-opacity-20 bg-blue-500 backdrop-blur-lg rounded-lg'>
                    <h2 className='pl-50 text-4xl text-back font-bold mb-4'>Search Students</h2>
                    <form action="">
                        <div className='mb-4'>
                            <label htmlFor="college" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter College *</label>
                            <input type="text" name='college' value={formData.college} id='college' className='p-2 w-full border text-black' onChange={handleChange}/>
                            <label htmlFor="branch" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4' >Enter Branch</label>
                            <input type="text" name='branch' value={formData.branch} id='branch' className='p-2 w-full border text-black'onChange={handleChange}/>
                            <label htmlFor="rollno" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4' >Enter RollNo</label>
                            <input type="text" name='rollno' value={formData.rollno} id='rollno' className='p-2 w-full border text-black' onChange={handleChange}/>
                            <button
                                type='submit'
                                className='p-4 text-2xl font-bold text-white bg-black rounded-lg w-1/2 mt-6'
                                onClick={handleClick}
                            >
                                Fetch
                            </button>
                        </div>
                    </form>
                </div>
                <div className="item-container">
            </div>
        </div>
        :
            
        <div>
            {fdata.map((d) => (
                <div key={d.rollno} className="justify-center items-center m-5 flex">
                <div className="w-1/4 bg-blue shadow-md rounded-lg p-6 bg-opacity-20 bg-blue-500 backdrop-blur-lg rounded-lg flex">
                    {editedData && editedData.rollno === d.rollno ? (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                        id='name'
                        type="text"
                        value={editedData.name}
                        className='rounded-lg ml-10 pl-2 mt-1'
                        onChange={(e) =>
                            setEditedData({ ...editedData, name: e.target.value })
                        }
                        />
                        <label htmlFor="rollno">Rollno</label>
                        <input
                        id='rollno'
                        type="text"
                        value={editedData.rollno}
                        className='rounded-lg ml-10 pl-2 p mt-1'
                        onChange={(e) =>
                            setEditedData({ ...editedData, rollno: e.target.value })
                        }
                        />
                        <label htmlFor="branch">Branch</label>
                        <input
                        id='branch'
                        type="text"
                        value={editedData.branch}
                        className='rounded-lg ml-8 pl-2 p mt-1'
                        onChange={(e) =>
                            setEditedData({ ...editedData, branch: e.target.value })
                        }
                        />
                        <label htmlFor="placement">Placement</label>
                        <input
                        id='placement'
                        type="text"
                        value={editedData.placement}
                        className='rounded-lg ml-2 pl-2 p mt-1'
                        onChange={(e) =>
                            setEditedData({ ...editedData, placement: e.target.value })
                        }
                        />
                        <label htmlFor="marks">Marks</label>
                        <input
                        id='marks'
                        type="text"
                        value={editedData.marks}
                        className='rounded-lg ml-10 pl-2 p mt-1'
                        onChange={(e) =>
                            setEditedData({ ...editedData, marks: e.target.value })
                        }
                        />
                        <label htmlFor="college">College</label>
                        <input
                        id='college'
                        type="text"
                        value={editedData.college}
                        className='rounded-lg ml-7 pl-2 p mt-1'
                        onChange={(e) =>
                            setEditedData({ ...editedData, name: e.target.value })
                        }
                        />
                        <button onClick={handleSaveClick} className="bg-white w-20 rounded-lg mt-3 ml-20">
                        Save
                        </button>
                    </div>
                    ) : (
                    <div className='flex'>
                        <div>
                            <p>Name: {d.name}</p>
                            <p>Rollno: {d.rollno}</p>
                            <p>Branch: {d.branch}</p>
                            <p>Placement: {d.placement}</p>
                            <p>Marks: {d.marks}</p>
                            <p>College: {d.college}</p>
                        </div>
                        <div className="align-left mt-4 ml-20">
                        <button onClick={() => handleEditClick(d)} className="bg-white w-20 rounded-lg">
                            Edit
                        </button>
                        <div className="h-3" />
                        <button onClick={()=> handleDeleteClick(d)} className="bg-white w-20 rounded-lg">Delete</button>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            ))}
            <div className='flex justify-center items-center'>
                <button className=' mt-1 font-bold bg-black text-white text-2xl rounded-lg w-20 ml-5' onClick={()=>setRen(true)}>Clear</button>
            </div>
            </div>
        }
    </div> 
    )
}

export default Search

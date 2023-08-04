import React,{useState} from 'react'
import axios from 'axios';


const Branch = () => {
    const [branch,setBranch] = useState('');
    const handleChange = (e) => {
        setBranch(e.target.value);
      };
    const handleClick = async (e)=>  {
        e.preventDefault()
        try {
            const data = {
                branch:branch
            }
            const response = await axios.post("http://localhost:5000/branch",JSON.stringify(data),
            {
                headers : {
                    'Content-type' : "application/json"
                },
            })
            alert(response.data)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='flex justify-center'>
            <div className='mt-10 ml-10 w-1/2 bg-blue shadow-md rounded-lg p-6 bg-opacity-20 bg-blue-500 backdrop-blur-lg rounded-lg'>
                <h2 className='pl-50 text-4xl text-back font-bold mb-4'>
                    Add Branch
                </h2>
                <form action="">
                    <label htmlFor="branch" className='block text-gray-700 text-xl font-bold pr-2 pb-4 pt-4'>Enter Branch:</label>
                    <input type="text" id='branch' className='p-2 w-full border' value={branch} onChange={handleChange}/>
                    <button
                        onClick={handleClick}
                        type='submit'
                        className='p-4 text-2xl font-bold bg-black text-white rounded-lg w-1/2 mt-6'
                    >
                        Add Branch
                    </button>
                </form>
            </div>
            <div className='h-20 pt-6 ml-40 font-bold text-2xl p-4 bg-gray-700 text-white rounded-lg mt-10 justify-center items-center'><a href="/">Go back</a></div>
        </div>
    )
}

export default Branch

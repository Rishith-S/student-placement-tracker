import React from 'react'

const Navbar = () => {
  return (
    <nav className='backdrop-blur-md bg-back p-5 m-0'>
        <div className='constainer mx-auto'>
            <div className='flex justify-between items-center'>
                <div className='font-bold text-3xl text-white/90'><a href="/">Students Placement Management</a></div>
                <ul className='flex space-x-4'>
                    <li className='font-bold text-white'><a href="/addcollege">Add College</a></li>
                    <li className='font-bold text-white'><a href="/addbranch">Add Branch</a></li>
                    <li className='font-bold text-white'><a href="/addstudent">Add Student</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar

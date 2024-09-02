import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

function LoginForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        email:"",
        password:""
    });

    const HandleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name] : e.target.value,
        }))
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }
    
  return (
    <div className='mt-3'>
      <form className='flex flex-col justify-center gap-y-4' onSubmit={HandleSubmit}>
        <div className='flex flex-col gap-y-2'>
            <label htmlFor='email' className=' text-gray-600'>Email</label>
            <input id='email' type='email' name='email' onChange={HandleChange} value={formData.email} placeholder='m@example.com' className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2' required/>
        </div>
        <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className='text-gray-600 flex flex-row items-center justify-between'>
                <p>Password</p>
                <p className='underline cursor-pointer'>Forgot your password?</p>
            </label>
            <input id='password' name='password' onChange={HandleChange} value={formData.password} className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2' type="password" required />
        </div>
        <div className='flex flex-col gap-y-4'>
            <button className='py-2 outline-none bg-pink-200 rounded-xl px-2'>Login</button>
            <button className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2 hover:bg-blue-300'>Login With Google</button>
        </div>
        <div className='flex justify-center w-full gap-x-1'> 
            Don't have an account?  <Link to={"/signup"} className='underline'>Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

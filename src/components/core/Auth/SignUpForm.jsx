import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';

function SignUpForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[signUpFormData,setSignUpFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        otp:""
    });

    const HandleChange = (e) => {
        setSignUpFormData((prevFormData)=>({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    } 

    const HandleSubmit = (e) => {
        e.preventDefault();
    
        if(signUpFormData.password !== signUpFormData.confirmPassword){
            toast.error("Password Not Matched");
            return;
        }

        dispatch(setSignupData(signUpFormData));
        dispatch(sendOtp(signUpFormData.email,navigate));
    }

  return (
    <div className='mt-5'>
      <form className='flex flex-col gap-y-2' onSubmit={HandleSubmit}>
        <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-col gap-1 w-[48%]'>
                <label>FirstName</label>
                <input type='text' placeholder='John' name='firstName' onChange={HandleChange} value={signUpFormData.firstName} className='border-2 w-full py-2 outline-none border-blue-200 rounded-xl px-2' required/>
            </div>
            <div className='flex flex-col gap-1 w-[48%]'> 
                <label>LastName</label>
                <input type='text' placeholder='Doe' name='lastName' onChange={HandleChange} value={signUpFormData.lastName} className='border-2 py-2 w-full outline-none border-blue-200 rounded-xl px-2' required/>
            </div>
        </div>
        <div className='flex flex-col gap-y-2'>
            <label htmlFor='email' className=' text-gray-600'>Email</label>
            <input id='email' type='email' placeholder='m@example.com' name='email' onChange={HandleChange} value={signUpFormData.email} className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2' required/>
        </div>
        <div className='flex flex-row w-full justify-between'>
            <div className='flex flex-col w-[48%] gap-y-2'>
                <label htmlFor='password' className=' text-gray-600'>Password</label>
                <input id='password' type='text' name='password' value={signUpFormData.password} onChange={HandleChange} className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2' required/>
            </div>
            <div className='flex flex-col w-[48%] gap-y-2'>
                <label htmlFor='confirmpassword' className=' text-gray-600'>Confirm Password</label>
                <input id='confirmpassword' type='text' name='confirmPassword' onChange={HandleChange} value={signUpFormData.confirmPassword} className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2' required/>
            </div>
        </div>
        <div className='flex flex-col gap-y-4 mt-2'>
            <button className='py-2 outline-none bg-pink-200 rounded-xl px-2'>Signup</button>
            <button className='border-2 py-2 outline-none border-blue-200 rounded-xl px-2 hover:bg-blue-300'>Signup With Google</button>
        </div>
        <div className='flex justify-center w-full gap-x-1'> 
            Already have an account?  <Link to={"/login"} className='underline'>LogIn</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm

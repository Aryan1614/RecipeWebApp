import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import { sendOtp, signup } from '../services/operations/authAPI';

function VerifyOtp() {
    const {loading,signUpData} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[Otp,setOtp] = useState("");

    if(!signUpData){
      navigate("/signup");
      return;
    }

    const HandleResend = async(e) => {
      e.preventDefault();
      dispatch(sendOtp(signUpData.email,navigate));
    }

    const HandleSubmit = async(e) => {
      e.preventDefault();
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = signUpData;
      
      dispatch(signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        Otp,
        navigate
      ));
    }
        
  return (
    <div className='pt-[110px] lg:ml-10 h-[calc(100vh-110px)] flex items-center'>
      {
        loading ? (<div className='loader'></div>) : 
        (
          <div>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-5xl font-semibold'>OTP Verification</h1>
              <p>Enter the 6-digit code sent to your Email.</p>
              <form onSubmit={HandleSubmit} className='w-[500px] mt-4'>
                <OTPInput 
                  value={Otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-[38px] lg:w-[50px] border-0 bg-gray-700 rounded-md text-gray-400 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-gray-200"
                    />
                  )}
                  containerStyle={{
                      gap: "0 2px",
                  }}
                />
                <button className='mt-4 bg-pink-200 rounded-xl py-2 w-full'>Verify OTP</button>
              </form>
              <div className='flex w-full items-center'>
                <div>Didn't receive the code? <button className='underline' onClick={HandleResend}>Resend</button></div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VerifyOtp;

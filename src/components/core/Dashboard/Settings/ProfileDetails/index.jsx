import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails } from '../../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';
import {DateConverter} from '../../../../../utils/TimeStampToDate';

function ProfileDetailsChange() {
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);

    const[formData,setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        About: user.AdditionalDetails.About,
        Contact: user.AdditionalDetails.contact,
        Gender: user.AdditionalDetails.Gender,
        DateOfBirth: user.AdditionalDetails.DateOfBirth
    });

    const HandleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    }

    function isFormUpdated() {
        if(formData.firstName !== user.firstName || formData.lastName !== user.lastName || formData.About !== user.AdditionalDetails.About || formData.Contact !== user.AdditionalDetails.Contact || DateConverter(formData.DateOfBirth) !== DateConverter(user.AdditionalDetails.DateOfBirth) || formData.Gender !== user.AdditionalDetails.Gender){
            return true;
        }
        else{
            return false;
        }
    }

    const HandleSubmit = async(e) => {
        const res = isFormUpdated();
        if(!res){
            toast.error("Please make Chnages!");
            return;
        } 
        
        const data = {};

        if(formData.firstName !== user.firstName){
            data.firstName = formData.firstName;
        }

        if(formData.lastName !== user.lastName){
            data.lastName = formData.lastName;
        }

        if(formData.About !== user.AdditionalDetails.About){
            data.About = formData.About;
        }

        if(formData.Contact !== user.AdditionalDetails.Contact){
            data.Contact = formData.Contact;
        }

        if(DateConverter(formData.DateOfBirth) !== DateConverter(user.AdditionalDetails.DateOfBirth)){
            data.DateOfBirth = formData.DateOfBirth;
        }

        if(formData.Gender !== user.AdditionalDetails.Gender){
            data.Gender = formData.Gender;
        }

        dispatch(updateDetails(data,token,navigate));
    }

    const HandleCancel = () => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            About: user.AdditionalDetails.About,
            Contact: user.AdditionalDetails.contact,
            Gender: user.AdditionalDetails.Gender || "",
            DateOfBirth: user.AdditionalDetails.DateOfBirth || ""
        });
    }

  return (
    <div className='w-full rounded-lg border-2 flex flex-col gap-y-2 border-pink-50 bg-pink-200 py-8 px-8'>
        <div className='flex flex-col gap-y-3'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor='firstName'>FirstName</label>
                    <input type='text' id='firstName' name='firstName' onChange={HandleChange} className='py-2 px-3 rounded-lg border-none outline-none' value={formData.firstName}  required/>
                </div>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor='lastName'>lastName</label>
                    <input type='text' id='lastName' name='lastName' className='py-2 px-3 rounded-lg border-none outline-none' onChange={HandleChange} value={formData.lastName}  required/>
                </div>
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor='About'>About</label>
                    <input type='text' id='About' name='About' className='py-2 px-3 rounded-lg border-none outline-none' onChange={HandleChange} value={formData.About}  required/>
                </div>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor='Gender'>Gender</label>
                    <select type='text' defaultValue={""} id='Gender' name='Gender' className='py-2 px-3 rounded-lg border-none outline-none' onChange={HandleChange} value={formData.Gender || ""}  required>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor='DateOfBirth'>Date Of Birth</label>
                    <input type='date' id='DateOfBirth' name='DateOfBirth' className='py-2 px-3 rounded-lg border-none outline-none' onChange={HandleChange} defaultValue={DateConverter(user.AdditionalDetails.DateOfBirth) || ""} required/>
                </div>
                <div className='flex flex-col gap-y-2 w-[48%]'>
                    <label htmlFor='Contact'>Contact</label>
                    <input type='number' id='Contact' name='Contact' className='py-2 px-3 rounded-lg border-none outline-none' onChange={HandleChange} value={formData.Contact}  required/>
                </div>
            </div>
        </div>
        <div className='flex flex-row items-center justify-end mt-4 gap-x-3'>
            <button className=' bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' onClick={HandleSubmit}>Update</button>
            <button className=' bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' onClick={HandleCancel}>Cancel</button>
        </div>
    </div>
  )
}

export default ProfileDetailsChange
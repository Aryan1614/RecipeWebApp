import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordHandler } from '../../../../../services/operations/settingsAPI';

function ChangePassword() {
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {loading} = useSelector((state)=>state.profile);

    const[formData,setFormData] = useState({
        oldPassword:"",
        newPassword: "",
    });

    const HandleCancel = (e) => {
        e.preventDefault();
        setFormData({
            oldPassword:"",
            newPassword: "",
        });
    }

    const HandleChange = (e) => {
        e.preventDefault();
        setFormData((prevFormData)=>({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        if(!formData.oldPassword || !formData.newPassword){
            toast.error("Password Required!");
            return;
        }

        if(formData.oldPassword === formData.newPassword){
            toast.error("Change Passwords!");
            return;
        }
        
        const data = {
            oldPassword: formData.oldPassword,
            Newpassword: formData.newPassword
        }

        dispatch(ChangePasswordHandler(data,token,setFormData));
    }

  return (
    <div className='bg-pink-200 rounded-lg w-full p-5'>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-col gap-y-1 w-[48%]'>
            <label htmlFor='oldPassword'>Old Password</label>
            <input type='text' name='oldPassword' id='oldPassword' readOnly={loading} onChange={HandleChange} value={formData.oldPassword} className='py-2 px-3 rounded-lg border-none outline-none' required/>
        </div>
        <div className='flex flex-col gap-y-1 w-[48%]'>
            <label htmlFor='newPassword'>New Password</label>
            <input type='text' name='newPassword' id='newPassword' readOnly={loading} onChange={HandleChange} className='py-2 px-3 rounded-lg border-none outline-none' value={formData.newPassword} required/>
        </div>
      </div>
      <div className='flex flex-row items-center gap-x-2 justify-end mt-5'>
        <button className=' bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' onClick={HandleSubmit} disabled={loading}>Change</button>
        <button className=' bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' onClick={HandleCancel} disabled={loading}>Cancel</button>
      </div>
    </div>
  )
}

export default ChangePassword;

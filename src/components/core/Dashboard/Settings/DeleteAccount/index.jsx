import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { deleteAccount } from '../../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AccountDelete() {

    const[check,setCheck] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);

    const HandleDelete = (e) => {
        if(!check){
            toast.error("Confirm Account Deletion!");
            return;
        }

        dispatch(deleteAccount(token,navigate));
    }

  return (
    <div className='w-full bg-pink-200 rounded-lg flex items-center py-5 px-8 gap-x-3 mb-10'>
      <div className='rounded-full flex items-center justify-center bg-pink-400 p-3'>
        <RiDeleteBin6Fill className='text-xl' onClick={HandleDelete} />
      </div>
      <div className='flex flex-col gap-y-1'>
        <p>Your All Data Will Be Deleted!</p>
        <div className='flex flex-row items-center gap-x-1'>
            <input type='checkbox' value={check} onChange={() => setCheck(!check)} name='check'/>
            <p>Are Your Sure?</p>
        </div>
      </div>
    </div>
  )
}

export default AccountDelete;

import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/core/Dashboard/SideBar';
import NotificationModal from '../components/common/NotificationModal';
import { useState } from 'react';

function Dashboard() {
  const[modalData,setModalData] = useState(null);

  return (
    <div className='bg-[#f0f9fc] pt-[80px] flex flex-row items-center'>
        <SideBar setModalData={setModalData} />
        <div className=' overflow-x-hidden overflow-y-auto w-[calc(100vw-120px)] h-[calc(100vh-80px)]'>
          <div className='w-11/12 max-w-[1080px] mx-auto mt-10'>
            <Outlet/>
          </div>
        </div>
        {modalData && (<NotificationModal modalData={modalData}/>)}
    </div>
  )
}

export default Dashboard;

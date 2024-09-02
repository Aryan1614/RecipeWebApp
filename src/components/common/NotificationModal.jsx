import React from 'react'

function NotificationModal({modalData}) {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto text-white bg-opacity-10 backdrop-blur-sm'>
      <div className='w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-gray-500 p-6'>
        <p className='text-2xl font-semibold mb-2'>{modalData.heading1}</p>
        <p className='text-lg mb-2'>{modalData.heading2}</p>
        <div className='flex flex-row gap-x-2 mt-2'>
            <button onClick={modalData.btn1handler} className='py-2 px-2 border-2 border-gray-300 rounded-lg'>{modalData.btn1text}</button>
            <button onClick={modalData.btn2handler} className='py-2 px-2 border-2 border-gray-300 rounded-lg'>{modalData.btn2text}</button>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal;

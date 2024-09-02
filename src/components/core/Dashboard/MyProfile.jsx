import { useSelector } from 'react-redux';
import { MdModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { DateConverter } from '../../../utils/TimeStampToDate';

function MyProfile() {
  const {loading} = useSelector((state)=>state.profile);
  const {user} = useSelector((state)=>state.profile);

  return (
    <div className=''>
      <div>
        <h1 className='text-3xl font-semibold underline'>My Profile</h1>
        {
          loading ? (<div className='w-full h-[calc(100vh-220px)] flex items-center justify-center'><div className='loader' /></div>) : (
            <div className='mt-8 flex flex-col gap-y-8 mb-10'>
              <div className='flex flex-row gap-x-5 items-center w-full bg-pink-200 rounded-lg py-4 px-5 relative'>
                <div>
                  <img src={user.image} alt='avatar' className='rounded-full w-20' />
                </div>
                <div>
                  <h1>{user?.firstName} {" "} {user?.lastName}</h1>
                  <p>{user?.email}</p>
                </div>
                <Link className='absolute right-10 top-10 bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' to={"/dashboard/settings"} >Edit<MdModeEditOutline /></Link>
              </div>
              <div className='flex flex-col gap-y-2 justify-center w-full bg-pink-200 rounded-lg py-8 px-5 relative'>
                <h1 className='font-semibold'>About</h1>
                <p>{user?.AdditionalDetails?.About || "Write Something About Yourself"}</p>
                <Link className='absolute right-10 top-10 bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' to={"/dashboard/settings"} >Edit<MdModeEditOutline /></Link>
              </div>
              <div className='flex flex-col gap-y-2 justify-center w-full bg-pink-200 rounded-lg py-8 px-5 relative'>
                <div className='flex flex-col gap-y-2'>
                  <div>
                    <h1 className='font-semibold'>Profile Details</h1>
                  </div>
                  <div className='flex flex-col gap-y-3 mt-3'>
                    <div className='flex flex-row items-center justify-between w-[70%]'>
                      <div className='flex flex-col gap-y-2'> 
                        <h1>Gender</h1>
                        <p>{user?.AdditionalDetails?.Gender || "-"}</p>
                      </div>
                      <div className='flex flex-col gap-y-2'>
                        <h1>Date Of Birth</h1>
                        <p>{DateConverter(user?.AdditionalDetails?.DateOfBirth) || "-"}</p>
                      </div>
                    </div>
                    <div className='flex flex-row items-center justify-between w-[70%]'>
                      <div className='flex flex-col gap-y-2'>
                        <h1>Contact</h1>
                        <p>{user?.AdditionalDetails?.contact || "-"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link className='absolute right-10 top-10 bg-pink-500 text-white border-2 border-pink-50 rounded-lg py-2 px-2 flex flex-row items-center gap-x-2' to={"/dashboard/settings"} >Edit<MdModeEditOutline /></Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MyProfile;

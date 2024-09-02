import React from 'react'
import ProfileDetailsChange from './ProfileDetails';
import ChangePassword from './ChnagePassword';
import AccountDelete from './DeleteAccount';

function Settings() {

  return (
    <div>
      <div>
        <h1 className='text-3xl font-semibold underline'>Edit Profile</h1>
      </div>
      <div>
        <div className='mt-10 flex flex-col gap-y-5'>
          <ProfileDetailsChange/>
          <ChangePassword />
          <AccountDelete />
        </div>
      </div>
    </div>
  )
}

export default Settings;

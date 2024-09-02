import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function AuthTemplate({heading1,heading2,formType}) {
  return (
    <div className=''>
      <div className='w-[500px] flex flex-col gap-2'>
        <h1 className='text-5xl font-bold text-[#3a2b30]'>{heading1}</h1>
        <p className='mt-3 text-xl'>{heading2}</p>
        {
            formType === "Login" ? (<LoginForm/>) : (<SignUpForm/>)
        }
      </div>
    </div>
  )
}

export default AuthTemplate

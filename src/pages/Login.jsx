import React from 'react'
import AuthTemplate from '../components/core/Auth/AuthTemplate'

function Login() {
  return (
    <div className='pt-[100px] h-[calc(100vh-80px)] flex items-center lg:pl-[40px]'>
      <div className=''>
        <AuthTemplate heading1={"Login to Tasteful Recipes"} heading2={"Enter your email and password to access your account."} formType={"Login"} />
      </div>
    </div>
  )
}

export default Login

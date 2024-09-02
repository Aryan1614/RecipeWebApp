import React from 'react'
import AuthTemplate from '../components/core/Auth/AuthTemplate'

function SignUp() {
  return (
    <div className='pt-[180px] h-[calc(100vh-80px)] flex items-center lg:pl-[40px]'>
        <div className=''>
            <AuthTemplate heading1={"Sign Up for Tasteful Recipes"} heading2={"Enter your information to create an account."} formType={"SignUp"} />
        </div>
    </div>
  )
}

export default SignUp

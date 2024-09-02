import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {

    const links = [
        {
            name: "Privacy",
            path: "/policy"
        },
        {
            name: "Terms of Service",
            path: "/terms"
        },
        {
            name: "ContactUs",
            path: "/contact"
        }
    ]

  return (
    <div className='flex items-center justify-center bg-[#e6f2ff] py-6 border-t-2 border-gray-300'>
      <div className='flex flex-row items-center justify-between w-11/12 max-w-[1080px] flex-wrap gap-y-2'>
        <p className=''>© 2024 Tasteful Recipes. All rights reserved.</p>
        <nav className='flex items-center gap-6'>
            {
                links.map((link,index) => (
                    <Link to={link.path} key={index} className='hover:underline'>
                        {link.name}
                    </Link>
                ))
            }
        </nav>
      </div>
    </div>
  )
}

export default Footer

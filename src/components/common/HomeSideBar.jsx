import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI'
import { matchPath } from 'react-router-dom'
import 'animate.css';

function HomeSideBar({active,setActive}) {

    const navLinks = [
        {
            name: "Recipe",
            path: "/recipe"
        },
        {
            name: "ContactUs",
            path: "/contact"
        },
        {
            name: "AboutUs",
            path: "/about"
        }
    ]

    const location = useLocation();
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }

    const HandleLogOut = async() => {
        dispatch(logout(navigate));
    }

  return (
    <div className={`bg-blue-300 w-[280px] h-[calc(100vh-72px)] z-auto ${active ? ("animate__fadeInLeft") : ("animate__fadeInRight")}`}>
        <div className='pl-4 pr-4 pt-4 flex flex-col  w-full'>
            <div>
                <h1 className='text-lg text-center w-full font-semibold underline'>Welcome To Tasteful Recipes</h1>
            </div>
            <div className='flex items-center justify-between mt-8'>
                <h1>Tasteful Recipes</h1>
                <button onClick={() => setActive(!active)}>
                    <RxCross2 />
                </button>
            </div>
            <nav className='flex flex-col justify-center text-md mt-8' >
                {
                    navLinks.map((link,index) => (
                        <Link to={link.path} key={index} className={`${matchRoute(link.path) ? "underline" : ""}`}>
                            {link.name}
                        </Link>
                    ))
                }
            </nav>
            <div className='flex flex-row items-center gap-2 mt-8'>
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className='py-2 px-3 border border-gray-500 flex items-center justify-center bg-blue-200 hover:bg-blue-300 rounded-xl'>SignUp</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='py-2 px-3 flex items-center justify-center rounded-xl bg-pink-300 border-2 border-pink-200'>Login</button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <Link to={"/dashboard/my-profile"}>
                            <button className='py-2 px-3 border border-gray-500 flex items-center justify-center hover:bg-blue-300 rounded-xl'>Dashboard</button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <div>
                            <button className='py-2 px-3 flex items-center justify-center rounded-xl bg-pink-200' onClick={HandleLogOut}>LogOut</button>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default HomeSideBar

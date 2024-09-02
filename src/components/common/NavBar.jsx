import React from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

function NavBar() {

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
    <div className='w-full py-4 bg-[#f0f9fc] flex flex-row justify-center items-center border-b border-gray-200 fixed'>   
        <div className='w-11/12 max-w-[1080px] flex flex-row items-center justify-between'>
            <div>
                <Link to={"/"} className='flex flex-row gap-2 items-center'>
                    <IoFastFoodOutline className='text-3xl' />
                    <p className='font-bold text-2xl'>Tasteful Recipes</p>
                </Link>
            </div>
            <nav className='lg:flex hidden flex-row items-center gap-10 text-md'>
                {
                    navLinks.map((link,index) => (
                        <Link to={link.path} key={index} className={`${matchRoute(link.path) ? "underline" : ""}`}>
                            {link.name}
                        </Link>
                    ))
                }
            </nav>
            <div className='flex items-center gap-4'>
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className='py-2 px-3 border border-gray-500 flex items-center justify-center hover:bg-blue-300 rounded-xl'>SignUp</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='py-2 px-3 flex items-center justify-center rounded-xl bg-pink-200'>Login</button>
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

export default NavBar;

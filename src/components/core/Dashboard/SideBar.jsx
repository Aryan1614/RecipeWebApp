import React from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/operations/authAPI';
import { resetRecipeState } from '../../../slices/RecipeSlice';

function SideBar({setModalData}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    {
      id:1,
      name: "My Profile",
      path: "/dashboard/my-profile",
    },
    {
      id:2,
      name: "Add Recipe",
      path: "/dashboard/addRecipe",
    },
    {
      id:3,
      name: "My Recipe",
      path: "/dashboard/userRecipe",
    },
    {
      id:4,
      name: "Liked Recipe",
      path: "/dashboard/Liked"
    },
    {
      id:4,
      name: "Settings",
      path: "/dashboard/settings"
    }
  ];

  const matchRoute = (route) => {
    return matchPath(route.path,location.pathname);
  }

  return (
    <div className='overflow-hidden bg-[#f0f9fc] border-r-2 border-gray-200 h-[calc(100vh-80px)] w-[220px] pt-10'>
      <div className='flex flex-col gap-y-1 mx-auto items-center'>
        {
          links.map((link,index) => (
            <Link to={link.path} key={index} onClick={() => dispatch(resetRecipeState())} className={`${matchRoute(link) ? "bg-pink-200 text-black" : ""} w-full text-center py-2`}>
              {link.name}
            </Link>
          ))
        }

        <div className='mt-2'>
          <button 
          onClick={() => 
            setModalData({
              heading1: "Are you sure?",
              heading2: "You will be logged out of your account.",
              btn1text: "Logout",
              btn2text: "Cancel",
              btn1handler: () => dispatch(logout(navigate)),
              btn2handler: () => setModalData(null),
            })
          }>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default SideBar;

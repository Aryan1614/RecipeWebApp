import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteRecipe, fetchAllRecipes } from '../../../services/operations/recipeAPI';
import NotificationModal from '../../common/NotificationModal';
import RecipeCard from './RecipeCard';

function UserRecipes() {

  const {token} = useSelector((state)=>state.auth);
  const[userRecipes,setUserRecipes] = useState(null);
  const dispatch = useDispatch();
  const[loading,setLoading] = useState(true);
  const[modalData,setModalData] = useState(null);
  
  useEffect(()=>{
    const fetchRecipes = async() => {
      const response = await fetchAllRecipes(token,setLoading);

      if(response){
        setUserRecipes(response);
      }
    } 
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const HandleDelete = async(data,setModalData) => {
    const response = await deleteRecipe(data,token,dispatch);
    console.log(response);
    if(response){
      setUserRecipes(response);
      if(setModalData){
        setModalData(null);
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row w-full justify-between'>
        <h1 className='text-3xl font-semibold underline'>My Recipes</h1>
        <Link className='hidden md:flex items-center gap-x-2 py-2 px-3 bg-pink-200 rounded-lg' to={"/dashboard/addRecipe"}><FiPlus /><div>Add  New Recipe</div></Link>
      </div>
      {
        loading ? (<div className='w-full h-[400px] flex items-center justify-center'><div className='loader'></div></div>) : (
          userRecipes && userRecipes.length === 0 ? (<div className='w-full h-[calc(100vh-280px)] flex items-center justify-center'><div className='text-3xl font-semibold'>No Recipe Found!</div></div>) : (
            <div className='w-full rounded-lg mt-10 flex flex-row flex-wrap gap-4 mb-10'>
              {
                userRecipes.map((recipe,index) => (
                  <RecipeCard recipe={recipe} key={index} HandleDelete={HandleDelete} isLikedRecipe={false} setModalData={setModalData}  />
                ))
              }
            </div>
          )
        )
      }
      {modalData && <NotificationModal modalData={modalData} />}
    </div>
  )
}

export default UserRecipes

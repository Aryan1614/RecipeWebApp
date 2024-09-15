import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Image from './AddRecipe/Image';
import {apiconnector} from '../../../services/apiconnector';
import { RecipeTypeEndpoints } from '../../../services/apis';
import countrycode from '../../../Data/countrycode.json';
import Tags from './AddRecipe/Tags';
import Procedure from './AddRecipe/Procedure';
import Ingredients from './AddRecipe/Ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../../services/operations/recipeAPI';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);
  const[RecipeTypes,setRecipeTypes] = useState([]);
  const {editRecipe} = useSelector((state)=>state.Recipe);

  useEffect(() => {
    const fetchRecipeTypes = async() => {
      try{
        const response = await apiconnector("GET",RecipeTypeEndpoints.FETCH_RECIPE_TYPE_API);
        if(!response.data.success){
          throw new Error(response.data.message);
        }
        setRecipeTypes(response.data.AllCategories);
      } catch(error){
        console.log(error);
      }
    }
    if(RecipeTypes.length === 0){
      fetchRecipeTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm();

  const OnSubmit = async(data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("Image",data.Image);
    formData.append("Tags",JSON.stringify(data.Tags));
    formData.append("preparationTime",data.preparationTime);
    formData.append("servings",data.servings);
    formData.append("cookingTime",data.cookingTime);
    formData.append("RecipeType",data.RecipeType);
    formData.append("country",data.country);
    formData.append("Procedure",JSON.stringify(data.Procedure));
    formData.append("Ingredients",JSON.stringify(data.Ingredients));
    dispatch(createRecipe(formData,token,reset,navigate));
  }

  return (
    <div>
      <div>
        <h1 className='text-3xl font-semibold underline'>Add Recipe</h1>
      </div>
      <form onSubmit={handleSubmit(OnSubmit)} className='w-full mt-10 border-2 rounded-lg flex flex-col gap-y-2 px-5 py-5 mb-10'>
        <div className='flex w-full flex-col gap-y-1'>
          <label htmlFor='name'>Recipe Name</label>
          <input 
            id='name' 
            className='py-2 px-3 outline-none border-2 rounded-lg' 
            type='text' 
            {...register("name",{required:true})} 
          />
          {
            errors.name && (
              <span className='text-xs text-black font-semibold'>
                Please Enter Recipe Name
              </span>
            )
          }
        </div>
        <div className='flex w-full flex-col gap-y-1'>
          <label htmlFor='description'>Recipe description</label>
          <textarea 
            id='description' 
            className='py-2 px-3 outline-none border-2 rounded-lg' 
            type='text' 
            {...register("description",{required:true})}
          />
          {
            errors.description && (
              <span className='text-black text-xs font-semibold'>
                Please Enter Recipe Description
              </span>
            )
          }
        </div>
        <Image register={register} getValues={getValues} setValue={setValue} errors={errors} />
        <div className='flex w-full flex-col gap-y-1'>
          <div>
            <label htmlFor='RecipeType'>Recipe Category</label>
          </div>
          <select 
            id='RecipeType' 
            defaultValue=""
            className='py-2 px-3 outline-none border-2 rounded-lg'
            {...register("RecipeType",{
              required:true,
            })}
          >
            <option value="" disabled>Select Recipe Type</option>
            {
              RecipeTypes.map((link,index) => (
                <option key={index} value={link._id}>
                  {link.RecipeName}
                </option>
              ))
            }
          </select>
          {
            errors.RecipeType && (
              <span className='text-black text-xs font-semibold'>
                Please Select RecipeType
              </span>
            )
          }
        </div>
        <div className='flex w-full flex-col gap-y-1'>
          <label htmlFor='servings'>Servings</label>
          <input 
            id='servings' 
            name='servings'
            placeholder='Ex. 2'
            className='py-2 px-3 outline-none border-2 rounded-lg' 
            type='text' 
            {...register("servings",{
              required:true,
            })}
          />
          {
            errors.servings && (
              <span className='text-black text-xs font-semibold'>
                Please Enter Servings
              </span>
            )
          }
        </div>
        <Tags register={register} getValues={getValues} setValue={setValue} errors={errors}  />
        <div className='flex w-full flex-col gap-y-1'>
          <label htmlFor='preparationTime'>Preparation Time</label>
          <input 
            id='preparationTime' 
            className='py-2 px-3 outline-none border-2 rounded-lg' 
            type='text' 
            placeholder='Ex. 10min'
            {...register("preparationTime",{
              required:true,
            })}
          />
          {
            errors.preparationTime && (
              <span className='text-black text-xs font-semibold'>
                Please Enter preparation Time
              </span>
            )
          }
        </div>
        <div className='flex w-full flex-col gap-y-1'>
          <label htmlFor='cookingTime'>Cooking Time</label>
          <input 
            id='cookingTime' 
            className='py-2 px-3 outline-none border-2 rounded-lg' 
            type='text' 
            placeholder='Ex. 30min'
            {...register("cookingTime",{
              required:true,
            })}
          />
          {
            errors.cookingTime && (
              <span className='text-black text-xs font-semibold'>
                Please Enter cooking Time
              </span>
            )
          }
        </div>
        <div className='flex w-full flex-col gap-y-1'>
          <label htmlFor='country'>country</label>
          <select 
            id='country' 
            defaultValue=""
            className='py-2 px-3 outline-none border-2 rounded-lg'
            {...register("country",{
              required:true,
            })}
          >
            <option value="" disabled>Select country</option>
            {
              countrycode.map((link,index) => (
                <option key={index} value={link._id}>
                  {link.country}
                </option>
              ))
            }
          </select>
          {
            errors.RecipeType && (
              <span className='text-black text-xs font-semibold'>
                Please Select RecipeType
              </span>
            )
          }
        </div>
        <Procedure register={register} getValues={getValues} setValue={setValue} errors={errors} />
        <Ingredients register={register} getValues={getValues} setValue={setValue} errors={errors} />
        <div className='flex flex-row gap-x-2 justify-end w-full mt-2'>
          <button
           className='bg-blue-100 rounded-lg py-2 px-2'
          >
            {
              editRecipe ? "Save Changes" : "Add Recipe"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe

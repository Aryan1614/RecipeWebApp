import React from 'react'
import { useForm } from 'react-hook-form';
import Tags from './AddRecipe/Tags';
import Ingredients from './AddRecipe/Ingredients';
import Procedure from './AddRecipe/Procedure';
import Image from './AddRecipe/Image';
import countrycode from '../../../Data/countrycode.json';
import { useState,useEffect } from 'react';
import { apiconnector } from '../../../services/apiconnector';
import { RecipeTypeEndpoints } from '../../../services/apis';
import { fetchRecipeInformation, updateRecipe } from '../../../services/operations/recipeAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { setEditRecipe, setRecipe } from '../../../slices/RecipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function UpdateRecipe() {

    const {
        register,
        formState: {errors},
        getValues,
        setValue,
        handleSubmit
    } = useForm();  

    const[RecipeTypes,setRecipeTypes] = useState([]);
    const[recipe,setRecipeData] = useState({});
    const {recipeId} = useParams();
    const[loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);

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
    },[]);

    useEffect(()=>{
        const fetchDetails = async() => {
            const response = await fetchRecipeInformation({RecipeId:recipeId},setLoading);
            if(response){
                setRecipeData(response);
                dispatch(setRecipe(response));
                dispatch(setEditRecipe(true));
            }
        }
        fetchDetails();
    },[]);

    useEffect(()=>{
        const addvalues = () => {
            setValue("name",recipe.name);
            setValue("description",recipe.description);
            setValue("Image",recipe.Image);
            setValue("cookingTime",recipe.CookingTime);
            setValue("preparationTime",recipe.PreparationTime);
            setValue("Procedure",recipe.Procedure);
            setValue("Ingredients",recipe.Ingredients);
            setValue("country",recipe.country);
            setValue("Tags",recipe.Tags);
            setValue("servings",recipe.servings);
            setValue("RecipeType",recipe.RecipeType);
        }
        addvalues();
        console.log(recipe.country);
    },[recipe]);

    const updated = () => {
        const currValues = getValues();
        if(
            recipe.name !== currValues.name ||
            recipe.description !== currValues.description || 
            recipe.Image !== currValues.Image ||
            recipe.Tags.toString() !== currValues.Tags.toString() || 
            recipe.CookingTime !== currValues.cookingTime|| 
            recipe.PreparationTime !== currValues.preparationTime || 
            recipe.Procedure.toString() !== currValues.Procedure.toString() || 
            recipe.Ingredients.toString() !== currValues.Ingredients.toString() || 
            recipe.RecipeType._id !== currValues.RecipeType._id || 
            recipe.servings !== currValues.servings ||
            recipe.country !== currValues.country
          )
        {   
            return true;
        } 
        return false;
    }

    const OnSubmit = async(data) => {
        if(updated()){
            const currValues = getValues();
            const formData = new FormData();
            formData.append("recipeId",recipeId);
            if(recipe.name !== currValues.name){
                formData.append("name",data.name);
            }
            if(recipe.description !== currValues.description){
                formData.append("description",data.description);
            }
            if(recipe.Image !== currValues.Image){
                formData.append("Image",data.Image);
            }
            if(recipe.Tags.toString() !== currValues.Tags.toString()){
                formData.append("Tags",JSON.stringify(data.Tags));
            }
            if(recipe.CookingTime !== currValues.cookingTime){
                formData.append("cookingTime",data.cookingTime);
            }
            if(recipe.PreparationTime !== currValues.preparationTime){
                formData.append("preparationTime",currValues.preparationTime);
            }
            if(recipe.Procedure.toString() !== currValues.Procedure.toString()){
                formData.append("Procedure",JSON.stringify(data.Procedure));
            }
            if(recipe.Ingredients.toString() !== currValues.Ingredients.toString()){
                formData.append("Ingredients",JSON.stringify(data.Ingredients));
            }
            if(recipe.servings !== currValues.servings){
                formData.append("servings",data.servings);
            }
            if(recipe.country !== currValues.country){
              formData.append("country",data.country);
            }
            if(recipe.RecipeType._id !== currValues.RecipeType._id){
                formData.append("RecipeType",data.RecipeType);
            }
            await updateRecipe(formData,token,navigate,dispatch,setLoading);
        }
        else{
            toast.error("Form Not Updated!");
            return;
        }
    }

  return (
    <div>
      <div>
        <h1 className='text-3xl font-semibold underline'>Edit Recipe</h1>
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
        <Ingredients register={register} getValues={getValues} setValue={setValue} errors={errors} />
        <Procedure register={register} getValues={getValues} setValue={setValue} errors={errors} />
        <div className='flex flex-row gap-x-2 justify-end w-full mt-2'>
          <button
           className='bg-blue-100 rounded-lg py-2 px-2'
           type='submit'
           disabled={loading}
          >
            {
              loading ? "Loading..." : "Save Changes"
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateRecipe;

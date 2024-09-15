import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';

function Ingredients({register,setValue,getValues,errors}) {

    const[ingredients,setIngredients] = useState([]);
    const {editRecipe,recipe} = useSelector((state)=>state.Recipe);
    const[ingredient,setIngredient] = useState("");


    const HandleChange = (e) => {
        setIngredient(e.target.value);
    }

    useEffect(()=>{
        if(editRecipe){
            setIngredients(recipe?.Procedure);
        }
        register("Ingredients",{required:true,validate:(value) => value.length>0});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recipe]);

    useEffect(()=>{
        setValue("Ingredients",ingredients);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ingredients]);

    const HandleDelete = (idx) => {
        const newSteps = ingredients.filter((_,index)=> index!==idx); 
        setIngredients(newSteps);
    }

    const HandleAdd = (e) => {
        e.preventDefault();
        if(ingredient === ""){
            toast.error("Step Required");
            return;
        }

        const newProcedure = [...ingredients,ingredient];
        setIngredients(newProcedure);
        setIngredient("");
    }

  return (
    <div className='flex w-full flex-col gap-y-1'>
        <label htmlFor='Ingredients'>Ingredients</label>
        <div className='w-full relative'>
            <input 
                id='Ingredients' 
                name='Ingredients'
                className='py-2 px-3 outline-none border-2 rounded-lg w-full' 
                type='text' 
                value={ingredient}
                onChange={HandleChange}
                placeholder='Enter Steps For Procedure'
            />
            <button type='submit' onClick={HandleAdd} className='absolute right-3 top-2'>Add</button>
        </div>
        {
            errors.Procedure && (
                <span className='text-black text-xs font-semibold'>
                    Ingredients Required!
                </span>
            )
        }
        {
            ingredients && ingredients.length > 0 && (
                <ul className='w-full flex flex-col justify-center gap-y-2 mb-2 mt-2'>
                    {
                        ingredients.map((step,index)=>(
                            <li className='flex flex-row items-center gap-x-2 py-1 px-2 text-xs' key={index}>
                                <span>{step}</span>
                                <span className='cursor-pointer' onClick={() => HandleDelete(index)}>clear</span>
                            </li>
                        ))
                    }
                </ul>
            )
        }
    </div>
  )
}

export default Ingredients;

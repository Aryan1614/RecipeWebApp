import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';

function Procedure({register,setValue,errors}) {

    const[steps,setSteps] = useState([]);
    const[stepVar,setStepvar] = useState("");
    const {editRecipe,recipe} = useSelector((state)=>state.Recipe);

    const HandleChange = (e) => {
        setStepvar(e.target.value);
    }

    useEffect(()=>{
        if(editRecipe){
            setSteps(recipe?.Procedure);
        }
        register("Procedure",{required:true,validate:(value) => value.length>0});
    },[recipe]);

    useEffect(()=>{
        setValue("Procedure",steps);
    },[steps]);

    const HandleDelete = (idx) => {
        const newSteps = steps.filter((_,index)=> index!==idx); 
        setSteps(newSteps);
    }

    const HandleAdd = (e) => {
        e.preventDefault();
        if(stepVar === ""){
            toast.error("Step Required");
            return;
        }
        const newProcedure = [...steps,stepVar];
        setSteps(newProcedure);
        setStepvar("");
    }

  return (
    <div className='flex w-full flex-col gap-y-1'>
        <label htmlFor='Procedure'>Procedure</label>
        <div className='w-full relative'>
            <input 
                id='Procedure' 
                name='Procedure'
                className='py-2 px-3 outline-none border-2 rounded-lg w-full' 
                type='text' 
                value={stepVar}
                onChange={HandleChange}
                placeholder='Enter Steps For Procedure'
            />
            <button onClick={HandleAdd} type='submit' className='absolute right-3 top-2'>Add</button>
        </div>
        {
            errors.Procedure && (
                <span className='text-black text-xs font-semibold'>
                    Procedure Required!
                </span>
            )
        }
        {
            steps && steps.length > 0 && (
                <ul className='w-full flex flex-col justify-center gap-y-2 mb-2 mt-2'>
                    {
                        steps.map((step,index)=>(
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

export default Procedure;

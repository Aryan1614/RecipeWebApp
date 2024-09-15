import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

function Tags({errors,setValue,register}) {

    const[Tags,setTags] = useState([]);
    const {editRecipe,recipe} = useSelector((state)=>state.Recipe);

    const HandleDelete = (tagIndex) => {
        const newTags = Tags.filter((_, index) => index !== tagIndex);
        setTags(newTags);
    }

    useEffect(()=>{
        if(editRecipe){
            setTags(recipe?.Tags);
        }
        register("Tags",{required:true,validate:(value) => value.length > 0});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recipe]);

    useEffect(()=>{
        setValue("Tags",Tags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Tags]);

    const HandleKeyDown = (e) => {
        if(e.key === "Enter" || e.key === ","){
            e.preventDefault();
            const tag = e.target.value.trim();
            if(tag && !Tags.includes(tag)){
                const newTags = [...Tags,tag];
                setTags(newTags);
                e.target.value ="";
            }
        }
    }

  return (
    <div className='flex w-full flex-col gap-y-1'>
        <label htmlFor='desc'>Tags</label>
        {
            Tags?.length > 0 && (
                <div className='w-full flex flex-row items-center gap-x-2 flex-wrap gap-y-2 mb-2 mt-2'>
                    {
                        Tags.map((tag,index)=>(
                            <div className='flex flex-row items-center gap-x-2 bg-blue-100 py-1 px-2 rounded-lg text-xs' key={index}>
                                <span>{tag}</span>
                                <span className='cursor-pointer' onClick={() => HandleDelete(index)}><RxCross2 /></span>
                            </div>
                        ))
                    }
                </div>
            )
        }
        <input 
            id='Tags' 
            name='Tags'
            className='py-2 px-3 outline-none border-2 rounded-lg' 
            type='text' 
            onKeyDown={HandleKeyDown}
            placeholder='Press Enter Or Enter , to Add Tag'
        />
        {
            errors.Tags && (
                <span className='text-black text-xs font-semibold'>
                    Please Enter Tags
                </span>
            )
        }
    </div>
  )
}

export default Tags

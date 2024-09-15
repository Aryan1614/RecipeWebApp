import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Image({ register, setValue, errors }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const {editRecipe,recipe} = useSelector((state)=>state.Recipe);

  // Register the input field with react-hook-form
  useEffect(() => {
    register("Image", { required: true });
  }, [register]);

  useEffect(()=>{
    if(editRecipe){
      setPreview(recipe?.Image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[recipe]);

  // Set the selected file in react-hook-form and update preview when the file changes
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setValue("Image", selectedFile);

      // Clean up the URL object when the component is unmounted or the file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile, setValue]);

  // Handle file change and set the selected file
  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex w-full flex-col gap-y-1">
      <label htmlFor="Image">Recipe Image</label>
      <input
        id="Image"
        className="py-2 px-3 outline-none border-2 rounded-lg"
        type="file"
        placeholder="Select Image"
        ref={inputRef}
        onChange={handleChange}
      />
      {errors.Image && (
        <span className="text-black text-xs font-semibold">
          Please select a Recipe Image
        </span>
      )}
      {preview && (
        <img
          src={preview}
          alt="Selected Preview"
          className="mt-2 w-32 h-32 object-cover"
        />
      )}
    </div>
  );
}

export default Image;

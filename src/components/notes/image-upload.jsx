import { Button, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageUpload = ({handleImageUpload, loading = false, handleCloseModal}) => {
    const [newUrl, setNewUrl] = useState('');
    const [cropper, setCropper] = useState(null)
    const getNewUrl = (e) => {
        if (e.target.files) {
            setNewUrl(URL.createObjectURL(e.target.files[0]));
        }
    }
    const getCropData = async () => {
        if (cropper) {
          const file = await fetch(cropper.getCroppedCanvas().toDataURL())
            .then((res) => res.blob())
            .then((blob) => {
              return new File([blob], "croppedImage.png", { type: "image/png" });
            });
          if (file) {
            handleImageUpload(file);
            handleCloseModal()
          }
        }
      };
  return (
    <div style={{width:'700px', maxHeight:'500px'}}>
    <Typography className='text-2xl text-center mt-2 mb-3'>Upload Image</Typography>
      <form className='my-2' onSubmit={(e) => e.preventDefault()}>
        <input disabled={loading} onChange={getNewUrl} accept="image/png, image/jpeg, image/jpg" type="file" name="" id="" />
      </form>
      <div className='w-full h-full'>
      <Cropper
        disabled={loading}
        style={{width:'100%', maxHeight:'300px'}}
        src={newUrl}
        initialAspectRatio={4 / 3}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        guides={false}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      </div>
      <div className='flex justify-center items-center'>
      {
        newUrl && <Button className='my-2' onClick={getCropData}>Crop and Extract Text</Button>
      }
      </div>
    </div>
  )
}

export default ImageUpload

import React from "react";
import Popup from "reactjs-popup";
import { useRef } from 'react';
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPhoto, setIsAdded } from "../photoSlice"
export const AddPhotoPopup = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [label, setLabel] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e, close) => {
        e.preventDefault();
        const form = file;
        if(form && label)
            form.append("label", label);
        else {
            console.log("Check all fields!");
            return;
        }
        close();
        try{
            const response = await fetch("http://localhost:8000/photo/add", {
                method:"POST",
                body: file
            });
            setIsAdded({flag: false});
            const savedImage = await response.json();
            dispatch(addPhoto({photo: savedImage.savedImage}));
            setIsAdded({flag: true});
            setLabel('');
            setFileName('');
            setFile(null);
        } catch(err){
            console.log("Failed to add image! ", err);
        }
    }
    const handleChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        const form = new FormData();
        form.append("picturePath", fileObj.name);
        form.append("picture", fileObj);
        setFileName(fileObj.name);
        if(!label) setLabel(fileObj.name);
        setFile(form);
  }

  return(
    <Popup trigger= 
        {
            <button className="addPhoto">
                Add a photo
            </button>   
        }
        modal
        closeOnDocumentClick
    >
        { close => (
            <div className="modal">
                <Typography className="title" gutterBottom>
                    Add a new photo
                </Typography>
                <div className="content">
                    {' '}
                    <form onSubmit={(e)=>handleSubmit(e,close)}>
                        <label className="label" htmlFor="label" aria-label="Label">Label</label><br />
                        <input placeholder="Add a label" value={label ? label : ""} className="label" onChange={(e)=>setLabel(e.target.value)}id="label" name="label" type="text" /> <br /><br />
                        <label className="photo" htmlFor="photo" aria-label="photo">Photo</label><br />
                        <input ref={inputRef} id="photo" name="photo" onChange={handleChange} type="file" style={{display:"none"}} />
                        <div style={{display:"flex"}}>
                            <input disabled value={`${fileName ? fileName : "Upload a file"}`} />
                            <Button  variant="outlined" sx={{marginLeft:"2rem"}} onClick={()=>inputRef.current.click()}> choose image</Button>
                        </div>
                        <div className="btns" style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className="close" onClick={close}>Cancel</button>
                            <button className="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )}   
    </Popup>
  );
};

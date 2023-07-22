import React from 'react'
import {IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import {updatePhotos} from "../photoSlice";
import { useDispatch } from 'react-redux';
const Content = () => {
    const initialPhotoList = useSelector((state)=>state.photoList);
    const photoList = [...initialPhotoList];
    const isAdded = useSelector((state)=>state.isAdded);
    const dispatch = useDispatch();
    const handleDelete = async (_id) => {
    
        console.log(_id);
        const response = await fetch(`http://localhost:8000/photo/${_id}`, {
                method:"DELETE",
            }
        );
        const { photos } = await response.json();
        dispatch(updatePhotos({photoList: photos}));
    }
    return (
        <main>
            {
                photoList && isAdded && <ImageList variant="masonry" cols={3} gap={46} >
                    {photoList.reverse().map((item) => (
                        <ImageListItem key={item._id} className='imageListItem'>
                            <ImageListItemBar 
                                className='imageListItemBar'
                                position='top'
                                sx={{
                                    background:
                                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                  }}
                                actionIcon={
                                    <IconButton aria-label={`delete ${item.label}`} onClick={()=>handleDelete(item._id)} >
                                        <DeleteIcon color='error'/>
                                    </IconButton>
                                }
                            />
                            <img className='images'
                                src={`http://localhost:8000/uploads/${item.picturePath}?w=248&fit=crop&auto=format`} 
                                srcSet={`http://localhost:8000/uploads/${item.picturePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.label}
                                loading="lazy"
                                id={item._id}
                                style={{borderRadius:"16px"}}
                            />
                            <ImageListItemBar
                                className='imageListItemBar'
                                sx={{
                                    background:
                                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                  }}
                                title={item.label}
                            />
                        </ImageListItem>
                    ))}        
                </ImageList>
            }
            {!photoList && <h1>Add photos to display!</h1>}
        </main>
    )
}

export default Content
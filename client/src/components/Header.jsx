import React from 'react'
import {Box, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AddPhotoPopup } from './PopUp';
import { useDispatch } from 'react-redux';
import { updatePhotos } from '../photoSlice';

const Header = () => {
  const dispatch = useDispatch();
  const handleSearch = async (e) =>{
    const label = e.target.value;
    const item = JSON.stringify({label});

    const response = await fetch("http://localhost:8000/search", {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:item,
    });
    
    const photos = await response.json();
    dispatch(updatePhotos({photoList: photos.photos}));
  }
  return (
    <header className="header">
        <Box className="searchBar" sx={{ display: 'flex ', alignItems: 'flex-end'}}>
          <img className="logo" src="assets/my_unsplash_logo.svg" alt="hello" />
          <div className='searchBar'>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search" variant="standard" sx={{width:300}} onChange={handleSearch} />
          </div>
          <AddPhotoPopup />
        </Box>      
    </header>
  )
}

export default Header;
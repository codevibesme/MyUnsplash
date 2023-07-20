import React from 'react'
import { Button } from '@mui/material';
import { useRef } from 'react';
import {Box, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const Header = () => {
  const handleChange = async (e) => {
    const fileObj = e.target.files && e.target.files[0];
    const form = new FormData();
    form.append("label", fileObj.name);
    form.append("picture", fileObj);
    const response = await fetch("http://localhost:8000/photo/add", {
      method:"POST",
      body: form
    });
    const { savedImage } = await response.json();
    console.log(savedImage);
  }

  const handleClick = () => {
    inputRef.current.click();
  }

  const inputRef = useRef(null);

  return (
    <header className="header">
        
        {/* <input type="file" ref={inputRef} onChange={handleChange} /> */}
        <Box className="searchBar" sx={{ display: 'flex ', alignItems: 'flex-end'}}>
          <img className="logo" src="assets/my_unsplash_logo.svg" alt="hello" />
          <div className='searchBar' >
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search" variant="standard" sx={{width:300}} />
          </div>
          <button className="addPhoto" variant="contained" onClick={handleClick}>
            Add a photo
          </button>
        </Box>
          
        
              
    </header>
  )
}

export default Header
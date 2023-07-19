
import { Button } from '@mui/material';
import { useRef } from 'react';


function App() {
  const handleChange = async (e) => {
    const fileObj = e.target.files && e.target.files[0];
    const form = new FormData();
    form.append("label", fileObj.name);
    form.append("picture", fileObj);
    const response = await fetch("http://localhost:8000/photo/add", {
      method:"POST",
      body: form
    });
    if(response){
      console.log(response.json().label);
    } else{
      console.log("Not posted!!!");
    }

  }
  const onClick = () => {
    inputRef.current.click();
  }
  const inputRef = useRef(null);
  return (
    <div className="App">
      <input type="file" ref={inputRef} onChange={handleChange} />
      <Button variant="contained" onClick={onClick}>
        Upload
      </Button>      
    </div>
  );
}

export default App;

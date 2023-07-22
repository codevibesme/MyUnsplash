import Header from './components/Header';
import Content from './components/Content';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updatePhotos } from './photoSlice';
function App() {
  const dispatch = useDispatch();

  const getPhotos = async(state)=>{
    const response  = await fetch("http://localhost:8000/photo", {
        method:"GET"
    });
    const photos = await response.json();
    const photoList = photos.photos;
    dispatch(updatePhotos({photoList}));
    setShow(true);
  };
  const [show, setShow] = useState(false);
  useEffect(()=>{
    getPhotos();
    
  },[]) // eslint-disable-line react-hooks/exhaustive-deps 
  return (
    <div className="app">
      <Header />
      {show && <Content />}
    </div>
  );
}

export default App;

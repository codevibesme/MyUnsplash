import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    photoList: [],
    isAdded: true
}
export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers:{
        addPhoto: (state, action) => {
            state.photoList.push(action.payload.photo);
        },
        updatePhotos: (state, action) =>{
            state.photoList=action.payload.photoList;
        },
        setIsAdded: (state, action) =>{
            state.isAdded = action.payload.flag;
        }
    }
});
export const { updatePhotos, addPhoto, setIsAdded } = photoSlice.actions;
export default photoSlice.reducer;
import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    label:{
        required: true,
        type:String,
    },
    picturePath:{
        required: true,
        type:String,
    }
})
const Image = mongoose.model("Image", imageSchema);
export default Image;

import Image from "../model/Image.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const getPhotos = async(req, res) => {
    try{
        const photos = await Image.find();
        res.status(200).json({photos: photos});
    } catch(err) {
        res.status(404).json({error: err});
    }
}
export const addPhoto = async (req, res) => {
    try{
        const { label } = req.body;
        const newImage = new Image({label});
        const savedImage = await newImage.save();
        console.log(savedImage);
        res.status(200).json({savedImage});
    } catch(err){
        res.status(403).json({error: err});
    }
}

export const deletePhoto = async (req, res) => {
    const {_id} = req.params;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    if(!_id){
        res.status(404).json({error: "Invalid request!"});
        return;
    }
    try{
        const image = await Image.findById({_id}).exec();
        fs.unlinkSync(`public/assets/${image.label}`);
        console.log("Photo deleted");
        await Image.deleteOne({_id });
        res.status(200).json({msg: "Success in deletion"});
    } catch(err){
        res.status(401).json({error: err});
    }
}
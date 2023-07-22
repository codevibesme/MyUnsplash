import Image from "../model/Image.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const getPhotos = async(req, res) => {
    try{
        const photos = await Image.find();
        return res.status(200).json({photos});
    } catch(err) {
        res.status(404).json({error: err});
    }
}
export const addPhoto = async (req, res) => {
    try{
        const { label, picturePath } = req.body;
        const newImage = new Image({label, picturePath});
        const savedImage = await newImage.save();
        res.status(200).json({savedImage});
    } catch(err){
        res.status(403).json({error: err});
    }
}

export const deletePhoto = async (req, res) => {
    const {_id} = req.params;
    if(!_id){
        res.status(404).json({error: "Invalid request!"});
        return;
    }
    try{
        const image = await Image.findById({_id}).exec();
        fs.unlinkSync(`public/assets/${image.picturePath}`);
        await Image.deleteOne({_id });
        const photos = await Image.find({}).exec();
        res.status(200).json({photos});
    } catch(err){
        res.status(401).json({error: err});
    }
}
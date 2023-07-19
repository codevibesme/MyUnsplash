import Image from "../model/Image.js";
export const searchPhotos = async (req, res) => {
    try{
        const { label } = req.body;
        const photos = await Image.find({label}).exec();
        res.status(200).json({photos: photos});
    } catch(err){
        res.status(401).json({error: err});
    }
}
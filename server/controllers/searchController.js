import Image from "../model/Image.js";
export const searchPhotos = async (req, res) => {
    try{
        const { label } = req.body;
        let photos = await Image.find({}).exec();
        photos = await photos.filter((item)=>(item.label.includes(label)));
        res.status(200).json({photos});
    } catch(err){
        res.status(401).json({error: err.message});
    }
}
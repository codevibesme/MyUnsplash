import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import photoRoutes from "./routes/photoRoute.js";
import { addPhoto } from "./controllers/photoController.js";
import { searchPhotos } from "./controllers/searchController.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use("/uploads", express.static(path.join(__dirname, "public/assets")));

//FILE STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

// UPLOAD PICTURE
app.post("/photo/add", upload.single("picture"), addPhoto);

//OTHER ROUTES
app.use("/photo", photoRoutes);
app.post("/search", searchPhotos);

// CONNECT TO DB AND START SERVER
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, ()=>console.log(`Server up and running at port: ${PORT}.`));
}).catch((error)=>console.log(`${error} did not connect to server!`));
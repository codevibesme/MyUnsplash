import express from "express";
import { deletePhoto, getPhotos } from "../controllers/photoController.js";
const router = express.Router();
router.get("/", getPhotos);
router.delete("/:_id", deletePhoto);

export default router;
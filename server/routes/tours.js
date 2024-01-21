import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from "../controllers/tourControllers.js";

const router = express.Router()

//create new tour
router.post('/create', createTour)

//update new tour
router.put('/:id', updateTour)

//delete new tour
router.delete('/:id', deleteTour)


//getsingle new tour
router.get('/:id', getSingleTour)

//get all tour
router.get('/', getAllTour)

//get tour by search
router.get("/search/",getTourBySearch);


//get featured tours
router.get("/search/featured/",getFeaturedTour);

//get tour count
router.get("/search/count/",getTourCount);



export default router;
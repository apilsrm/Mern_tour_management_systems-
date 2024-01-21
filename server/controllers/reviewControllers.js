
import Tour from "../models/tourModel.js"
import Review from "../models/reviewModel.js"

export const createReview = async( req , res) => {

    const tourId = req.params.tourId
    const newReview = new Review({ ... req.body})

    try {
        const savedReview = await newReview.save();

        //after creating a new review now update the reviews array ofthe tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews : savedReview._id}
        });

        res.status(200).json({ success : true, message : " Review submitted", data : savedReview});
    } catch (error) {
        res.status(500).json({ success : false, message : " fail to submit "});
    }
}
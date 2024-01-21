import Tour from "../models/tourModel.js"


//create new tour

export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: "Sucessfully created",
            data: savedTour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Please tyr again "
        })
        
    }
}

//update tour

export const updateTour = async (req, res) => {

    const id = req.params.id

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({
            success: true,
            message: "update successfully",
            data: updatedTour,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Please tyr again "
        })
    }
}

//delete tour

export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try { 
        const deletedTour = await Tour.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "delete successfully",
    });
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to delete. Please tyr again "
    })
}
}


//getSingle tour

export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try { 
        const getedsingleTour = await Tour.findById(id);

    res.status(200).json({
        success: true,
        message: " successfully get",
        data: getedsingleTour,
    });
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to get. Please tyr again "
    })
}
}

//getAll tour

export const getAllTour = async (req, res) => {

    //for pagination
     const page = parseInt(req.query.page);
     
     console.log(page);


    try { 
        const getedAllTour = await Tour.find({}).skip(page * 9).limit(8);

    res.status(200).json({
        success: true,
        count: getedAllTour.length, //It counts how many pages are shown
        message: " successfully get all items",
        data: getedAllTour,
    });
    
} catch (error) {
    res.status(404).json({
        success: false,
        message: "Failed to get. Please tyr again "
    })
}
}

//get tours by search
export const getTourBySearch = async(req, res) =>
{


    const city = new RegExp(req.query.city, "i"); // i means case sensative
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);


    try {
        
        const tours = await Tour.find({
            city,
            distance :{ $gte : distance },
            maxGroupSize :{$gte : maxGroupSize},
        }).populate('reviews')
         
        res
         .status(200)
         .json({
           success: true,
           message: " Sucessfully get ",
          data : tours,
         });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to get. Please tyr again "
        })
    }
}

//get featured  tour
export const  getFeaturedTour = async(req,res)=> {
 
    try {
        
        const gFeaturedTour = await Tour.find({ featured : true }).populate('reviews').limit(8);
        res
         .status(200)
         .json({
           success: true,
           count : gFeaturedTour.length, //It counts how many pages are shown
           message: " Sucessfully get ",
          data : gFeaturedTour,
         });

    } catch (err) {
        res
        .status(404)
        .json({
          success: false,
          message: " Not found  . Try again ",
        });
    }
  }


  //get toour count
  export const getTourCount = async(req,res)=> {
    try {
        const tourCount = await Tour.estimatedDocumentCount;
        res
         .status(200)
         .json({
           success: true,
           message: " Sucessfully get ",
          data : tourCount,
         });
    } catch (error) {
        res
        .status(500)
        .json({
          success: fail,
          message: " failed to count/fetch ",
        });
        
    }
  }
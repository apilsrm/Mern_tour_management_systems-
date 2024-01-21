
import Booking from "../models/bookingModel.js";


//create newbooking 
export const createBooking = async(req, res) => {
    const newBooking = new Booking(req.body)
try {
    const savedBooking = await newBooking.save()

    res.status(200).json({ success: true , message : "Your toor is booked", data:savedBooking } )


    
    
} catch (error) {
 
    res.status(500).json({ success: false, message : "failed to  book Server error!!"} )
    
}
};

//get single booking  
export const getBooking = async(req, res) => {
    const id = req.params.id;
try {
    const book = await Booking.findById(id);

    res.status(200).json({ success: true , message : "Successfull", data:book } );


    
    
} catch (error) {
 
    res.status(404).json({ success: false, message : "Not found"} );
    
}
};

//get Allbooking  
export const getAllBooking = async(req, res) => {
try {
    const books = await Booking.find();

    res.status(200).json({ success: true , message : "Successfull", data: books} );


    
    
} catch (error) {
 
    res.status(500).json({ success: false, message : " Server error!!Not found"} );
    
}
};
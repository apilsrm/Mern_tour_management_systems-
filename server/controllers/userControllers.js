import User from "../models/userModel.js"




//create new User

export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: "Sucessfully created",
            data: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Please tyr again "
        })
        
    }
}

//update User

export const updateUser = async (req, res) => {

    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({
            success: true,
            message: "update successfully",
            data: updatedUser,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Please tyr again "
        })
    }
}

//delete User

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try { 
        const deletedUser = await User.findByIdAndDelete(id);

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


//getSingle User

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try { 
        const getedsingleUser = await User.findById(id);

    res.status(200).json({
        success: true,
        message: " successfully get",
        data: getedsingleUser,
    });
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Failed to get. Please tyr again "
    })
}
}

//getAll User

export const getAllUser = async (req, res) => {
    try { 
        const getedAllUser = await User.find({});

    res.status(200).json({
        success: true,
        count: getedAllUser.length, //It counts how many pages are shown
        message: " successfully get all items",
        data: getedAllUser,
    });
    
} catch (error) {
    res.status(404).json({
        success: false,
        message: "Failed to get. Please tyr again "
    })
}
}
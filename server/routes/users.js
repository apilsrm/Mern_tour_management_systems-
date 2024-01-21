import express  from 'express';
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userControllers.js';
const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


//create user
router.post("/", createUser);

//update User
router.put('/:id', verifyUser, updateUser);


//delete User
router.delete('/:id', verifyUser, deleteUser);

//GetSingleUser
//router.get('/:id', getSinglUser);//before using authentication
router.get('/:id',verifyUser, getSingleUser);   



//GetALL User
router.get('/', verifyAdmin, getAllUser);



// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


// //update User
// router.put('/:id', verifyUser ,updateUser);


// //delete User
// router.delete('/:id', verifyUser ,deleteUser);

// //GetSingleUser
// //router.get('/:id', getSinglUser);//before using authentication
// router.get('/:id',verifyUser , getSinglUser);   



// //GetALL User
// router.get('/', verifyAdmin,getAllUser);

export default router;

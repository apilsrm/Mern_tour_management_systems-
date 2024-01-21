
import express from "express"
// import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors";
import cors from "cors"
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js"
import userRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/booking.js";





//configuration
const app = express();
dotenv.config();
const corsOptions = {
    origin : true,
    credentials : true
  }

//for testing on web localhost:port4000
app.get("/", (req, res) => {
    res.send("Yes api is working properly")
})

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// //always use here
// app.use(morgan("dev"));

//cors usee
// app.use(cors());
app.use(cors(corsOptions)); //after corsOption

app.use(cookieParser());

//handle uncaughtexception
// process.on("uncaughtException",(err)=>{
process.on(" ",(err)=>{
    console.log(`Error:${err.message}.cyan`)
    console.log(`Shutting down the server to handle unCaughtException`)
    process.exit(1)
})


// //database connect
connectDB();




// routes---routing
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/booking", bookingRoute);


// app.use("/api/v1",userRoute);


// app.use("/gallery",express.static("public/gallery"));


//always route ko tala
//custom error handling
// app.use(errorListening);

//handled promise rejection
const PORT = process.env.PORT
const server = app.listen(PORT, ()=>{
    console.log(`Server is running at: http://localhost:${PORT}`.cyan.underline.bold)
})

// process.on("unhandledRejection",(err)=> {

process.on(" ",(err)=> {
    console.log(`Error:${err.message}.red`)
    console.log(`Shutting down the server to handle promise rejection`)
    server.close(()=> {
        process.exit(1)
    })
})
const express=require("express")
const cookieParser=require('cookie-parser')
const dotenv=require("dotenv")
const morgon=require('morgan')
const app=express()
const cors=require('cors')
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const path=require('path')
const dbconnect = require("./config/connection");

dotenv.config();
dbconnect.dbconnect();

//cross origin resourse sharing
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
  }));

app.use(morgon("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//remove cache
app.use((req, res, next) => {
    res.header("Cache-Control", "no-cache,  no-store, must-revalidate");
    next();
  });

  app.use("/",userRouter)
  app.use("/admin",adminRouter)


  app.listen(process.env.PORT, () => {
    console.log("Server started listening to port");
  });
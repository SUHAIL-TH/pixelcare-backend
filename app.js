// const express = require("express")
// const cookieParser = require('cookie-parser')
// const dotenv = require("dotenv")
// const morgon = require('morgan')
// const app = express()
// const cors = require('cors')
// const adminRouter = require("./routes/admin");
// const userRouter = require("./routes/user");
// const professionalRouter = require("./routes/professional")
// const path = require('path')
// const dbconnect = require("./config/connection");

// dotenv.config();
// dbconnect.dbconnect();

// //cross origin resourse sharing
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:4200'
// }));
// app.use('/public/images', express.static('public/images'));
// app.use(morgon("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //remove cache
// app.use((req, res, next) => {
//   res.header("Cache-Control", "no-cache,  no-store, must-revalidate");
//   next();
// });

// app.use("/", userRouter)
// app.use("/professional", professionalRouter)
// app.use("/admin", adminRouter)


// app.listen(process.env.PORT, () => {
//   console.log("Server started listening to port");
// });

const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app); // Create HTTP server
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const professionalRouter = require("./routes/professional");
const path = require('path');
const dbconnect = require("./config/connection");
const intializeSocket = require('./socket.io/socket')


dotenv.config();
dbconnect.dbconnect();

//cross-origin resource sharing
app.use(cors({
  credentials: true,
  origin: process.env.origin
}));
app.use('/public/images', express.static('public/images'));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//remove cache
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

app.use("/", userRouter);
app.use("/professional", professionalRouter);
app.use("/admin", adminRouter);


// Start the server
const server = http.listen(process.env.PORT, () => {
  console.log("Server started listening to port");
});

intializeSocket(server)

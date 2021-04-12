const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");
const path = require("path");
const cookieParser = require('cookie-parser');
const bookingRouter = require("./Router/bookingRouter");

const app = express();

// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use( express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname,"View") );

// app.httpMethod( appRoute , cb function( request , response   )      )
app.use("/api/booking" , bookingRouter);
app.use("/api/plans" , planRouter);
app.use("/api/user" , userRouter);
app.use("/", viewRouter);


app.listen(3000, function () {
  console.log("server started at port 3000");
});
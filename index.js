// var db = require("./dbOperations");
// var student = require("./student");
// var express = require("express");
// var bodyParser = require("body-parser");
// var cors = require("cors");
// var app = express();
// var router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());
// app.use("/api", router);

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

// //get all students
// router.route("/student").get((req, res) => {
//   db.getStudents()
//     .then((result) => {
//       res.json(result[0]);
//     })
//     .catch((e) => console.log(e));
// });

// //get Specific  students
// router.route("/student/:id").get((req, res) => {
//   db.getSpecificStudent(req.params.id)
//     .then((result) => {
//       res.json(result[0]);
//     })
//     .catch((e) => console.log(e));
// });

// //Insert students
// router.route("/addStudent").post((req, res) => {
//   let student = { ...req.body };

//   db.addStudent(student)
//     .then((result) => {
//       res.status(201).json(result);
//     })
//     .catch((e) => console.log(e));
// });

// var port = process.env.PORT || 8090;
// app.listen(port);

//here is code with mosh lecture starting
// above code is working fine With SQL Server Managment studio

const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:debug");
const courses = require("./routes/courses");
const student = require("./routes/student");
const home = require("./routes/home");
const logger = require("./middleware/logger");
//configuration
// console.log("Application name --> " + config.get("name"));
// console.log("Server  name--> " + config.get("mail.host"));
// console.log("Server  Password--> " + config.get("mail.password"));

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://qasimSubhani:12345@cluster0.bi9dy.mongodb.net/database01?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to mongodb...!"))
  .catch((err) => console.log("could not connect to Db", err));

const express = require("express");
const app = express();
app.use(express.json());
app.use(helmet());
app.set("view engine", "pug");
app.set("views", "./views");

app.use(logger);
// app.use("/api/courses", courses);
app.use("/api/student", student);
app.use("/", home);

//middleware function
// app.use((req, res, next) => {
//   console.log("logging!...");
//   next();
// });
app.use(express.urlencoded({ extended: true }));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // debug("morgan enabeld with debugger");
}

var port = process.env.PORT || 8090;
app.listen(port, () => {
  console.log(`listing on port ${port}`);
});

//------------------------------------------------------------------//

/*
Relation ship between the Document

trade Off b/w the consistency  and performnce

//using Refrence (Normalization)---->Consistency
let author={
  name:'Mosh'
}

let course={
  author:'id'
}
 Using Embeded Document (Denormalization) -->Performance

 let course={
   author:{
     name:'Mosh'
   }
 }

 //Hybrid Approach

 let author={
   name:'mosh'
   //50 other properties
 }
 
 let course={
   author:{
     id:'ref',
     name:'mosh'
   }
 }


*/

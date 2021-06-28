const express = require("express");
const router = express.Router();
const { Course, validate } = require("../models/course");

//Getting the course Function
const getCourses = async () => {
  const courses = await Course.find();
  return courses;
};

//Creating the course function
const createCourse = async (name, author, tags, publish, price, category) => {
  const course = new Course({
    name: name,
    author: author,
    tags: tags,
    isPublished: publish,
    price: price,
    category: category,
  });
  return await course.save();
};

//Delete A document from DB
const deleteCourse = async (id) => {
  return await Course.deleteOne({ _id: id });
};

//Get Course the Course With Mongo DB And APi
router.get("/", async (req, res) => {
  const course = await getCourses();
  res.send(course);
});

router.get("/:year/:month", (req, res) => {
  res.send(req.params);
});

//Creating the Course With Mongo DB And APi
router.post("/", async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error) {
    //   res
    //     .status(400)
    //     .send({ success: false, message: error.details[0].message });
    //   return;
    // }

    const reqBody = req.body;
    const course = await createCourse(
      reqBody.name,
      reqBody.author,
      reqBody.tags,
      reqBody.isPublished,
      reqBody.price,
      reqBody.category
    );

    res.send({
      success: true,
      content: {
        id: course._id,
        name: course.name,
        author: course.author,
        tags: course.tags,
        isPublished: course.isPublished,
        price: course.price,
        category: course.category,
      },
    });
  } catch (ex) {
    res.status(404).send({ success: false, message: ex.message });

    // for Evaluating Single error using for loop
    // for ( field in ex.errors) {
    //     console.log(ex.errors[field])
    //   }
    // }
  }
});

//update The Course using Put Method
router.put("/:id", async (req, res) => {
  //lookUp for the course
  //if not Exisit in the DB ,return 404

  try {
    const course = await Course.findById(req.params.id);
    if (course.length === 0) {
      return res.status(404).send({
        success: false,
        messege: "Course not found In the DataBase11",
      });
    }
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send({
        success: false,
        messege: "Course not found In the DataBase",
        content: error.details[0].message,
      });
      return;
    }
    //set the latest Values
    course.set({
      name: req.body.name,
      author: req.body.author,
      tags: req.body.tags,
      isPublished: req.body.isPublished,
      price: req.body.price,
      category: req.body.category,
    });
    //saving into DB
    const result = await course.save();

    //sending response
    res.send({ success: true, content: result });
  } catch (error) {
    return res.status(404).send({
      success: false,
      messege: "Course not found In the DataBase22",
      content: error.message,
    });
  }
});
//Getting the specific Record From the DB
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.find({ _id: req.params.id });
    if (course.length === 0) {
      return res.status(404).send({
        success: false,
        messege: "Course not found In the DataBase",
      });
    }
    res.status(200).send({
      success: true,
      content: course,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      messege: "Course not found In the DataBase",
      content: error.message,
    });
  }
});

//Delete APi For Deleting Course
router.delete("/:id", async (req, res) => {
  //look up for the course
  //not return 404 -bad object
  try {
    const course = await Course.find({ _id: req.params.id });
    if (course.length === 0) {
      return res.status(404).send({
        success: false,
        messege: "Course not found In the DataBase",
      });
    }
    const deletedCourse = await deleteCourse(req.params.id);
    res.send({
      success: true,
      messege: "SuccessFully Deleted Course In the DataBase",
      content: deletedCourse,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      messege: "Course not found In the DataBase",
    });
  }
});

module.exports = router;

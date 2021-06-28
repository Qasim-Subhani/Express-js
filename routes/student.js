const express = require("express");
const { Course } = require("../models/course");
const router = express.Router();
const { Student, validate } = require("../models/student");

//Getting the student Function
const getStudent = async () => {
  //   const student = await Student.find();

  //populate method is used to combine two documents
  const student = await Student.find().populate("course", "name author -_id"); //here - sign is used to exclude the property

  return student;
};

//Creating the course function
const createStudent = async (name, phone, fee, clas, course) => {
  const student = new Student({
    name: name,
    phone: phone,
    fee: fee,
    class: clas,
    course: course,
  });

  return await student.save();
};

const addCourse = async (studentId, courseId) => {
  try {
    const student = await Student.findById(studentId);
    student.course.push(courseId);
    student.save();
    return student;
  } catch (error) {
    return error;
  }
};

//Delete A document from DB
const deleteStudent = async (id) => {
  return await Student.deleteOne({ _id: id });
};

//-------------------------------------------------------//

//Get Course the Course With Mongo DB And APi
router.get("/", async (req, res) => {
  const student = await getStudent();
  res.send(student);
});

//Creating the Student With Mongo DB And APi
router.post("/", async (req, res) => {
  try {
    const reqBody = req.body;
    const student = await createStudent(
      reqBody.name,
      reqBody.phone,
      reqBody.fee,
      reqBody.class,
      reqBody.course
    );

    res.send({
      success: true,
      content: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        fee: student.fee,
        class: student.class,
      },
    });
  } catch (ex) {
    res.status(404).send({ success: false, message: ex.message });
  }
});

//adding course to the Student
router.put("/addCourse", async (req, res) => {
  try {
    const updatedCourse = await addCourse(
      req.body.studentId,
      req.body.courseId
    );
    res.send({
      success: true,
      content: {
        details: updatedCourse,
      },
    });
  } catch (ex) {
    res.status(404).send({ success: false, message: ex.message });
  }
});

//update The Course using Put Method
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student.length === 0) {
      return res.status(404).send({
        success: false,
        messege: "Student not found In the DataBase1",
      });
    }
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send({
        success: false,
        messege: "Student not found In the DataBase",
        content: error.details[0].message,
      });
      return;
    }
    //set the latest Values
    student.set({
      name: req.body.name,
      phone: req.body.phone,
      fee: req.body.fee,
      class: req.body.class,
      course: req.body.course,
    });
    //saving into DB
    const result = await student.save();

    //sending response
    res.send({ success: true, content: result });
  } catch (error) {
    return res.status(404).send({
      success: false,
      messege: "Student not found In the DataBase",
      content: {
        message: error.message,
      },
    });
  }
});

//Getting the specific Record From the DB
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.find({ _id: req.params.id });
    if (student.length === 0) {
      return res.status(404).send({
        success: false,
        messege: "Student not found In the DataBase",
      });
    }
    res.status(200).send({
      success: true,
      content: student,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      messege: "Student not found In the DataBase",
      content: error.message,
    });
  }
});

//Delete APi For Deleting Course
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.find({ _id: req.params.id });
    if (student.length === 0) {
      return res.status(404).send({
        success: false,
        messege: "Student not found In the DataBase",
      });
    }
    const delStudent = await deleteStudent(req.params.id);
    res.send({
      success: true,
      messege: "SuccessFully Deleted Course In the DataBase",
      content: delStudent,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      messege: "Student not found In the DataBase",
    });
  }
});

module.exports = router;

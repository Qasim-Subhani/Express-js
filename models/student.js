const Joi = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  phone: { type: String, minlength: 11, maxlength: 12, required: true },
  enrolledDate: { type: Date, default: Date.now },
  fee: {
    type: Number,
    required: function () {
      return this.enrolledDate;
    },
  },
  class: {
    type: String,
    required: true,
    lowercase: true, // turns the category type To LowerCase
    trim: true, // trim the initial and ending padding
    enum: ["middle", "inter", "master"],
  },
  course: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Course",
  },
});

const Student = mongoose.model("Student", studentSchema);

//USing Cutom Validations
const validateName = (param) => {
  const schema = {
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(11).required(),
    fee: Joi.number().required(),
    class: Joi.string().required(),
    course: Joi.array(),
  };
  return Joi.validate(param, schema);
};

exports.Student = Student;
exports.validate = validateName;

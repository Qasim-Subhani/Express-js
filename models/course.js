const Joi = require("joi");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  //using built in validators
  // name: {type:String,minlength:5,maxlength:100,required:true,match:/pattern/},
  name: String,
  author: String,
  // tags: [String],
  tags: {
    type: Array,
    validate: {
      isAsync: true, //in case of any validation when its required to fetch from the bd or other resources
      validator: function (v, callback) {
        setTimeout(() => {
          //do some Callback Work
          const reult = v && v.length > 0;
          callback(reult);
        }, 5000);
      },
      message: "A course Should contain atleat 1 tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      //here arrow function will not work
      return this.isPublished;
    },
    //here min and max for custom validator
    // min:10,
    // max:120
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  category: {
    type: String,
    required: true,
    lowercase: true, // turns the category type To LowerCase
    // uppercase: true, // turns the category type To UpperCase
    trim: true, // trim the initial and ending padding
    enum: ["web", "mobile", "desktop"],
  },
});

const Course = mongoose.model("Course", courseSchema);

//USing Cutom Validations
const validateName = (param) => {
  const schema = {
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    tags: Joi.array().items(Joi.string().required()),
    isPublished: Joi.boolean(),
    price: Joi.number(),
    category: Joi.string(),
  };
  return Joi.validate(param, schema);
};

exports.Course = Course;
exports.validate = validateName;

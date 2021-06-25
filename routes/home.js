const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "My Express application",
    messege: "Home Module is Executed...!",
  });
});

module.exports = router;

const express = require("express");
const {
  getCourse,
  getCourses,
  insertCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses-controller");
const router = express.Router();

router.get("/", getCourses);
router.get("/:id/:name", getCourse);
router.post("/", insertCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;

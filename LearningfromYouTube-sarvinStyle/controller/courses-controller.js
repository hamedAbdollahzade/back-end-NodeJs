//! -------DATA-BASE-📲------------------------------
const courses = [
  { id: 1, name: "Node.js" },
  { id: 2, name: "React" },
  { id: 3, name: "Angular" },
];
// console.log(courses);

// ------------getCourses-------------------
const getCourses = (req, res) => {
  res.json(courses);
};
// ------------getCourse--------------------
// علامت ؟ ینی اگه پارامتر وجود داشت بفرست اگه وجود نداشت هم خطا نده
const getCourse = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  // "/api/courses/:id/:name?sort=id" ==> bade ? mishe query hamun !
  res.json([course, req.params.name, req.query.sort]);
};
// ------------insertCourse-------------------------------
const insertCourse = (req, res) => {
  const { name } = req.body;
  if (!name || name.length < 3) return res.status(400).send("Name is required");
  const newCourse = {
    id: courses.length + 1,
    name: name,
  };
  courses.push(newCourse);
  res.send(courses);
};
// --------updateCourse----------------------
const updateCourse = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  const { name } = req.body;
  if (!name || name.length < 3) return res.status(400).send("Name is required");
  course.name = name;
  res.send(courses);
};
// --------deleteCourse-----------------------------------
const deleteCourse = (req, res) => {
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Course not found");
  courses.splice(index, 1);
  res.send(courses);
};
// -------------------------------------------

module.exports = {
  getCourses,
  getCourse,
  insertCourse,
  updateCourse,
  deleteCourse,
};

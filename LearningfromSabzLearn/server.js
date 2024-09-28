const express = require("express");
const app = express();
require("dotenv").config();
const joi = require("joi");

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`server is runnig in port ${port}`)
);

app.get("/", (req, res) => {
  res.send("Salam Express");
});

const customers = [
  { id: 1, name: "hamed" },
  { id: 2, name: "saeed" },
];

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find(
    (customer) => customer.id === parseInt(req.params.id)
  );
  if (customer) {
    res.send(customer);
  } else {
    res.status(404).send("Not Found");
  }
});

app.post("/api/customers/", (req, res) => {
  // Use joi To Validate req.body
  const schema = joi.object({ name: joi.string().min(2).max(10).required() });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.message });
  // --------------------------------------------

  //if not use the thirdParti Library
  const { name } = req.body;
  if (!name || name.length < 3)
    return res.status(400).send({ success: false, message: "Name Not Valid" });
  // ------------------------------

  const customer = { id: customers.length + 1, name };
  customers.push(customer);
  res.send(customers);
});

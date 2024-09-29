const express = require("express");
const app = express();
require("dotenv").config();
const joi = require("joi");

app.use(express.json());

// My Middleware :
app.use((req, res, next) => {
  console.log("Middleware Log ...");
  next();
});

app.use((req, res, next) => {
  if (req.query.name == "hamed") {
    return res.send("salam hamed ");
  }
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`server is runnig in port ${port}`)
);

app.get("/", (req, res) => {
  res.send("Salam Express");
});

let customers = [
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
  // Use joi To Inpute Validate :
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

app.put("/api/customers/:customerId", (req, res) => {
  // Use joi To Inpute Validate :
  const schema = joi.object({
    name: joi.string().min(2).max(10).required(),
    customerId: joi.number().required(),
  });
  const { error } = schema.validate({
    ...req.body,
    customerId: parseInt(req.params.customerId),
  });
  if (error) return res.status(400).send({ message: error.message });
  else {
    const index = customers.findIndex(
      (item) => item.id === parseInt(req.params.customerId)
    );
    if (index === -1) return res.status(404).send({ message: "Not Found" });

    customers[index].name = req.body.name;
    res.send(customers);
  }
});

app.delete("/api/customers/:customerId", (req, res) => {
  customers = customers.filter(
    (item) => item.id !== parseInt(req.params.customerId)
  );
  res.status(200).send();
});

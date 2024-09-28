const express = require("express");
const app = express();
require("dotenv").config();

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
    res.send("Not Found");
  }
});

app.post("/api/customers/", (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 3)
    return res.send({ success: false, message: "Name Not Valid" });

  const customer = { id: customers.length + 1, name };
  customers.push(customer);
  res.send(customers);
});

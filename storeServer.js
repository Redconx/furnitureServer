var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization,*"
  );
  // res.header("Access-Control-Allow-Credentials", "true");
  next();
});
var port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { products, users } = require("./storeData");

app.get("/products", function (req, res) {
  res.send(products);
});

app.put("/products", function (req, res) {
  let body = req.body;
  console.log(body);
  console.log("in put");
  let index = products.findIndex((ele) => ele.prodCode === body.prodCode);
  products[index] = body;
  res.send("updated !!!");
});
app.post("/products", function (req, res) {
  let body = req.body;
  console.log(body);
  console.log("in post");
  let index = products.findIndex((ele) => ele.prodCode === body.prodCode);
  if (index >= 0) {
    res.status(404).send("Product Code already present");
  } else {
    products.push(body);
    res.send("added !!");
  }
});

app.post("/login", function (req, res) {
  let { email, password } = req.body;
  let user = users.find(
    (ele) => ele.email === email && ele.password === password
  );
  if (user) {
    res.send({ email: user.email, role: user.role });
  } else {
    res.status(401).send("User not Found");
  }
});

app.delete("/product/:prodCode", function (req, res) {
  let { prodCode } = req.params;
  let index = products.findIndex((ele) => ele.prodCode === prodCode);
  products.splice(index, 1);
  res.send("deleted");
});

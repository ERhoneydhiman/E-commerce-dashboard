const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-com";
const app = express();

app.use(express.json());
app.use(cors());

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// signup API
app.post("/signup", async (req, res) => {
  let existingUser = await User.findOne(req.body);
  if (existingUser) {
    return res.send({ error: "Email already in use" });
  }
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "somthing went wrong..." });
    }
    res.send({ result, auth: token });
  });
});

// login API
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "somthing went wrong..." });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ error: "no user found" });
    }
  } else {
    res.send({ error: "no user found" });
  }
});

// ADD product API with image upload
app.post(
  "/add-product",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, category, company, userID } = req.body;

      if (!req.file) {
        return res.status(400).send({ error: "Image file is required." });
      }

      const newProduct = new Product({
        name,
        price,
        category,
        company,
        userID,
        image: {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
          imageBase64: req.file.buffer.toString("base64"),
        },
      });

      let result = await newProduct.save();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// product list API
app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
});

// delete API
app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// update API
app.get("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.findById({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//search API
app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (!err) {
        next();
      } else {
        res.status(401).send({ result: "add valid token..." });
      }
    });
  } else {
    res.status(403).send({ result: "add token..." });
  }
}

app.listen(5000);

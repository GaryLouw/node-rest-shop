const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

//GET (All)
router.get("/", (req, res, next) => {
  Product.find().select("Name price_id").exec().then(docs => {
    const response = {
        count: docs.length,
        products: docs.map(doc => {
            return{
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                request: {
                    type: "GET",
                    url: "https//localhost:3000/products/" + doc._id
                }
            }
        })
    }
    /* if(docs.length >= 0){ */
        res.status(200).json(response);
    /* }else{
        res.status(404).json({
          message: "No entries found"
        });
    } */
    
  }).catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
  });
});

//POST
router.post("/", (req, res, next) => {
  /* const product = {
    name: req.body.name,
    price: req.body.price,
  }; */
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result),
        res.status(201).json({
          message: "Product created successfully.",
          createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: "GET",
                url: "http://localhost:3000/products/" + result._id
            }
          }
        });
    })
    .catch((err) => {
      console.log(err); 
      res.status(500).json(
        { 
            error: err 
        });
    });
});

//GET (By ID, one item)
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  /* if (id === "special") {
    res.status(200).json({
      message: "Special ID discovered",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
    });
  } */
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc), res.status(200).json(doc);
      if(doc){
        res.status(200).json({
            product: doc,
            request: {
                type: "GET",
                url: "http://localhost/products"
            }
        });
      }else{
        res.status(404).json({message: "No valid entry found for requested ID"});
      }
    })
    .catch((err) => {
      console.log(err); 
      res.status(500).json(
        { 
            error: err 
        });
    });
});

//PATCH
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
  Product.update({_id: id}, { $set: updateOps}).exec().then(result => {
    console.log(result);
    res.status(200).json({ 
        message: "Product updated",
        request: {
            type: "GET",
            url: "http://localhost/products" + id
        }}
    );
           
  }).catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    })
  });
});

//DELETE
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
  Product.remove({_id: id}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    })
  });
});

module.exports = router;

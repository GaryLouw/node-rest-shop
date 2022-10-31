const express = require("express");
const router = express.Router();

//GET (All)
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Get all orders",
  });
});

//POST
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(200).json({
    message: "Order created!",
    order: order,
  });
});

//GET (By ID, one item)
router.get("/orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order details",
    orderId: req.params.orderId,
  });
});

//DELETE
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted!",
    orderId: req.params.orderId,
  });
});

module.exports = router;

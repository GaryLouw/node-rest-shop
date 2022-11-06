const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controllers/orders");

//GET (All)
router.get("/", checkAuth, OrdersController.orders_get_all);

//POST
router.post("/", checkAuth, OrdersController.orders_create_order);

//GET (By ID, one item)
router.get("/:orderId", checkAuth, OrdersController.orders_get_by_id);

//DELETE
router.delete("/:orderId", checkAuth, OrdersController.orders_delete);

module.exports = router;

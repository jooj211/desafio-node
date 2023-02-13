"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var OrdersController_1 = require("../controllers/OrdersController");
var ProductsController_1 = require("../controllers/ProductsController");
var RestaurantsController_1 = require("../controllers/RestaurantsController");
exports.router = (0, express_1.Router)();
var ordersController = new OrdersController_1.OrdersController();
var productsController = new ProductsController_1.ProductsController();
var restaurantsController = new RestaurantsController_1.RestaurantsController();
/*  -----------------  RESTAURANTS  -----------------  */
exports.router.post('/restaurants', restaurantsController.createRestaurant);
exports.router.get('/restaurants', restaurantsController.getRestaurants);
exports.router.get('/restaurants/:id', restaurantsController.getRestaurantById);
exports.router.put('/restaurants/:id', restaurantsController.updateRestaurant);
exports.router["delete"]('/restaurants/:id', restaurantsController.deleteRestaurant);
/*  -----------------  END RESTAURANTS  -----------------  */
/*  -----------------  PRODUCTS  -----------------  */
exports.router.post('/products', productsController.createProduct);
exports.router.get('/products', productsController.getProducts);
exports.router.get('/products/:id', productsController.getProductById);
exports.router.put('/products/:id', productsController.updateProduct);
exports.router["delete"]('/products/:id', productsController.deleteProduct);
/*  -----------------  END PRODUCTS  -----------------  */
/*  -----------------  ORDERS  -----------------  */
exports.router.post('/orders', ordersController.createOrder);
exports.router.get('/orders/:id', ordersController.getOrderById);
exports.router.get('/orders/restaurant/:id', ordersController.getOrdersByRestaurant);
exports.router.put('/orders/:id', ordersController.updateOrder);
exports.router["delete"]('/orders/:id', ordersController.deleteOrder);
/*  -----------------  END ORDERS  -----------------  */

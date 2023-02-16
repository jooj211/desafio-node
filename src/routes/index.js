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
/*
{
    "nome": "",
    "descricao": "",
    "quantidade": ,
    "preco": ,
    "categoria": ""
}
*/
/*  -----------------  PRODUCTS  -----------------  */
exports.router.post('/restaurants/:id/products', productsController.createProduct);
exports.router.get('/restaurants/:id/products', productsController.getProducts);
exports.router.get('/restaurants/:id/products/:id', productsController.getProductById);
exports.router.put('/restaurants/:id/products/:id', productsController.updateProduct);
exports.router["delete"]('/restaurants/:id/products/:id', productsController.deleteProduct);
exports.router["delete"]('/restaurants/:id/products', productsController.deleteAllProducts);
/*  -----------------  END PRODUCTS  -----------------  */
/*
{
    "productIds": [],
    "nome_cliente": "",
    "cidade_cliente": "",
    "endereco_cliente": "",
    "telefone_cliente": ""
}
*/
/*  -----------------  ORDERS  -----------------  */
exports.router.post('/restaurants/:id/orders', ordersController.createOrder);
exports.router.get('/restaurants/:id/orders', ordersController.getOrders);
exports.router.get('/restaurants/:id/orders/:id', ordersController.getOrderById);
exports.router.put('/restaurants/:id/orders/:id', ordersController.updateOrder);
exports.router["delete"]('/restaurants/:id/orders/:id', ordersController.deleteOrder);
exports.router["delete"]('/restaurants/:id/orders', ordersController.deleteAllOrders);
/*  -----------------  END ORDERS  -----------------  */
/*
TODO
- [ ] Testar create, update, delete e deleteAll de ordens
- [ ] Testar create, update, delete e deleteAll de produtos
- [ ] Testar create, update e delete de restaurantes
- [ ] Testar delete de restaurantes com produtos e ordens associados
- [ ] Testar delete de produtos com ordens associadas
- [ ] Testar delete de ordens com produtos associados
 */ 

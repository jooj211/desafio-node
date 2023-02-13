import { Router } from 'express';
import { OrdersController } from '../controllers/OrdersController';
import { ProductsController } from '../controllers/ProductsController';
import { RestaurantsController } from '../controllers/RestaurantsController';

export const router = Router();

const ordersController = new OrdersController();
const productsController = new ProductsController();
const restaurantsController = new RestaurantsController();

/*  -----------------  RESTAURANTS  -----------------  */

router.post('/restaurants', restaurantsController.createRestaurant);
router.get('/restaurants', restaurantsController.getRestaurants);
router.get('/restaurants/:id', restaurantsController.getRestaurantById);
router.put('/restaurants/:id', restaurantsController.updateRestaurant);
router.delete('/restaurants/:id', restaurantsController.deleteRestaurant);

/*  -----------------  END RESTAURANTS  -----------------  */


/*  -----------------  PRODUCTS  -----------------  */

router.post('/products', productsController.createProduct);
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductById);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

/*  -----------------  END PRODUCTS  -----------------  */


/*  -----------------  ORDERS  -----------------  */

router.post('/orders', ordersController.createOrder);
router.get('/orders/:id', ordersController.getOrderById);
router.get('/orders/restaurant/:id', ordersController.getOrdersByRestaurant);
router.put('/orders/:id', ordersController.updateOrder);
router.delete('/orders/:id', ordersController.deleteOrder);

/*  -----------------  END ORDERS  -----------------  */




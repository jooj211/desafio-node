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

router.post('/restaurants/:id/products', productsController.createProduct);
router.get('/restaurants/:id/products', productsController.getProducts);
router.get('/restaurants/:id/products/:id', productsController.getProductById);
router.put('/restaurants/:id/products/:id', productsController.updateProduct);
router.delete('/restaurants/:id/products/:id', productsController.deleteProduct);
router.delete('/restaurants/:id/products', productsController.deleteAllProducts);


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

router.post('/restaurants/:id/orders', ordersController.createOrder);
router.get('/restaurants/:id/orders', ordersController.getOrders);
router.get('/restaurants/:id/orders/:id', ordersController.getOrderById);
router.put('/restaurants/:id/orders/:id', ordersController.updateOrder);
router.delete('/restaurants/:id/orders/:id', ordersController.deleteOrder);
router.delete('/restaurants/:id/orders', ordersController.deleteAllOrders);

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
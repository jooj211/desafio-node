import { Order } from './Order';
import { Product } from './Product';

export type OrderDetails = {
    order_id: number;
    product_id: number;
    orders: Order;
    products: Product;
};

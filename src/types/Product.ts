import { OrderDetails } from './OrderDetails';
import { Restaurant } from './Restaurant';

export type Product = {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  categoria: string;
  id_restaurante: number;
  order_details: OrderDetails[];
  restaurants: Restaurant;
};

import { OrderDetails } from './OrderDetails';
import { Restaurant } from './Restaurant';

export type Order = {
  id: number;
  produtos: string;
  valor_total: number;
  nome_cliente: string;
  cidade_cliente: string;
  endereco_cliente: string;
  telefone_cliente: string;
  restaurante_id: number;
  order_details: OrderDetails[];
  restaurants: Restaurant;
};

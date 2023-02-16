import { Request, Response } from 'express';
import { Order } from '../types/Order';
import { Product } from '../types/Product';
import { PrismaClient } from '@prisma/client';
import { ProductsController } from './ProductsController';

const prisma = new PrismaClient();

export class OrdersController {
  async createOrder(req: Request, res: Response) {
    const { productIds, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente } = req.body;
    const restaurantId = parseInt(req.params.id);
  
    // Checa se o restaurante existe
    if (isNaN(restaurantId)) {
      return res.status(400).json({ error: "Invalid restaurant id" });
    }
    
    // Checa se todos os produtos existem
    const products = await prisma.products.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
  
    // Isso foi feito porque o método findMany não conta ids duplicados
    // Conta a quantidade de cada produto
    const countMap = productIds.reduce((map: { [key: number]: number }, id: number) => {
      map[id] = (map[id] || 0) + 1;
      return map;
    }, {} as { [key: number]: number });
    
    // Checa se há produtos suficientes
    const notEnoughProducts = products.some((product: Product) => {
      const count = countMap[product.id] || 0;
      return product.quantidade < count;
    });
    
    // Retorna um erro se não houver produtos suficientes
    if (notEnoughProducts) {
      return res.status(400).json({ error: "Not enough products available" });
    }
    
    // Calcula o valor total
    const valor_total = products.reduce((sum : number, product : Product) => {
      const count = countMap[product.id];
      
      const totalPrice = product.preco * count;
      sum += totalPrice;

      return sum;
    }, 0);
    
  
    // Checa se todos os produtos pertencem ao mesmo restaurante
    const firstId = products[0].id_restaurante;
    if (!products.every(p => p.id_restaurante === firstId)) {
      return res.status(400).json({ error: "All products must belong to the same restaurant" });
    }


    // Cria o pedido
    const order = await prisma.orders.create({
      data: {
        valor_total,
        nome_cliente,
        cidade_cliente,
        endereco_cliente,
        telefone_cliente,
        restaurants: {
          connect: {
            id: restaurantId,
          },
        },
        order_product: {
          create: productIds.map((productId: number) => ({
            products: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    // Atualiza a quantidade de produtos
    await Promise.all(products.map(async (product: Product) => {
      const count = countMap[product.id] || 0;
      const newQuantity = product.quantidade - count;
      await prisma.products.update({
        where: {
          id: product.id,
        },
        data: {
          quantidade: newQuantity,
        },
      });
    }));
  
    return res.json(order);
  }
  
      
    async getOrders(req: Request, res: Response) {
        const { id } = req.params;
        const orders = await prisma.orders.findMany({
            where: {
            restaurante_id: Number(id),
            },
        });
        
        return res.json(orders);
    }

    async getOrderById(req: Request, res: Response) {
        const { id } = req.params;
        const order = await prisma.orders.findUnique({
            where: {
            id: Number(id),
            },
        });
        
        return res.json(order);
    }

    async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { productIds, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente } = req.body;
        
        const products = await prisma.products.findMany({
            where: {
            id: {
                in: productIds,
            },
            },
        });

        const countMap = productIds.reduce((map: { [key: number]: number }, id: number) => {
            map[id] = (map[id] || 0) + 1;
            return map;
          }, {} as { [key: number]: number });

        // Checa se há produtos suficientes
        const notEnoughProducts = products.some((product: Product) => {
          const count = countMap[product.id] || 0;
          return product.quantidade < count;
        });
    
        // Retorna um erro se não houver produtos suficientes
        if (notEnoughProducts) {
          return res.status(400).json({ error: "Not enough products available" });
        }

        const valor_total = products.reduce((sum : number, product : Product) => {
            const count = countMap[product.id];
            const totalPrice = product.preco * count;
            sum += totalPrice;
            
            return sum;
          }, 0);

        const firstId = products[0].id_restaurante;
        if (!products.every(p => p.id_restaurante === firstId)) {
            return res.status(400).json({ error: "All products must belong to the same restaurant" });
        }

        const order = await prisma.orders.update({
            where: {
            id: Number(id),
            },
            data: {
            valor_total,
            nome_cliente,
            cidade_cliente,
            endereco_cliente,
            telefone_cliente,
            order_product: {
                create: productIds.map((productId: Number) => ({
                  products: {
                    connect: {
                      id: productId,
                    },
                  },
                })),
              },
            },
        });
        
        // Atualiza a quantidade de produtos
        await Promise.all(products.map(async (product: Product) => {
          const count = countMap[product.id] || 0;
          const newQuantity = product.quantidade - count;
          await prisma.products.update({
            where: {
              id: product.id,
            },
            data: {
              quantidade: newQuantity,
            },
          });
        }));

        return res.json(order);
    }

    async deleteOrder(req: Request, res: Response) {
      const { id } = req.params;
  
      try{
          await prisma.order_product.deleteMany({
              where: {
                  orders: {
                      id: Number(id),
                  },
              },
          });
          const order = await prisma.orders.delete({
              where: {
                  id: Number(id),
              },
          });
          if (!order) {
              return res.status(400).json({ error: "Order not found" });
          }
          return res.json({ message: 'Order deleted successfully' });
      } catch (error) {
          console.log(error);
          return res.status(400).json({ error: "Error deleting order" });
      }
  }
  

    async deleteAllOrders(req: Request, res: Response) {
      const { id } = req.params;

      try{
        const orderDetails = await prisma.order_product.deleteMany({
            where: {
                orders: {
                    restaurante_id: Number(id),
                },
            },
        });
        await prisma.orders.deleteMany({
            where: {
                restaurante_id: Number(id),
            },
        });
        return res.json({ message: 'All orders deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Error deleting all orders" });
    }
  }

}
import { Request, Response } from 'express';
import { Product } from '../types/Product';
import { RestaurantsController } from './RestaurantsController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductsController {
    async createProduct(req : Request, res : Response) {
        try {
            const { nome, descricao, quantidade, preco, categoria } = req.body;
            const id_restaurante = parseInt(req.params.id);
      
            if (isNaN(id_restaurante)) {
                return res.status(400).json({ error: "Invalid restaurant id" });
            }
      
            const newProduct = await prisma.products.create({
                data: {
                    nome,
                    descricao,
                    quantidade: parseInt(quantidade, 10),
                    preco: parseFloat(preco),
                    categoria,
                    restaurants: {
                        connect: {
                            id: id_restaurante,
                        },
                    },
                },
            });
      
        return res.json(newProduct);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error creating product" });
        }
    }
      

    async getProducts(req: Request, res: Response) {
        const { restaurantId } = req.params;
        const products : Product[] = await prisma.products.findMany({
            where: {
            id_restaurante: Number(restaurantId),
            },
        });

        return res.json(products);
    }

    async getProductById(req: Request, res: Response) {
        const { productId } = req.params;
        const product : Product | null = await prisma.products.findUnique({
            where: {
            id: Number(productId),
            },
        });
        
        return product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, descricao, quantidade, preco, categoria } : Product = req.body;
        
        const product : Product = await prisma.products.update({
            where: {
            id: Number(id),
            },
            data: {
            nome,
            descricao,
            quantidade,
            preco,
            categoria,
            },
        });
        
        return res.json(product);
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
      
        try {
            // Cria um array com todos os pedidos que contém o produto a ser deletado
            const orders = await prisma.orders.findMany({
                where: {
                    order_product: {
                        some: {
                            products: {
                                id: Number(id),
                            },
                        },
                    },
                },
            });


            // Deleta todos os order_product que contém o produto a ser deletado
            await prisma.order_product.deleteMany({
                where: {
                  products: {
                    id: Number(id),
                  },
                },
              });
            
              // Deleta todos os pedidos que contém o produto a ser deletado
                await prisma.orders.deleteMany({
                    where: {
                        id: {
                            in: orders.map((order) => order.id),
                        },
                    },
                });
            
              // Deleta o produto
              await prisma.products.delete({
                where: {
                  id: Number(id),
                },
              });
      
          return res.json({ message: 'Product deleted successfully' });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ error: "Error deleting product" });
        }
      }
      

    async deleteAllProducts(req: Request, res: Response) {
        const { restaurantId } = req.params;

        try{
            await prisma.products.findMany({
                where: {
                    id_restaurante: Number(restaurantId),
                },
            });

            await prisma.order_product.deleteMany({
                where: {
                    products: {
                        id_restaurante: Number(restaurantId),
                    },
                },
            });

            await prisma.orders.deleteMany({
                where: {
                    order_product: {
                        some: {
                            products: {
                                id_restaurante: Number(restaurantId),
                            },
                        },
                    },
                },
            });

            await prisma.products.deleteMany({
                where: {
                    id_restaurante: Number(restaurantId),
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Error deleting products" });
        }

        return res.json({ message: 'All products deleted successfully' });
    }
}
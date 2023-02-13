import { Request, Response } from 'express';
import { Product } from '../types/Product';
import { RestaurantsController } from './RestaurantsController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductsController {
    async createProduct(req: Request, res: Response) {
        const { nome, descricao, quantidade, preco, categoria } : Product = req.body;
        const { restaurantId } = req.params;
        const id_restaurante = Number(restaurantId);
        

        const product = await prisma.products.create({
            data: {
                nome,
                descricao,
                quantidade: Number(quantidade),
                preco: Number(preco),
                categoria,
                restaurants: {
                    connect: {
                        id: id_restaurante
                    }
                }
            }
          });
          
        

        return res.json(product);
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
        
        return res.json(product);
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
        
        await prisma.products.delete({
            where: {
            id: Number(id),
            },
        });
        
        return res.json({ message: 'Product deleted successfully' });
    }
}
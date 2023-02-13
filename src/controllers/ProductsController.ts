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
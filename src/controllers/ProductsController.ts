import { Request, Response } from 'express';
import { Product } from '../types/Product';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductsController {
    async createProduct(req: Request, res: Response) {
        const { nome, descricao, quantidade, preco, categoria, id_restaurante } = req.body;
        
        const product = await prisma.products.create({
            data: {
            nome,
            descricao,
            quantidade,
            preco,
            categoria,
            id_restaurante,
            },
        });
        
        return res.json(product);
    }

    async getProducts(req: Request, res: Response) {
        const products = await prisma.products.findMany({});
        
        return res.json(products);
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        const product = await prisma.products.findUnique({
            where: {
            id: Number(id),
            },
        });
        
        return res.json(product);
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, descricao, quantidade, preco, categoria, id_restaurante } = req.body;
        
        const product = await prisma.products.update({
            where: {
            id: Number(id),
            },
            data: {
            nome,
            descricao,
            quantidade,
            preco,
            categoria,
            id_restaurante,
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
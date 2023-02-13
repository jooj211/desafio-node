import { Request, Response } from 'express';
import { Order } from '../types/Order';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrdersController {
    async createOrder(req: Request, res: Response) {
        const { produtos, valor_total, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente } = req.body;
        const { restaurantId } = req.params;
        const restaurante_id = Number(restaurantId);
        
        const order = await prisma.orders.create({
            data: {
            produtos,
            valor_total,
            nome_cliente,
            cidade_cliente,
            endereco_cliente,
            telefone_cliente,
            restaurante_id,
            },
        });
        
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
        const { produtos, valor_total, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente } = req.body;
        
        const order = await prisma.orders.update({
            where: {
            id: Number(id),
            },
            data: {
            produtos,
            valor_total,
            nome_cliente,
            cidade_cliente,
            endereco_cliente,
            telefone_cliente
            },
        });
        
        return res.json(order);
    }

    async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;
        
        await prisma.orders.delete({
            where: {
            id: Number(id),
            },
        });
        
        return res.json({ message: 'Order deleted successfully' });
    }
}
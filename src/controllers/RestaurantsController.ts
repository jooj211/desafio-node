import { Request, Response } from 'express';
import { Restaurant } from '../types/Restaurant';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RestaurantsController {
  async createRestaurant(req: Request, res: Response) {
    const { nome, email, senha, categoria, cidade, endereco, telefone } : Restaurant = req.body;
  
    try{
      const restaurant : Restaurant = await prisma.restaurants.create({
        data: {
          nome,
          email,
          senha,
          categoria,
          cidade,
          endereco,
          telefone,
        },
      });
  
      return res.json(restaurant);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Error creating restaurant' });
    }
  }
  
  
  async getRestaurants(req: Request, res: Response) {
    const restaurants = await prisma.restaurants.findMany({});
  
    return res.status(200).json(restaurants);
  }
  
  async getRestaurantById(req: Request, res: Response) {
    const { id } = req.params;
    const restaurant = await prisma.restaurants.findUnique({
      where: {
        id: Number(id),
      },
    });
  
    return res.status(200).json(restaurant);
  }
  
  async updateRestaurant(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, senha, categoria, cidade, endereco, telefone } = req.body;
  
    try{
      const restaurant = await prisma.restaurants.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          email,
          senha,
          categoria,
          cidade,
          endereco,
          telefone,
        },
      });
  
      return res.status(200).json(restaurant);
    }
    catch (error) {
      return res.status(400).json(error);
    }
  }
  
  async deleteRestaurant(req: Request, res: Response) {
    const { id } = req.params;
  
    await prisma.restaurants.delete({
      where: {
        id: Number(id),
      },
    });
  
    return res.status(200).json({ message: 'Restaurant deleted successfully' });
  }
}
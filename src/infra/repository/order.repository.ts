import Order from "../../domain/aggregate/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository implements OrderRepositoryInterface{ 
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    // 1. Atualize a Order principal
  let existingOrder;
    try{  
      existingOrder = await OrderModel.findByPk(entity.id);
      if (!existingOrder) {
          throw new Error("Order not found");
      }
    } catch (error) {
      throw new Error("Order not found");
    }  
    
    await existingOrder.update({
        total: entity.total(),
    });

    // 2. Atualize os OrderItems
    const existingItems = await OrderItemModel.findAll({
        where: { order_id: entity.id }
    });

    for (const newItem of entity.items) {
        const existingItem = existingItems.find(item => item.id === newItem.id);
        if (existingItem) {
            await existingItem.update({
                name: newItem.name,
                price: newItem.price,
                product_id: newItem.productId,
                quantity: newItem.quantity,
            });
        } else {
            await OrderItemModel.create({
                id: newItem.id,
                name: newItem.name,
                price: newItem.price,
                product_id: newItem.productId,
                quantity: newItem.quantity,
                order_id: entity.id,
            });
        }
    }

    // Exclui os OrderItems que não estão mais presentes
    for (const oldItem of existingItems) {
        if (!entity.items.some(newItem => newItem.id === oldItem.id)) {
            await oldItem.destroy();
        }
    }
}



  async find(id: string): Promise<Order> {   
    const orderModel = await OrderModel.findOne({ where: { id } });
    return orderModel.toDomain();
  }
  
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    return orderModels.map((orderModel) =>
       orderModel.toDomain()
    );
  }
}
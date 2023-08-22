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
    await OrderItemModel.destroy({
      where: {
        orderId: entity.id, 
      },
    });

    for (const item of entity.items) {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        orderId: entity.id, 
      });
    }
  }

  async find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
    // const orderModel = await OrderModel.findOne({ where: { id } });
    // return new Order(orderModel.id, orderModel.customer_id, orderModel.items);
  }
  
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
import { Sequelize } from "sequelize-typescript";

import OrderRepository from "./order.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/aggregate/customer";
import Address from "../../domain/vo/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/aggregate/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/aggregate/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);



    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {

    // Creating a new Order 
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
   
    await productRepository.create(product);  

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    let order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    /***
     * Update Order
     *    
     */
    const product2 = new Product("456", "Product 2", 11);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );    

    // Adicionando novo item

    order.addNewItem(orderItem2);    
    await orderRepository.update(order);

    let orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: [{
        association: "items",
        order: [[ 'product_id', 'ASC' ]] // Orders items by product_id in ascending order
      }]
    });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: 42,
      items: [       
        {
          id: "1",
          name: "Product 1",
          price: 10,
          quantity: 2,
          order_id: "123",
          product_id: "123",
        },     
        {
          id: "2",
          name: "Product 2",
          price: 11,
          quantity: 2,
          order_id: "123",
          product_id: "456",
        },       
      ],
    });
  });  

  it("should throw an error when order is not found in a update" , async () => {
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      "Teste",
      333,
      "777",
      2
    );
    expect(async () => {
        await orderRepository.update(new Order("333","222",[orderItem]))
    }).rejects.toThrow("Order not found");
  });

  it("should find an order", async () => {
     // Creating a new Order 
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
   
    await productRepository.create(product);  

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    let order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);  

    const orderResult = await orderRepository.find(order.id);
    expect(order).toStrictEqual(orderResult); 
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all orders", async () => {
    // Creating a new Order 
   const customerRepository = new CustomerRepository();
   const customer = new Customer("123", "Customer 1");
   const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
   customer.changeAddress(address);
   await customerRepository.create(customer);

   const productRepository = new ProductRepository();
   const product = new Product("123", "Product 1", 10);
  
   await productRepository.create(product);  

   const orderItem = new OrderItem(
     "1",
     product.name,
     product.price,
     product.id,
     2
   );

   let order1 = new Order("123", "123", [orderItem]);

   const orderRepository = new OrderRepository(); 

   await orderRepository.create(order1);   
   
   // Creating a new Order

   const customer2 = new Customer("256", "Customer 1");   
   customer2.changeAddress(address);
   await customerRepository.create(customer2);
   
   const product2 = new Product("256", "Product 1", 10);
  
   await productRepository.create(product2);  

   const orderItem2 = new OrderItem(
     "2",
     product2.name,
     product2.price,
     product2.id,
     2
   );

   let order2 = new Order("256", "256", [orderItem2]);   

   await orderRepository.create(order2);     


   const orders = await orderRepository.findAll();
   
   expect(orders).toHaveLength(2);
   expect(orders).toContainEqual(order1);
   expect(orders).toContainEqual(order2);
 });
});
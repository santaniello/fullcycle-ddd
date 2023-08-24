import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../../domain/entity/order_item";
import Order from "../../../../domain/aggregate/order";

  
  @Table({
    tableName: "orders",
    timestamps: false,
  })
  export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;
  
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;
  
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];
  
    @Column({ allowNull: false })
    declare total: number;
   
    toDomain(): Order {
      const itemsDomain = this.items.map((itemModel) =>
        itemModel.toDomain()
      );         
      return new Order(this.id, this.customer_id, itemsDomain);
    }  

}   
  
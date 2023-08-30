import { v4 as uuid } from "uuid";

import OrderItem from "../entity/order_item";
import Order from "../entity/aggregate/order";
import Customer from "../../customer/entity/aggregate/customer";



/***
 * Embora seja verdade que uma Domain Service em DDD não mantém estado de domínio, isso não implica que seus métodos devem ser obrigatoriamente estáticos. Na verdade, existem várias razões para se utilizar instâncias de Domain Services em vez de métodos estáticos. 
 * Abaixo, segue algumas vantagens de se utilizar métodos de instância ao invés de métodos estáticos:
 * - Injeção de Dependências;
 * - Mais fácil de testar;
 * - Polimorfismo;
 * - Configuração de Estado Temporário (Embora um Domain Service não mantenha estado de domínio, em alguns casos, ele pode precisar de algum estado temporário para realizar sua operação. Por exemplo, ele pode precisar de algumas configurações que são injetadas nele no momento da criação e que são usadas somente durante a operação que ele realiza.)
 */

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
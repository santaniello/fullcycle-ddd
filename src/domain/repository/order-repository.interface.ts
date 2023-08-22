import Order from "../aggregate/order";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
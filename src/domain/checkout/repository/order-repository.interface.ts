
import RepositoryInterface from "../../@shared/repository/repository-interface";
import Order from "../entity/aggregate/order";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
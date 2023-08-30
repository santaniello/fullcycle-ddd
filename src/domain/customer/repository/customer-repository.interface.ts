
import RepositoryInterface from "../../@shared/repository/repository-interface";
import Customer from "../entity/aggregate/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
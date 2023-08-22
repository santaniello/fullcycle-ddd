import Customer from "../aggregate/customer";
import RepositoryInterface from "./repository-interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
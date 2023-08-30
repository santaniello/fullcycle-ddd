
import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "../entity/aggregate/product";


export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
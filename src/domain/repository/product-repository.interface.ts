import Product from "../aggregate/product";
import RepositoryInterface from "./repository-interface";


export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
import Product from "../aggregate/product";

/***
 * Embora seja verdade que uma Domain Service em DDD não mantém estado de domínio, isso não implica que seus métodos devem ser obrigatoriamente estáticos. Na verdade, existem várias razões para se utilizar instâncias de Domain Services em vez de métodos estáticos. 
 * Abaixo, segue algumas vantagens de se utilizar métodos de instância ao invés de métodos estáticos:
 * - Injeção de Dependências;
 * - Mais fácil de testar;
 * - Polimorfismo;
 * - Configuração de Estado Temporário (Embora um Domain Service não mantenha estado de domínio, em alguns casos, ele pode precisar de algum estado temporário para realizar sua operação. Por exemplo, ele pode precisar de algumas configurações que são injetadas nele no momento da criação e que são usadas somente durante a operação que ele realiza.)
 */
export default class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
    return products;
  }
}
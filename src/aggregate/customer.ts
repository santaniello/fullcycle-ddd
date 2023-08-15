
/**
 * - Uma entidade ela é unica pois possui um id.
 * - O exemplo abaixo é um exemplo de uma entidade rica expressa comportamentos do negócio.
 * - A entidade sempre deverá representar o estado correto e atual daquele elemento.
 * - Uma entidade por padrão deverá sempre se auto validar.
 * 
 *  Entidade Vs ORM
 * 
 *  Complexidade de negócio
 *  Domain
 *  - Pasta Entity
 *  -- customer.ts (contém a regra de negócio)
 * 
 *  Complexidade acidental
 *  infra - Mundo externo
 *  - Pasta Entity / Model
 *  -- customer.ts (get,set)(representa uma tabela do banco de dados)
 */

import Address from "../vo/address";

export default  class Customer{
    // Não é o id do banco de dados.
   private _id: string;
   private _name: string;
   private _address!: Address;
   private _active: boolean = false;

    /**
     * O construtor vai garantir que um objeto seja criado em um estado consistente;
     */
    constructor(id: string, name: string){
        this._id = id;
        this._name = name;        
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get Address(): Address {
        return this._address;
      }
      
    changeAddress(address: Address) {
        this._address = address;
    }
    

    /***
     * Método que irá garantir a auto validação
     */
    validate(){
        if(this._name.length === 0){
           throw new Error("Name is required");     
        }
        if(this._id.length === 0){
           throw new Error("Id is required");          
        }        
    }

    isActive(): boolean {
        return this._active;
      }

    changeName(name: string){
        this._name = name;        
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
      }
}


/**
 * - Uma entidade ela é unica pois possui um id.
 * - O exemplo abaixo é um exemplo de uma entidade anêmica pois são apenas um repositório de dados sem regras de negócio.
 */
class CustomerAnemico{
    _id: string;
    _name: string;
    _address: string;

    constructor(id: string, name: string, address: string){
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get address(): string{
        return this._address;
    }

    set name(name: string){
        this._name = name;
    }

    set address(address: string){
        this._address = address;
    }
}

import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class PrintLog3WhenCustomerAddressIsChangedHandler 
implements EventHandlerInterface<CustomerChangedAddressEvent>{
    handle(event: CustomerChangedAddressEvent): void {
        console.log("Endereço do cliente: {id}, {nome} alterado para: {endereco}");
    }
}
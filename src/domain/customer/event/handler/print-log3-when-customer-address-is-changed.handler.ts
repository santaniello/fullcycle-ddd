import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class PrintLog3WhenCustomerAddressIsChangedHandler 
implements EventHandlerInterface<CustomerChangedAddressEvent>{
    handle(event: CustomerChangedAddressEvent): void {
        const id = event.eventData.id || 'Desconhecido';
        const nome = event.eventData.nome || 'Desconhecido';
        const endereco = event.eventData.endereco || 'Desconhecido';

        console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`);

    }
}
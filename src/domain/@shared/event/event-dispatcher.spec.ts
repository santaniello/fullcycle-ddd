
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import PrintLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/print-log1-when-customer-is-created.handler";
import PrintLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/print-log2-when-customer-is-created.handler";
import PrintLog3WhenCustomerAddressIsChangedHandler from "../../customer/event/handler/print-log3-when-customer-address-is-changed.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";


describe("Domain events tests", () => {
  /***
   * 
   * Product Tests
   * 
   */
  it("should register an product created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an product created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  }); 

  it("should notify all product created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    // verifica se o método handle dentro do noss handler foi chamado
    expect(spyEventHandler).toHaveBeenCalled();
  });

   /***
   * Customer Tests  
   */

  // Created Event

   it("should register an customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new PrintLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new PrintLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister one customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new PrintLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new PrintLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      1
    );
  });
 
  it("should notify all customer created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new PrintLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new PrintLog2WhenCustomerIsCreatedHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "John"     
    });

    eventDispatcher.notify(customerCreatedEvent);

    // verifica se o método handle dentro do noss handler foi chamado
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });


  // Changed Address Event

  it("should register an customer changed address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new PrintLog3WhenCustomerAddressIsChangedHandler();   

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);    

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler1);
    
  });

  it("should unregister one customer changed address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new PrintLog3WhenCustomerAddressIsChangedHandler();

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);
    

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler1);

    eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(
      0
    );
  });

  it("should notify all customer changed address event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new PrintLog3WhenCustomerAddressIsChangedHandler()

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");    

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);    
    

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler1);
    
    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      id: "aaaa",
      nome: "Joao",
      endereco: "Rua Santo Amaro 127 - São Paulo - SP"      
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    // verifica se o método handle dentro do noss handler foi chamado
    expect(spyEventHandler1).toHaveBeenCalled();    
  });

  
  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
    const eventHandler2 = new PrintLog1WhenCustomerIsCreatedHandler();
    const eventHandler3 = new PrintLog2WhenCustomerIsCreatedHandler();
    const eventHandler4 = new PrintLog3WhenCustomerAddressIsChangedHandler();   

    eventDispatcher.register("ProductCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler3);
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler4);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler4);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeUndefined();
  });


});
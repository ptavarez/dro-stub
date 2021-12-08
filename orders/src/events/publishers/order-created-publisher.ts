import { Publisher, OrderCreatedEvent, Subjects } from '@drotickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

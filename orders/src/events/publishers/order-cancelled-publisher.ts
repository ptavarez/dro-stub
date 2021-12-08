import { Publisher, OrderCancelledEvent, Subjects } from '@drotickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

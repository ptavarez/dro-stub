import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@drotickets/common';
import { PAYMENT_SERVICE } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = PAYMENT_SERVICE;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the order that the order is reserving
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    // Save the order
    await order.save();

    // ack the message
    msg.ack();
  }
}

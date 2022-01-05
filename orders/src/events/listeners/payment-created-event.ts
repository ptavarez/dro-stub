import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from '@drotickets/common';
import { Message } from 'node-nats-streaming';

import { Order } from '../../models/order';
import { ORDERS_SERVICE } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = ORDERS_SERVICE;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    msg.ack();
  }
}

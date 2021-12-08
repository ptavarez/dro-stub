import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@drotickets/common';
import { Ticket } from '../../models/ticket';
import { ORDERS_SERVICE } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = ORDERS_SERVICE;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}

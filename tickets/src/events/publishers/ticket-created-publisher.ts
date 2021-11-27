import { Publisher, Subjects, TicketCreatedEvent } from '@drotickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

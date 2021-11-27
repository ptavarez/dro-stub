import { Publisher, Subjects, TicketUpdatedEvent } from '@drotickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

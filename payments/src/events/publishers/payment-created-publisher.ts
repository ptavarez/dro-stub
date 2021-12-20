import { Subjects, Publisher, PaymentCreatedEvent } from '@drotickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@drotickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

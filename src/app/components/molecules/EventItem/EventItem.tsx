import * as React from 'react';
import { EventLink, Paragraph, Link, Container } from './EventItem.styled';

interface EventProp {
  id: number;
  date: string;
  title: string;
  location: string;
  index: number;
  type: number;
}

export const EventItem: React.StatelessComponent<EventProp> = (
  event: EventProp
) => (
  <Container index={event.index}>
    <Link path={`/events/${event.type}/${event.id}`}>{event.date}</Link>
    <EventLink path={`/events/${event.type}/${event.id}`}>
      {event.title}
    </EventLink>
    <Paragraph>{event.location}</Paragraph>
  </Container>
);
